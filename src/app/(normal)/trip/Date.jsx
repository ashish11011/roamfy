import Heading from "@/components/heading";
import React from "react";

const Date = ({ dates }) => {
  return (
    <div className=" space-y-2">
      <Heading>Dates</Heading>
      <ul className="list-disc pl-4 text-gray-600">
        {dates?.map((item, idx) => {
          return <li key={idx}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default Date;
