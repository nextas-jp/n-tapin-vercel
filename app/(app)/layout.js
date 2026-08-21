export default function AppLayout({ children }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center pt-[60px] pb-[90px] bg-background px-[20px]">
      <main className="flex w-full max-w-[430px] flex-col gap-[40px]">
        {children}
      </main>
    </div>
  );
}