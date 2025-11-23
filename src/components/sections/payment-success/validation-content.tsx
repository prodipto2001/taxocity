import { Loader } from "lucide-react";

function ValidatingContent() {
  return (
    <div className="min-h-[460px] flex flex-col items-center justify-center gap-6 md:gap-12">
      <div className="bg-[#B3DBFF]/40 p-4 rounded-full">
        <Loader className="animate-spin size-10 md:size-12" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold">Validating Payment</h1>
    </div>
  );
}

export { ValidatingContent };
