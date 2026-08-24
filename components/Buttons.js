const buttonClassName = "relative h-[59px] w-full rounded-[15px] text-[20px] font-bold leading-[27px] text-foreground";

export function PrimaryButton({ children, type = "submit", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClassName} bg-primary-gradient`}
    >{children}<i className="chevron-icon"></i></button>
  );
}

export function SecondaryButton({ children, type = "button", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClassName} bg-secondary-button`}
    >{children}<i className="chevron-icon"></i></button>
  );
}