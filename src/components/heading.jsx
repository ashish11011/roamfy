export default function Heading({ children }) {
  return (
    <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
      {children}
    </h2>
  );
}
