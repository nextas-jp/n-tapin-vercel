import { BackLink } from "@/components/BackLink";

//MEMO: brが必要な場合、arrayを通す（例））description={["メールアドレスとパスワードを",　<br key="br" />,　"入力してください。"　]}

export function PageHeader({ title, description, backLinkUrl = '' }) {
  return (
    <header className="flex flex-col">
      { backLinkUrl ? <BackLink href={backLinkUrl} /> : null }
      <h1 className="text-[28px] font-bold leading-[38px]">{title}</h1>
      <p className="text-[16px] leading-[22px]">{description}</p>
    </header>
  );
}