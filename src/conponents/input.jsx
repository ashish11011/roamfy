import { cn } from "@/lib/utils";

export default function Input({
  title,
  placeholder,
  value,
  onChange,
  className,
  onKeyDown,
  type = "text",
  ...props
}) {
  return (
    <label className={cn("site-field", className)}>
      <span>{title}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="site-input"
        {...props}
      />
    </label>
  );
}
