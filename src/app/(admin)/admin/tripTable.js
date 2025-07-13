"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { toggleTripVisiblity } from "lib";
import { useState } from "react";

export function TripTable({ tripData }) {
  const [loadingIds, setLoadingIds] = useState({});
  const [data, setData] = useState(tripData);

  const handleToggle = async (id, currentValue) => {
    console.log("Client: ", id, currentValue);
    const newValue = !currentValue;

    setLoadingIds((prev) => ({ ...prev, [id]: true }));

    try {
      await toggleTripVisiblity({
        id,
        isVisible: newValue,
      });

      setData((prevData) => {
        const newData = prevData.map((item) =>
          item.id === id ? { ...item, isVisible: newValue } : item
        );

        return newData;
      });
    } catch (error) {
      console.error("Failed to toggle review visibility:", error);
    } finally {
      setLoadingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  // }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Is Visible</TableHead>
          <TableHead className=" w-[100px] ">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">
              <img
                src={item.bannerImage}
                alt={item.title}
                className="w-12 h-12 object-cover rounded"
              />
            </TableCell>
            <TableCell>
              <p className=" font-semibold">{item.title}</p>
            </TableCell>
            {/* <TableCell>{item.isFlightIncluded ? "Yes" : "No"}</TableCell> */}
            <TableCell>
              <Switch
                checked={item.isVisible}
                disabled={loadingIds[item.id]}
                onCheckedChange={() => handleToggle(item.id, item.isVisible)}
              />

              {/* <IsVisibleToggle tripId={item.id} currentState={item.isVisible} /> */}
            </TableCell>
            <TableCell>
              <Link href={`/admin/trip?id=${item.id}`}>
                <PencilIcon
                  className=" hover:scale-125 duration-200"
                  size={20}
                />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
