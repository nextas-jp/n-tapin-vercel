const baseButtonClassName = "relative w-full font-bold";

export function PrimaryButton({ children, type = "submit", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseButtonClassName} h-[60px] rounded-[15px] text-[20px] leading-[27px] bg-primary-gradient`}
    >{children}<i className="chevron-icon"></i></button>
  );
}

export function SecondaryButton({ children, isThin = false, type = "button", onClick }) {
  const sizeClassName = isThin
    ? "h-[44px] rounded-[10px] text-[14px] leading-[20px]"
    : "h-[60px] rounded-[15px] text-[20px] font-bold leading-[27px]";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseButtonClassName} ${sizeClassName} bg-secondary-button`}
    >{children}<i className="chevron-icon"></i>
    </button>
  );
}