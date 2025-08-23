"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle, PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { handleDeleteTripById, toggleTripVisiblity } from "lib";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function TripTable({ tripData }) {
  const [loadingIds, setLoadingIds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(tripData);

  const router = useRouter();

  const handleToggle = async (id, currentValue) => {
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

  async function handleDelete(id) {
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/trip/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      // await handleDeleteTripById(id);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setData(tripData);
  }, [tripData]);

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
              <div className=" flex items-center gap-2">
                <Link href={`/admin/trip?id=${item.id}`}>
                  <PencilIcon
                    className=" hover:scale-125 duration-200"
                    size={20}
                  />
                </Link>
                <button onClick={() => handleDelete(item.id)}>
                  {isLoading ? (
                    <LoaderCircle className="animate-spin" size={20} />
                  ) : (
                    <Trash2
                      className=" hover:scale-125 cursor-pointer duration-200"
                      size={20}
                      color="red"
                    />
                  )}
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
