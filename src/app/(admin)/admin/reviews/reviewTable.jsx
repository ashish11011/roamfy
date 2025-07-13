"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toggleReviewVisiblity } from "../../../../../lib/tripHelper";

export function AdminReviewsTable({ reviews }) {
  const [data, setData] = useState(reviews);
  const [loadingIds, setLoadingIds] = useState({});

  const handleToggle = async (id, currentValue) => {
    const newValue = !currentValue;

    setLoadingIds((prev) => ({ ...prev, [id]: true }));

    try {
      await toggleReviewVisiblity({
        id,
        isAdminApproved: newValue,
      });

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, isAdminApproved: newValue } : item
        )
      );
    } catch (error) {
      console.error("Failed to toggle review visibility:", error);
    } finally {
      setLoadingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Approved</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.rating}</TableCell>
            <TableCell>{item.message}</TableCell>
            <TableCell>
              <Switch
                checked={item.isAdminApproved}
                disabled={loadingIds[item.id]}
                onCheckedChange={() =>
                  handleToggle(item.id, item.isAdminApproved)
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
