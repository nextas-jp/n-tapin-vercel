import { createServerClient } from "@/utils/supabase/server";
import { SplashRedirect } from "@/components/SplashRedirect";

export default async function RootScreen() {
  const supabase = await createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  const isLoggedIn = !!session?.access_token;

  return <SplashRedirect isLoggedIn={isLoggedIn} />;
}