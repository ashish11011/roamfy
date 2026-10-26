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
import { deleteGroupTrip, toggleGroupTripVisibility, toggleTripVisiblity } from "lib";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice, getSharingOptions } from "@/helper/groupTourPricing";

export function TripTable({ tripData, isGroupTour = false }) {
  const [loadingIds, setLoadingIds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(tripData);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleToggle = async (id, currentValue) => {
    const newValue = !currentValue;

    setLoadingIds((prev) => ({ ...prev, [id]: true }));
    setError("");

    try {
      await (isGroupTour ? toggleGroupTripVisibility : toggleTripVisiblity)({
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
      setError("Unable to change visibility. Please try again.");
    } finally {
      setLoadingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  async function handleDelete(id) {
    setIsLoading(true);
    setError("");

    try {
      if (isGroupTour) {
        await deleteGroupTrip(id);
      } else {
        const res = await fetch("/api/admin/trip/delete", {
          method: "POST",
          body: JSON.stringify({ id }),
        });
        if (!res.ok) throw new Error("Unable to delete trip.");
      }
      setData(prev => prev.filter(item => item.id !== id));
      router.refresh();
    } catch (error) {
      setError("Unable to delete. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setData(tripData);
  }, [tripData]);

  // }
  return (
    <div>
    {error && <p role="alert" className="text-red-700 mb-3">{error}</p>}
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Title</TableHead>
          {isGroupTour && <TableHead>Prices per person</TableHead>}
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
            {isGroupTour && (
              <TableCell>
                {getSharingOptions(item.sharingPrices).map(option => (
                  <p key={option.key}>{option.label}: {formatPrice(option.price)}</p>
                ))}
              </TableCell>
            )}
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
                <Link href={`/admin/${isGroupTour ? "group-trip" : "trip"}?id=${item.id}`}>
                  <PencilIcon
                    className=" hover:scale-125 duration-200"
                    size={20}
                  />
                </Link>
                <button disabled={isLoading} onClick={() => handleDelete(item.id)}>
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
    </div>
  );
}
