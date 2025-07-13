"use client";
import { useEffect } from "react";
import { useState } from "react";
import Input from "@/conponents/input";
import { X } from "lucide-react";

function InputTagList({ value = [], setList }) {
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {}, [currentValue]);

  const handleKeyDown = (e) => {
    console.log("key down");
    if (e.key === "Enter" && currentValue.trim() !== "") {
      e.preventDefault();
      if (!value.includes(currentValue.trim())) {
        const newList = [...value, currentValue.trim()];
        setList(newList);
        setCurrentValue("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    const newList = value.filter((tag) => tag !== tagToRemove);
    setList(newList);
  };

  return (
    <div className="w-full">
      <Input
        title="Tags"
        placeholder="Press Enter to add tag"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Tag list */}
      <div className="mt-2 flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm"
          >
            <span className="break-all">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-gray-600 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputTagList;
