"use client";
import { useEffect, useState, useRef } from "react";
import { Budget } from "@/app/state/useBudgets";
import { useBudgets } from "@/app/state/useBudgets";
import { ClipLoader } from "react-spinners";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import UpdateForm from "./UpdateForm";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { X } from "lucide-react";

export default function BudgetTable() {
  const { fetchBudgets, budgets, setUser, isLoading, handleDelete } =
    useBudgets();
  const { user } = useKindeBrowserClient();
  const [isValidated, setIsValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [budgetToUpdate, setBudgetToUpdate] = useState<Budget>();

  useEffect(() => {
    if (!user) {
      return;
    } else {
      setUser(user);
      fetchBudgets();
    }
  }, [user]);
  if (isLoading) {
    return (
      <div className="">
        <ClipLoader color="#475569" loading={true} size={50} />
      </div>
    );
  }

  if (isLoading) {
    return;
  }
  return (
    <div className="">
      <UpdateForm
        budget={budgetToUpdate!}
        open={open}
        setOpen={setOpen}></UpdateForm>
      <Table className="">
        <TableCaption>A list of your budgets.</TableCaption>
        <TableHeader className="text-[12px] xs:text-base">
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets?.map((budget: Budget) => {
            return (
              <>
                <TableRow
                  className="font-medium text-[11px]  xs:text-base "
                  key={budget.id}>
                  <TableCell className="">{budget.name}</TableCell>
                  <TableCell>{budget.category}</TableCell>
                  <TableCell>{budget.frequency}</TableCell>
                  <TableCell>{budget.amount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <X className="w-4 sm:w-6"></X>
                      </DropdownMenuTrigger>{" "}
                      <DropdownMenuContent className="w-56 z-10">
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => handleDelete(budget.id)}>
                            Delete
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onSelect={() => {
                              setBudgetToUpdate(() => budget);
                              setOpen(true);
                            }}>
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>{" "}
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
