import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { REMEMBER_COOKIE, REMEMBER_MAX_AGE } from "@/constants";

const PROTECTED_PATHS = ["/dashboard", "/attendance", "/notifications", "/posts", "/settings", "/queue-test"];

export async function middleware(request) {
  let response = NextResponse.next({ request });

  const isRemembered = request.cookies.get(REMEMBER_COOKIE)?.value !== "false";

  const supabase = createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookieOptions: isRemembered ? { maxAge: REMEMBER_MAX_AGE } : {},
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // userだけでなく、無効化された際のエラー(error)も取得する
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  console.log("🔍 アクセスURL:", pathname);
  console.log("🔍 保護対象判定:", isProtected);
  if (error) console.log("🚨 セッションエラー検知:", error.message);

  // ユーザーが存在しない、またはBan等でエラーになった場合は弾く
  if (isProtected && (!user || error)) {
    console.log("🚪 リダイレクト発動！！（セッション無効またはBan/削除）");
    
    // 遷移先のHubログインURLを決定
    const hubLoginUrl = process.env.NEXT_PUBLIC_SUPABASE_HUB_URL 
      ? `${process.env.NEXT_PUBLIC_SUPABASE_HUB_URL}/login` 
      : 'https://id-hub-poc.vercel.app/login';
      
    // リダイレクト用のレスポンスオブジェクトを作成
    const redirectResponse = NextResponse.redirect(new URL(hubLoginUrl));
    
    // API(signOut)を叩かず、ブラウザに残っているログインクッキーを直接剥がす
    request.cookies.getAll().forEach((cookie) => {
      // Supabaseが発行したクッキー（sb-から始まるもの、またはauth-tokenを含むもの）を全て削除
      if (cookie.name.startsWith('sb-') || cookie.name.includes('auth-token')) {
        redirectResponse.cookies.delete(cookie.name);
      }
    });

    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};