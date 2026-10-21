import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  const isPublicPath = 
    request.nextUrl.pathname.startsWith('/login') || 
    request.nextUrl.pathname === '/'

  // 5. 生存確認に失敗（退職者・無効化・未ログイン）した場合の処理
  if (!user && !isPublicPath) {
    // Hubのログイン画面のURL（環境変数から取得、なければフォールバック）
    const hubLoginUrl = process.env.NEXT_PUBLIC_HUB_URL 
      ? `${process.env.NEXT_PUBLIC_HUB_URL}/login` 
      : 'https://id-hub-poc.vercel.app/login'

    // 即座にHubのログイン画面へ強制リダイレクト（TapInの画面は一切見せない）
    return NextResponse.redirect(new URL(hubLoginUrl))
  }

  // 生存確認がとれた現役ユーザーは、そのままページを表示する
  return supabaseResponse
}

// 6. ミドルウェアを動作させる範囲の指定（静的ファイルや画像を除外）
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}