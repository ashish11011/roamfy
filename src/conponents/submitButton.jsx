import { cn } from "@/lib/utils";

function SubmitButton({ className, onClick = () => {}, loading = false }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={cn(
        " w-full font-semibold text-lg cursor-pointer text-center py-2 px-4 rounded-full bg-primary  hover:!bg-orange-700 duration-200 text-white",
        className,
        loading && " opacity-50 cursor-not-allowed"
      )}
    >
      Send Message
    </button>
  );
}

export default SubmitButton;
