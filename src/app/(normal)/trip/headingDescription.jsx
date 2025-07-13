import Heading from "@/components/heading";

export function HeadingDescription({ tripDescription }) {
  return (
    <div className="space-y-3">
      <Heading>Description</Heading>
      <p className=" text-gray-600 ">{tripDescription}</p>
    </div>
  );
}
