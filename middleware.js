import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { REMEMBER_COOKIE, REMEMBER_MAX_AGE } from "@/constants";

const PROTECTED_PATHS = ["/dashboard", "/attendance", "/notifications", "/posts", "/settings"];
// const AUTH_ROUTES = ['/signin']

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
  // const isAuthRoute = AUTH_ROUTES.some((path) => pathname.startsWith(path));

  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // TODO: Allow newly signed-up users to access the signup subpages after they have been registered with Supabase.
  // if (isAuthRoute && ongoingSigninUser) {
  //   return NextResponse.redirect(new URL('/signin/name', request.url));
  // }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};