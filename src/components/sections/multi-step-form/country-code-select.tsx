"use client";

import { Check } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { countryCodes } from "@/lib/country-codes";
import { cn } from "@/lib/utils";

interface CountryCodeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  isInvalid?: boolean;
}

export function CountryCodeSelect({
  value,
  onValueChange,
  isInvalid,
}: CountryCodeSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-none"
          aria-invalid={isInvalid}
        >
          <span className={cn("text-sm", isInvalid && "text-destructive")}>
            {value || "+91"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]" align="start">
        <Command>
          <CommandInput placeholder="Search country..." className="font-sans" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countryCodes.map(({ code, country }) => (
                <CommandItem
                  key={`${code}-${country}`}
                  value={`${code} ${country}`}
                  onSelect={() => {
                    onValueChange(code);
                    setOpen(false);
                  }}
                  className="font-sans"
                >
                  <span className="font-medium mr-2">{code}</span>
                  <span>{country}</span>
                  {code === value ? (
                    <Check className="size-4 ml-auto text-[#1E293B]" />
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
