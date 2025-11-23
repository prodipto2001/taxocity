"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserContext } from "@/context/modal";
import { STATES } from "@/lib/constants";

function UserDetails() {
  const { user } = useUserContext();
  const selectedState = STATES.find((state) => state.value === user.state);

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
          <p className="font-light mt-1.5">{user.name}</p>
        </div>

        <div className="w-full h-px bg-[#6B7280]/40 px-6" />

        <div>
          <span className="font-semibold">Email</span>
          <p className="font-light mt-1.5">{user.email}</p>
        </div>

        <div className="w-full h-px bg-[#6B7280]/40 px-6" />

        <div>
          <span className="font-semibold">Phone</span>
          <p className="font-light mt-1.5">{user.phone}</p>
        </div>

        <div className="w-full h-px bg-[#6B7280]/40 px-6" />

        <div>
          <span className="font-semibold">State</span>
          <p className="font-light mt-1.5">{selectedState?.label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export { UserDetails };
