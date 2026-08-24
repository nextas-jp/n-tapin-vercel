let buttonClassName = "relative h-[60px] w-full rounded-[15px] text-[20px] font-bold leading-[27px]";

export function PrimaryButton({ children, type = "submit", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClassName} bg-primary-gradient`}
    >{children}<i className="chevron-icon"></i></button>
  );
}

export function SecondaryButton({ children, type = "button", onClick, isthin = false }) {
  if (isthin) {
    buttonClassName = "relative h-[44px] w-full rounded-[10px] text-[14px] leading-[20px]";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonClassName} bg-secondary-button`}
    >{children}<i className="chevron-icon"></i></button>
  );
}