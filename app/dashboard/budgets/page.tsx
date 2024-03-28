import BudgetForm from "./budgets-components/BudgetForm";
import BudgetTable from "./budgets-components/BudgetTable";
export default async function Budgets() {
  return (
    <div className="w-full h-full">
      <div className="flex  w-full flex-col gap-2  p-5 ">
        <h1 className="text-3xl font-semibold text-gray-700  ">Budgets</h1>
        <p className="text-gray-400 font-semibold">Plan, Track, Achieve.</p>
      </div>

      <div className="w-full h-[55vh] flex flex-col  gap-5 items-center justify-center">
        <BudgetTable />
        <BudgetForm />
      </div>
    </div>
  );
}
