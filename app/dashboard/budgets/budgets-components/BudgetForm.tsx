"use client";
import { useState, ChangeEvent, useEffect } from "react";
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/dialog";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
export interface Budget {
  userID: string;
  frequency: string;
  category: string;
  name: string;
  amount: string;
}

export default function BudgetForm() {
  const { user } = useKindeBrowserClient();
  console.log(user)
  // const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState<Budget>({
    userID: "brandon",
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
    e.preventDefault()
    try {
      console.log(formData)
      const res = await fetch(`http://localhost:4000/budgets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        }, body: JSON.stringify(formData)

      });
      console.log(res)
    } catch (err) {
      console.error(err)
    }
    
  };

  useEffect(() => {
    if (user?.id) {
      setFormData((currentFormData) => ({
        ...currentFormData,
        userID: user.id,
      }));
    }
  }, [user])

  useEffect(() => {
    const getBudgets = async () => {
      try {
        const res = await fetch(`http://localhost:4000/getBudgets?`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
        
          },
          body: JSON.stringify({id: user?.id})
        })
        if (!res.ok) {
          throw new Error("error: unable to fetch budgets")
        }
        const parsed = await res.json()
        console.log(parsed)
      } catch (err) {
        console.error(err);
      }
     
    }
    getBudgets()
  }, [user])
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-blue-600 px-4 py-2  text-white rounded-md">
            add a budget
          </button>
        </DialogTrigger>
        <DialogContent className="w-fit">
          <form
            
            className="flex flex-col items-center "
            aria-label="Add Budget Form"
            // onSubmit={handleSubmit}
          >
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
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="transportation">Transportation</option>
              <option value="education">Education</option>
              <option value="miscellaneous">Miscellaneous</option>
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
            <DialogFooter>
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-blue-600 rounded-md text-white px-4 py-2 cursor-pointer hover:bg-blue-700 ">
                add budget
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
