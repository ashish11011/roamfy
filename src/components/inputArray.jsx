import { XIcon } from "lucide-react";

const { useState } = require("react");

export function InputArray({
  title,
  placeholder,
  value = [],
  onChangehandler,
}) {
  const [text, setText] = useState("");

  function handleKeyDown(e) {
    if (e.key === "Enter" && text != "") {
      const newData = [...value, text];
      onChangehandler(newData);
      setText("");
    }
  }

  function handleRemoveItem(idx) {
    const newData = value.filter((_, fIdx) => fIdx !== idx);
    onChangehandler(newData);
  }

  return (
    <div className=" w-full flex flex-col gap-1.5">
      <p>
        {title} <span className=" text-sm text-gray-400 pl-1">[array]</span>{" "}
      </p>
      <input
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border py-1.5 px-2 rounded"
      />
      <div className=" flex flex-col gap-1 px-2">
        {value.map((item, idx) => {
          return (
            <div
              key={idx}
              className=" border-b pb-0.5 flex items-center justify-between w-full"
            >
              <p>{item}</p>
              <XIcon
                onClick={() => handleRemoveItem(idx)}
                className=" cursor-pointer"
                size={18}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
