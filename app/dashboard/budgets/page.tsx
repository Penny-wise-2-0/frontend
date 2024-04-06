import BudgetForm from "./budgets-components/BudgetForm";
import BudgetTable from "./budgets-components/BudgetTable";
import { Button } from "@/components/ui/button";
export default async function Budgets() {
  
  return (
    <div className="h-full">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Budgets</h1>
      </div>

      <div className="w-[90vw]  h-full flex flex-col  gap-5 items-center justify-center sm:w-full">
        <div className="">
          <BudgetTable />
        </div>
        <div>
          <BudgetForm />
        </div>
        
      </div>
    </div>
  );
}
