const fieldClassName = "w-full rounded-[10px] bg-field px-[12px] py-[10px] text-[16px] font-semibold leading-[22px] outline-none placeholder:text-placeholder";
const labelClassName = "text-[20px] font-semibold leading-[27px]";

export function TextField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  autoComplete,
  maxLength,
}) {
  const showCounter = maxLength !== undefined;

  return (
    <div className="flex flex-col gap-[8px]">
      {showCounter ? (
        <div className="flex items-baseline justify-between">
          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>
          <span className="text-[14px] leading-[19px]">
            {value.length}/{maxLength}
          </span>
        </div>
      ) : (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className={fieldClassName}
      />
    </div>
  );
}