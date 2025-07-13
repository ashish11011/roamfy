"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQsData } from "@/const";

export function FAQsAccordion() {
  return (
    <div className="max-w-5xl px-6 mx-auto py-12">
      <h2 className="font-playfair text-3xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {FAQsData.map((item, idx) => (
          <AccordionItem key={`faq-${idx}`} value={`item-${idx}`}>
            <AccordionTrigger
              className={
                " cursor-pointer text-lg text-gray-900 font-medium tracking-wide"
              }
            >
              {item.question}
            </AccordionTrigger>
            <AccordionContent
              className={" text-base tracking-wide leading-7 text-gray-600"}
            >
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
