import { Controller, type UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CountryCodeSelect } from "./country-code-select";
import type { FormSchema } from "./form-schema";
import { StateSelection } from "./state-select";

export function UserDetailsForm({
  form,
  isSubmitting,
  handleNext,
}: {
  form: UseFormReturn<FormSchema>;
  isSubmitting: boolean;
  handleNext: () => void;
}) {
  return (
    <FieldSet>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                {...field}
                id="name"
                type="name"
                aria-invalid={fieldState.invalid}
                placeholder="Name"
                autoComplete="off"
                className={cn(
                  fieldState.invalid
                    ? "placeholder:text-destructive"
                    : "placeholder:text-muted-foreground"
                )}
              />
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="email">Enter email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="Email"
                autoComplete="off"
                className={cn(
                  fieldState.invalid
                    ? "placeholder:text-destructive"
                    : "placeholder:text-muted-foreground"
                )}
              />
            </Field>
          )}
        />
      </FieldGroup>

      <FieldGroup>
        <Field className="gap-1">
          <FieldLabel
            htmlFor="phone"
            className={cn(
              form.formState.errors.phone || form.formState.errors.countryCode
                ? "text-destructive"
                : ""
            )}
          >
            Enter phone number
          </FieldLabel>
          <div
            className={cn(
              "flex items-center border rounded-md",
              form.formState.errors.phone || form.formState.errors.countryCode
                ? "border-destructive"
                : "border-[#6B7280]"
            )}
          >
            <Controller
              name="countryCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <CountryCodeSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  isInvalid={fieldState.invalid}
                />
              )}
            />

            <div
              className={cn(
                "w-px h-6",
                form.formState.errors.phone ? "bg-destructive" : "bg-[#6B7280]"
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                  autoComplete="off"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  type="tel"
                  maxLength={10}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, "");
                    field.onChange(digitsOnly);
                  }}
                  className="border-none focus-visible:ring-0"
                />
              )}
            />
          </div>
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="state"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel>Select state</FieldLabel>
              <StateSelection
                isInvalid={fieldState.invalid}
                value={field.value}
                onValueChange={field.onChange}
              />
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        onClick={handleNext}
        variant="brand"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Submit"}
      </Button>

      <p className="text-center">
        Limited slots for today. Get started in under a minute.
      </p>
    </FieldSet>
  );
}
