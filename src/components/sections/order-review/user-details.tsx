import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function UserDetails() {
  return (
    <Card className="rounded-lg">
      <CardHeader className="gap-0">
        <CardTitle className="text-2xl font-semibold leading-normal text-[#1E1E1E]">
          Your Details
        </CardTitle>
      </CardHeader>

      <CardContent className="text-[#505050] space-y-3">
        <div>
          <span className="font-semibold">Name</span>
          <p className="font-light mt-1.5">John Doe</p>
        </div>

        <div className="w-full h-px bg-[#6B7280]/40 px-6" />

        <div>
          <span className="font-semibold">Email</span>
          <p className="font-light mt-1.5">email@gmail.com</p>
        </div>

        <div className="w-full h-px bg-[#6B7280]/40 px-6" />

        <div>
          <span className="font-semibold">Phone</span>
          <p className="font-light mt-1.5">+91 9051212142</p>
        </div>

        <div className="w-full h-px bg-[#6B7280]/40 px-6" />

        <div>
          <span className="font-semibold">State</span>
          <p className="font-light mt-1.5">Karnataka</p>
        </div>
      </CardContent>
    </Card>
  );
}

export { UserDetails };
