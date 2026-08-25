import { ViewTransition } from 'react';
import { UserProvider } from "./user-context";
import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-start pt-[60px] pb-[90px] bg-background px-[20px]">
      <main className="flex w-full max-w-[430px] flex-col gap-[40px]">
          <ViewTransition>
            <UserProvider>
              {children}
              <BottomNav />
            </UserProvider>
          </ViewTransition>
      </main>
    </div>
  );
}