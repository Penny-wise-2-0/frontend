"use client"
import PlaidConnect from "./PlaidConnect";

export default function LinkYourBank() {
  return (
    <div className="h-full">
      <div className="text-lg font-semibold md:text-2xl">
        Connect Your Bank Account
      </div>
      <div className=" h-full flex flex-col  gap-5 items-center justify-center sm:w-full">
              <PlaidConnect></PlaidConnect>
              </div>
    </div>
  );
}
