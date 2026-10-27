'use server';

import { createClient } from '@supabase/supabase-js';

// ※RLSをバイパスし、システム権限でDB更新やAuth削除を行うため Service Role Key を使用
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function deleteUserFromTapIn(userId) {
  try {
    // 1. 削除対象のユーザー情報を取得（監査ログの old_data 記録用）
    const { data: oldUserData, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError || !oldUserData) {
      throw new Error('ユーザー情報の取得に失敗しました');
    }

    // 2. usersテーブルを論理削除（UPDATE）
    const deletedAt = new Date().toISOString();
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ 
        is_deleted: true, 
        deleted_at: deletedAt 
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    // 3. audit_logsテーブルに監査ログを記録
    const { error: auditError } = await supabaseAdmin
      .from('audit_logs')
      .insert({
        user_id: userId, // 操作したユーザー自身
        action: 'DELETE', // 論理削除アクション
        table_name: 'users',
        record_id: userId,
        old_data: oldUserData,
        new_data: { ...oldUserData, is_deleted: true, deleted_at: deletedAt }
      });

    if (auditError) throw auditError;

    // 4. TapInのAuthenticationからユーザーを物理削除（二度とログイン不可にする）
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (authError) {
      console.error(`Auth削除エラー (UserID: ${userId}):`, authError);
      // Authの削除に失敗しても、DBの論理削除とログ記録は完了しているため進行
    }

    return { success: true, message: '退会処理および監査ログの記録が完了しました' };

  } catch (error) {
    console.error('退会処理中にエラーが発生しました:', error);
    return { success: false, error: error.message };
  }
}