import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { blogCategories } from "@/const";

export function SelectBlogCategories({ value, onChange }) {
  return (
    <div className="flex w-full flex-col gap-1">
      <p className="font-medium">Blog Category</p>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mb-4 w-full">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Blog Categories</SelectLabel>
            {blogCategories.map((item) => {
              return (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
