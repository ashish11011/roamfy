import { Switch } from "antd";

export function CustomSwitch({ title, value, onChange }) {
  return (
    <div className=" w-full flex flex-col gap-1.5">
      <p>{title}</p>
      <Switch value={value} onChange={onChange} className=" w-fit" />
    </div>
  );
}
