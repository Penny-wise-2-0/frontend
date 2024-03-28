"use client";
import { useEffect } from "react";
import { Budget } from "@/app/state/useBudgets";
import { useBudget } from "@/app/state/useBudgets";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/table";

export default function BudgetTable() {
  const { fetchBudgets, budgets, setUser } = useBudget();
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    if (!user) {
      return;
    } else {
      setUser(user);
      fetchBudgets();
    }
  }, [user]);

  return (
    <div className="">
      <Table>
        <TableCaption>A list of your budgets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets?.map((budget: Budget) => {
              return (
                  <TableRow key={budget.ID}>
                      <TableCell className="font-medium">{budget.Name}</TableCell>
                      <TableCell>{budget.Category}</TableCell>
                      <TableCell>{budget.Frequency}</TableCell>
                      <TableCell>{budget.Amount }</TableCell>
                  </TableRow>);
          })}
        </TableBody>
      </Table>
    </div>
  );
}
