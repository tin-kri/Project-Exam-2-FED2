import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type PolicyItem = {
  value: string;
  trigger: string;
  content: string;
};
const items: PolicyItem[] = [
  {
    value: "item-1",
    trigger: "Check-in & Check-out",
    content:
      "Check-in from 15:00. Check-out before 11:00. Early check-in or late check-out may be available on request — please contact the host.",
  },
  {
    value: "item-2",
    trigger: "Cancellation Policy",
    content:
      "Free cancellation up to 48 hours before arrival. Cancellations made within 48 hours of check-in are non-refundable.",
  },
  {
    value: "item-3",
    trigger: "Venue Rules",
    content:
      "No smoking indoors. Pets are welcome only where indicated by the venue's amenities. Please read contract for more information about the venues rules",
  },
];

export default function VenueInformation() {
  return (
    <section className="pl-4 mt-6 border-t border-grey-200 px-4 py-6">
      <h3 className="mb-2 font-serif text-lg font-bold text-navy-800">
        Venue Policies
      </h3>
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className=" "
      >
        {items.map((item) => (
          <AccordionItem key={item.value} value={item.value} className="border-grey-200">
            <AccordionTrigger className="font-serif text-secondary-foreground ">
              {item.trigger}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-grey-900">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
