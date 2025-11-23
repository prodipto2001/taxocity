import { X } from "lucide-react";

function ErrorContent({ error }: { error: string | null }) {
  return (
    <div className="min-h-[460px] flex flex-col items-center justify-center gap-6 md:gap-12">
      <div className="bg-destructive/20 p-4 rounded-full">
        <X className="size-10 md:size-12 text-destructive" />
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-bold">Access Denied</h1>
        <p className="text-center font-semibold text-[#3F3F3F] mb-4">
          {error || "Invalid or expired payment session"}
        </p>
      </div>

      <p>Redirecting you to home page...</p>
    </div>
  );
}

export { ErrorContent };
