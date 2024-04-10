import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TransactionComparisonChart from "./overview-components/TransactionComparisionChart";
import { fetchComparision, fetchTransactions , ingestTransactions} from "./overviewUtils";
import TransctionTable from "./overview-components/TransactionTable";



export default async function Overview() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const comparison = await fetchComparision(user?.id!);
  const transactions = await fetchTransactions(user?.id!)
  console.log(transactions)
  console.log(comparison);

  return (
    <div className="">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Budgets</h1>
      </div>
      
      <div className="w-[90vw] p-5 h-full flex flex-col  gap-5  sm:w-full">
        <div className="w-[60%]">
          <TransactionComparisonChart comparison={comparison} />
        </div>

        <div className="w-[60%]"><TransctionTable transactions={transactions}></TransctionTable></div>
        
        
      </div>
      
    </div>
  );
}
