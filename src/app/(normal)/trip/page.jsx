import RedirectHome from "@/conponents/RedirectHome";
import { permanentRedirect } from "next/navigation";

const Page = async ({ searchParams }) => {
  const { tripId } = await searchParams;

  if (typeof tripId === "string" && tripId) {
    permanentRedirect(`/trip/${encodeURIComponent(tripId)}`);
  }

  return <RedirectHome title="Trip not found" />;
};

export default Page;
