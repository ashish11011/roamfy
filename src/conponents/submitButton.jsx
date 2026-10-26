import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SubmitButton({
  className,
  onClick,
  loading = false,
  children = "Send message",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={cn("site-button", className)}
    >
      {loading ? (
        <>
          <LoaderCircle size={16} className="animate-spin" />
          Sending…
        </>
      ) : (
        <>
          {children}
          <ArrowUpRight size={16} />
        </>
      )}
    </button>
  );
}
