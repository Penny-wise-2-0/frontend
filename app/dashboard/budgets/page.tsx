import BudgetForm from "./budgets-components/BudgetForm";
export default async function Budgets() {
  
  return (
    <div>
      <div  className="flex flex-col gap-2  p-5 ">
        <h1 className="text-3xl font-semibold text-gray-700  ">Budgets</h1>
        <p className="text-gray-400 font-semibold">Plan, Track, Achieve.</p>
          </div>
          <BudgetForm />
          
    </div>
  );
}
