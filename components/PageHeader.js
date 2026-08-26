import { BackLink } from "@/components/BackLink";
import { Children } from "react";

//MEMO: brが必要な場合、arrayを通す（例））description={["メールアドレスとパスワードを",　<br key="br" />,　"入力してください。"　]}

export function PageHeader({ title, description, backLinkUrl = '', onBackNavigate = () => {}, children }) {
  return (
    <header className="flex flex-col">
      { backLinkUrl &&
      <div className="flex justify-between items-center mb-[25px]">
        { backLinkUrl ? <BackLink href={backLinkUrl} onBackNavigate={onBackNavigate} /> : null }
        { children ? <div>{children}</div> : null}
      </div>
      }
      <h1 className="text-[28px] font-bold leading-[38px]">{title}</h1>
      <p className="text-[16px] leading-[22px]">{description}</p>
    </header>
  );
}