import React from "react";
import { db } from "../../../../../lib/db";
import { contactTable } from "../../../../../db/schema";
import { TripFormTable } from "./contactTable";

const Page = async () => {
  const contactsData = await db.select().from(contactTable);
  return (
    <div className=" w-full">
      <TripFormTable data={contactsData} />
    </div>
  );
};

export default Page;
