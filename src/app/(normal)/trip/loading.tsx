import { Skeleton } from "@/components/ui/skeleton";

export default function TripPageSkeleton() {
    return (
        <div className="w-full">

            {/* HERO */}
            <div className="relative w-full h-[300px] md:h-[420px] lg:h-[500px]">
                <Skeleton className="w-full h-full rounded-none" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="h-10 w-48 md:h-14 md:w-72" />
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* LEFT CONTENT */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Price */}
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-8 w-72" />
                        <Skeleton className="h-4 w-80" />
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <Skeleton className="h-7 w-40" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>

                    {/* Extra sections */}
                    <div className="space-y-3">
                        <Skeleton className="h-7 w-44" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                </div>

                {/* BOOKING CARD */}
                <div className="w-full">
                    <div className="border rounded-xl p-6 space-y-4">
                        <Skeleton className="h-8 w-40 mx-auto" />
                        <Skeleton className="h-4 w-full" />

                        <div className="space-y-3 pt-4">
                            <Skeleton className="h-10 w-full rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                            <Skeleton className="h-10 w-full rounded-md" />
                        </div>

                        <Skeleton className="h-10 w-full mt-4 rounded-md" />
                    </div>
                </div>

            </div>
        </div>
    );
}