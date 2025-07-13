import React from "react";
import { db } from "../../../../../lib/db";
import { reviewsTable } from "../../../../../db/schema";
import { AdminReviewsTable } from "./reviewTable";
import { asc } from "drizzle-orm";

const Page = async () => {
  const reviewData = await db
    .select()
    .from(reviewsTable)
    .orderBy(asc(reviewsTable.id));
  return (
    <div>
      <AdminReviewsTable reviews={reviewData} />
    </div>
  );
};

export default Page;
