"use client";
import { cn } from "@/lib/utils";
import { insertTrip } from "lib";
import React, { useState } from "react";

const AddNewTrip = () => {
  const [loading, setLoading] = useState(false);

  async function addNewTrip() {
    setLoading(true);
    const data = {
      count: "2",
      title: "trip 2",
    };

    await insertTrip(data);
    setLoading(false);
  }

  return (
    <div className=" mt-6">
      <button
        onClick={addNewTrip}
        disabled={loading}
        className={cn(
          " hover:bg-gray-100 bg-gray-50 rounded-xl px-4 py-2 cursor-pointer text-sm",
          loading && " opacity-50 cursor-not-allowed"
        )}
      >
        {loading ? "Adding..." : "Add New Trip"}
      </button>
    </div>
  );
};

export default AddNewTrip;
