"use client";
import Autoplay from "embla-carousel-autoplay";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function TripImageCousel({ imagesArray }) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-7xl px-4 md:px-12 mx-auto"
    >
      <CarouselContent>
        {imagesArray?.map((imgLink, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className={"overflow-hidden"}>
                <CardContent className="flex h-[50vh] md:h-[70vh] items-center justify-center">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <img
                    src={imgLink}
                    alt=""
                    className=" w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
