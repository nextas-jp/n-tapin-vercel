import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { REMEMBER_COOKIE, REMEMBER_MAX_AGE } from "@/constants";

const PROTECTED_PATHS = ["/dashboard", "/attendance", "/notifications", "/posts", "/settings"];

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

    console.log("🔍 アクセスURL:", pathname);
  console.log("🔍 保護対象判定:", isProtected);
  console.log("🔍 ユーザー情報:", user ? "存在します(Banされてない)" : "nullです");
  console.log("🔍 エラー内容:", error ? error.message : "エラーなし");

  if (isProtected && !user) {
    console.log("🚪 リダイレクト発動！！");
    // ▼▼▼ 変更箇所：TapInの/loginではなく、Hubのログイン画面へ強制送還する ▼▼▼
    const hubLoginUrl = process.env.NEXT_PUBLIC_SUPABASE_HUB_URL 
      ? `${process.env.NEXT_PUBLIC_SUPABASE_HUB_URL}/login` 
      : 'https://id-hub-poc.vercel.app/login';
      
    return NextResponse.redirect(new URL(hubLoginUrl));
    // ▲▲▲ 変更ここまで ▲▲▲
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};