import Heading from "@/components/heading";

export function HeadingList({ title, list }) {
  return (
    <div className="space-y-3">
      <Heading>{title}</Heading>
      <ul className="list-disc pl-4 text-gray-600">
        {list?.map((item, idx) => {
          return <li key={idx}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
