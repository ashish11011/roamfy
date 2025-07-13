import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

export function Testimonial({ reviewData }) {
  return (
    <div className="w-full py-16 bg-white  max-w-7xl px-4 mx-auto overflow-hidden">
      <h3 className=" text-lg text-emerald-600 italic mb-2 font-medium text-center">
        Experience worth remembering
      </h3>
      <h3 className=" text-center font-playfair font-semibold mb-10 text-3xl">
        What our clients say
      </h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className=" w-full "
      >
        <CarouselContent wrapperClassName=" w-[calc(100%-86px)] mx-auto overflow-visible md:overflow-hidden">
          {reviewData?.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className={" py-4"}>
                  <CardContent className="flex flex-col px-4">
                    <div className=" flex flex-col sm:flex-row justify-between sm:gap-4 sm:items-center">
                      <p className=" font-semibold text-lg">{item.name}</p>
                      <div className=" flex gap-1.5">
                        {Array.from({ length: item.rating }, (_, index) => (
                          <Star
                            key={index}
                            size={18}
                            className=" text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className=" mt-4 text-sub">{item.message}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
