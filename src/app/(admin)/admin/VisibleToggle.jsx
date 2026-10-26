"use client";
import { Switch } from "@/components/ui/switch";
import { toggleVisiblity } from "../../../../lib/tripHelper";
import { useState } from "react";
// import { toggleVisiblity } from "../../../lib/tripHelper";

export function IsVisibleToggle({ tripId, currentState }) {
  const [checked, setChecked] = useState(currentState);
  return (
    <div className="flex items-center space-x-2">
      <Switch
        onCheckedChange={() => {
          setChecked((prev) => !prev);
          toggleVisiblity(tripId);
        }}
        id="airplane-mode"
      />
    </div>
  );
}
