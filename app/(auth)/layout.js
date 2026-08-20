export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-[20px]">
      <main className="flex w-full max-w-[430px] flex-col gap-[40px]">
        {children}
      </main>
    </div>
  );
}