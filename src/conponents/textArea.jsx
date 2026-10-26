export default function Textarea({
  title,
  placeholder,
  value,
  onChange,
  ...props
}) {
  return (
    <label className="site-field">
      <span>{title}</span>
      <textarea
        placeholder={placeholder}
        value={value}
        rows={4}
        onChange={onChange}
        className="site-input"
        {...props}
      />
    </label>
  );
}
