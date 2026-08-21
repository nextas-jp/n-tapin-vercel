import Link from "next/link";

export function BackLink({ href }) {
  return (
    <Link
      href={href}
      aria-label="前の画面に戻る"
      className="flex size-[30px] items-center justify-center"
    ><i className="w-[30px] h-[30px]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30">
        <path stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.313 15.343h18.75M12.875 22.873l-7.563-7.53 7.563-7.53" />
      </svg>
    </i></Link>
  );
}

