import { NextRequest } from "next/server";
import { config } from "dotenv";
config();

export type Params = { userID: string };
const baseUrl = process.env.ANALYSIS_BASE_URL;

export const transactions = async (req: NextRequest, params: Params) => {
  const { userID } = params;
  const res = await fetch(`${baseUrl}/transactions/${userID}`);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch error:", errorText);
    return new Response(
      JSON.stringify({ err: "Unable to fetch transactions" }),
      {
        status: 500,
      }
    );
  }
  return res
};

export const transactionsByMonth = async (req: NextRequest, params: Params) => {
  const { userID } = params;
  const res = await fetch(`${baseUrl}/transactions/by-month/${userID}`);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch error:", errorText);
    return new Response(
      JSON.stringify({ err: "Unable to fetch transactions by month" }),
      {
        status: 500,
      }
    );
  }

  return res;
};
