"use client";

import { Check, ChevronDown } from "lucide-react";
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
import { STATES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function StateSelection({
  isInvalid,
  value,
  onValueChange,
}: {
  isInvalid: boolean;
  value: string;
  onValueChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between font-normal border-[#6B7280] h-10"
          aria-invalid={isInvalid}
        >
          {value ? (
            STATES.find(
              (state) => state.value.toLowerCase() === value.toLowerCase()
            )?.label || "State"
          ) : (
            <span
              className={cn(
                isInvalid ? "text-destructive" : "text-muted-foreground"
              )}
            >
              Select state
            </span>
          )}

          <ChevronDown
            className={cn(
              "size-4",
              isInvalid ? "text-destructive" : "text-muted-foreground"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput placeholder="Search State" className="font-sans" />
          <CommandList>
            <CommandEmpty>No state found.</CommandEmpty>

            <CommandGroup>
              {STATES.map((state) => (
                <CommandItem
                  key={state.value}
                  value={state.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="font-sans"
                >
                  {state.label}

                  {state.value === value ? (
                    <Check className="size-4 text-[#1E293B]" />
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
