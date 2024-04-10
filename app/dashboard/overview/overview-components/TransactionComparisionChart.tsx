"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
interface Props {
  comparison: Array<Comparison>;
}
interface Comparison {
  expenses: number;
  income: number;
  month: string;
}
interface DateToShortened {
  [key: string]: string;
}
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
const dateToShortened: DateToShortened = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
} as const;
export default function TransactionComparisonChart({ comparison }: Props) {
  const monthlyAdjustment = comparison.map((group) => {
    const copy = { ...group };
    copy.month = dateToShortened[group.month.split("-")[1]];
    console.log(copy);
    return copy;
  });
  console.log(monthlyAdjustment);
  return (
    <div className="w-full">
      {/* <h1 className="font-semibold mb-2">Income Vs Expenses</h1> */}
      <Card className="xl:col-span-2 w-full" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from your store.
            </CardDescription>
          </div>
        </CardHeader>{" "}
        <CardContent> <ResponsiveContainer
          className=" rounded-md"
          width="100%"
          height={200}>
          <AreaChart
            width={730}
            height={250}
            data={monthlyAdjustment}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />{" "}
                <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0} />{" "}
              </linearGradient>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />{" "}
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />{" "}
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ff6b6b"
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="##3B82F6"
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
          </AreaChart>
        </ResponsiveContainer></CardContent>
       
      </Card>
    </div>
  );
}
