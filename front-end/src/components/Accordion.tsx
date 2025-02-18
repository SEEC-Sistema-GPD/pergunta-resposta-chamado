import { ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

export const AccordionRoot = ({ children }: any) => {
    return (
        <Accordion.Root type="multiple">
            {children}
        </Accordion.Root>
    );
};

export const AccordionItem = ({ children, value }: { children: any, value: string }) => {
    return (
        <Accordion.Item
            className="border-b shadow-sm w-3xl px-4 justify-between bg-white rounded-md  hover:bg-gray-50"
            value={value}
        >
            {children}
        </Accordion.Item>
    );
};

export const AccordionTrigger = ({ children }: any) => {
    return (
        <Accordion.Header className="flex">
            <Accordion.Trigger
                className="flex flex-1 cursor-pointer 
                items-center justify-between py-4 text-sm 
                font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180"
            >
                {children}
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </Accordion.Trigger>
        </Accordion.Header>
    );
};

export const AccordionContent = ({ children }: any) => {
    return (
        <Accordion.Content
            className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        >
            <div className="pb-4 pt-0">{children}</div>
        </Accordion.Content>
    );
};