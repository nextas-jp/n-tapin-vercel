export function PageHeader({ title, description }) {
  return (
    <header className="flex flex-col">
      <h1 className="text-[28px] font-bold leading-[38px]">{title}</h1>
      <p className="text-[16px] leading-[22px]">{description}</p>
    </header>
  );
}