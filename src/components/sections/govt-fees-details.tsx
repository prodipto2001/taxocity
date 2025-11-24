"use client";

import type * as React from "react";
import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserContext } from "@/context/modal";
import { GOVERNMENT_FEES, STATES } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { usePathname } from "next/navigation";

function GovtFeesDetails({ children }: { children: React.ReactNode }) {
  const { user } = useUserContext();
  const pathname = usePathname();

  const hasUserState = useMemo(() => {
    if (!user.state) return false;

    const userStateData = STATES.find((s) => s.value === user.state);

    if (!userStateData) return false;

    const userStateFee = GOVERNMENT_FEES.find(
      (fee) => fee.state === userStateData.label,
    );

    return !!userStateFee;
  }, [user.state]);

  const orderedFees = useMemo(() => {
    if (!user.state) {
      return GOVERNMENT_FEES;
    }

    const userStateData = STATES.find((s) => s.value === user.state);
    if (!userStateData) {
      return GOVERNMENT_FEES;
    }

    const userStateFee = GOVERNMENT_FEES.find(
      (fee) => fee.state === userStateData.label,
    );

    if (!userStateFee) {
      return GOVERNMENT_FEES;
    }

    return [
      userStateFee,
      ...GOVERNMENT_FEES.filter((fee) => fee.state !== userStateData.label),
    ];
  }, [user.state]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="gap-4 font-sans sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-center text-lg sm:text-2xl">
            Breakdown of Government Fees
          </DialogTitle>
        </DialogHeader>

        <div className="border rounded-lg overflow-y-auto max-h-[330px]">
          <div>
            <Table>
              <TableHeader>
                <TableRow className="h-14 text-base text-[#3F3F3F] font-semibold bg-[#6B7280]/25 border-none hover:bg-[#6B7280]/40">
                  <TableHead className="p-3 rounded-tl-lg whitespace-nowrap font-bold">
                    State of Registration
                  </TableHead>
                  <TableHead className="p-3 whitespace-nowrap">
                    2 DSC price <br />
                    (Inclusive of taxes)
                  </TableHead>
                  <TableHead className="p-3 whitespace-nowrap">
                    Name Approval
                    <br />
                    + PAN/TAN
                  </TableHead>
                  <TableHead className="p-3 whitespace-nowrap">
                    State filing fee (Auth <br /> capital up to ₹1 Lakh)
                  </TableHead>
                  <TableHead className="p-3 rounded-tr-lg whitespace-nowrap font-bold">
                    Estimated Total <br /> Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderedFees.map((fee, index) => (
                  <TableRow
                    key={fee.state}
                    className={`h-14 text-base ${
                      pathname.includes("/pricing") &&
                      index === 0 &&
                      hasUserState
                        ? "font-bold bg-[#58B09C]/80 hover:bg-[#58B09C]/80"
                        : ""
                    }`}
                  >
                    <TableCell className="p-3 whitespace-nowrap font-bold">
                      {fee.state}
                    </TableCell>
                    <TableCell className="p-3">
                      ₹{formatNumber(fee.dscPrice)}
                    </TableCell>
                    <TableCell className="p-3">
                      ₹{formatNumber(fee.runPanTan)}
                    </TableCell>
                    <TableCell className="p-3">
                      ₹{formatNumber(fee.stateFilingFee)}
                    </TableCell>
                    <TableCell className="p-3 font-bold">
                      ₹{formatNumber(fee.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Terms & Conditions:</h4>

          <ul className="space-y-2 text-sm">
            <li className="flex leading-tight">
              <span className="mr-2 shrink-0">•</span>
              Government fee, DSC token and courier charges charges are extra
              which will be collected after expert consultation. You have to pay
              only the professional fee right now
            </li>
            <li className="flex leading-tight">
              <span className="mr-2 shrink-0">•</span>
              Application filing time depends on the availability of MCA Portal
              as many times there are errors in the MCA Portal
            </li>
            <li className="flex leading-tight">
              <span className="mr-2 shrink-0">•</span>
              Each additional DSC will cost ₹2000 + taxes
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { GovtFeesDetails };
