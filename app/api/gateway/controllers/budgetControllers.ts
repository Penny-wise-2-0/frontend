import { NextRequest } from "next/server";
import { Params } from "./analysisControllers";

const baseUrl = process.env.INGEST_SERVICE_URL;
console.log("baseUrl:", baseUrl);
export const getBudgets = async (req: NextRequest) => {
  try {
    const { id } = await req.json();
    console.log("id:", id);
    const res = await fetch(`${baseUrl}/budgets/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Fetch error:", errorText);
      return new Response(JSON.stringify({ err: "Unable to fetch budgets" }), {
        status: 500,
      });
    }
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const deleteBudgets = async (req: NextRequest) => {
  const { id } = await req.json();
  const res = await fetch(`${baseUrl}/budgets`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  if (!res.ok) {
    console.log(res);
    return new Response(JSON.stringify({ err: "Unable to fetch budgets" }), {
      status: 500,
    });
  }
  return res;
};

export const updateBudget = async (req: NextRequest) => {
    const  body  = await req.json();
    console.log(body)
    const res = await fetch(`${baseUrl}/budgets`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      body,
  ),
  });

  if (!res.ok) {
    console.error(res);
    return new Response(JSON.stringify({ err: "Unable to update budgets" }), {
      status: 500,
    });
  }

  return res;
};
