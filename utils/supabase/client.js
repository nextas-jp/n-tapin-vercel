import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import { REMEMBER_COOKIE, REMEMBER_MAX_AGE } from "@/constants";

export function createBrowserClient({ remember } = {}) {
  // Only write the preference cookie when explicitly told (i.e. at login time)
  if (typeof remember === "boolean") {
    document.cookie = `${REMEMBER_COOKIE}=${remember}; path=/; max-age=${REMEMBER_MAX_AGE}; SameSite=Lax`;
  }

  const isRemembered = readRememberPreference();

  return createSupabaseBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookieOptions: isRemembered
        ? { maxAge: REMEMBER_MAX_AGE } // persists across browser restarts
        : {}, // no maxAge = session cookie, cleared when the browser closes
    }
  );
}

function readRememberPreference() {
  if (typeof document === "undefined") return true;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${REMEMBER_COOKIE}=([^;]*)`)
  );
  return match ? match[1] === "true" : true; // default to "remembered" if unset
}


/**
 SIMPLE NAIVE VERSION with client supabase
 */
// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// export function createBrowserClient({ remember = true } = {}) {
//   if (!supabaseUrl || !supabaseAnonKey) {
//     throw new Error(
//       "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
//     );
//   }

//   return createClient(supabaseUrl, supabaseAnonKey, {
//     auth: {
//       persistSession: true,
//       autoRefreshToken: true,
//       detectSessionInUrl: true,
//       storage:
//         typeof window === "undefined"
//           ? undefined
//           : remember // it (remember) maps to the 次回から自動ログイン checkbox
//             ? window.localStorage
//             : window.sessionStorage,
//     },
//   });
// }
