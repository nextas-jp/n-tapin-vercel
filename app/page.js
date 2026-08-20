// import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-[20px]">
      <main className="flex w-full max-w-[430px] flex-col gap-[40px] ">
        <header className="flex flex-col">
          <h1 className="text-[28px] font-bold leading-[38px]">ログイン</h1>
          <p className="text-[16px] leading-[22px]">
            メールアドレスとパスワードを入力してください。
          </p>
        </header>
        

        {/* <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]"> */}
        <form onSubmit="" className="flex flex-col gap-[24px]">
          <div className="shadow-card rounded-[15px] bg-surface px-[19px] py-[24px]">
            <p>テスト2</p>
          </div>
          
        </form>
      </main>
    </div>
  );
}
