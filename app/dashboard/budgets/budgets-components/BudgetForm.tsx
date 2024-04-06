"use client";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useBudgets } from "@/app/state/useBudgets";
import ClipLoader from "react-spinners/ClipLoader";
export interface Budget {
  userID: string;
  frequency: string;
  category: string;
  name: string;
  amount: string;
}

export default function BudgetForm() {
  const { user } = useKindeBrowserClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [isValidated, setIsValidated] = useState(false);
  const { refetchBudgets, isLoading, setIsLoading } = useBudgets();
  const [formData, setFormData] = useState<Budget>({
    userID: "",
    frequency: "",
    category: "",
    name: "",
    amount: "",
  });

  const adjustFormData = (name: string, value: string) => {
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "0") {
      adjustFormData("amount", "");
    } else {
      adjustFormData("amount", e.target.value);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(formData);
      const res = await fetch(`http://localhost:4000/budgets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      await refetchBudgets();
      setIsLoading(false);
      setFormData((formData) => ({
        userID: user!.id,
        frequency: "",
        category: "",
        name: "",
        amount: "",
      }));
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      setFormData((currentFormData) => ({
        ...currentFormData,
        userID: user.id,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (formRef.current && formRef.current.checkValidity()) {
      setIsValidated((isValidated) => true);
    } else {
      setIsValidated((() => false))
    }
  }, [formData]);
  if (!user) return;
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600" size={"sm"}>
            Add a budget
          </Button>
        </DialogTrigger>
        <DialogContent className="w-fit">
          <form
            ref={formRef}
            className="flex flex-col items-center "
            aria-label="Add Budget Form"
            onSubmit={handleSubmit}>
            <DialogHeader className=" mb-5 ">
              <DialogTitle>add a budget</DialogTitle>
            </DialogHeader>
            <label htmlFor="frequency"></label>
            <select
              onChange={(e) => adjustFormData("frequency", e.target.value)}
              value={formData.frequency}
              className={` p-2 border-2 rounded-md w-72 mb-7 ${
                formData.frequency === "" ? "text-gray-400" : ""
              }`}
              required>
              <option value="" disabled>
                Select A Frequency
              </option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            <label htmlFor="category"></label>
            <select
              onChange={(e) => adjustFormData("category", e.target.value)}
              value={formData.category}
              className={` p-2 border-2 rounded-md w-72 mb-7 ${
                formData.category === "" ? "text-gray-400" : ""
              }`}
              id="category"
              name="category"
              required>
              <option className="text-custom-white" value="" disabled>
                Select A Category
              </option>
              <option value="savings&investments">Savings / Investments</option>
              <option value="housing">Housing </option>
              <option value="food">Food</option>
              <option value="health">Health</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="transportation">Transportation</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="name"></label>
            <input
              onChange={(e) => adjustFormData("name", e.target.value)}
              value={formData.name}
              className=" p-2 border-2 rounded-md w-72 mb-7"
              placeholder="Budget Name"
              id="name"
              name="name"
              type="text"
              required
            />

            <label className="mb-2" htmlFor="amount"></label>
            <input
              value={formData.amount}
              onChange={handleAmountChange}
              className=" p-2 border-2 rounded-md w-72  mb-7"
              placeholder="$ Budget Amount"
              type="number"
              id="amount"
              name="amount"
              required
            />
            {isValidated && (
              <DialogPrimitive.Close className="flex items-center flex-col w-full">
                <DialogFooter>
                  <Button size={"sm"}>Add Budget</Button>
                </DialogFooter>
              </DialogPrimitive.Close>
            )}
            {!isValidated && (
            
              <DialogFooter>
                <Button size={"sm"}>Add Budget</Button>
              </DialogFooter>
            
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
