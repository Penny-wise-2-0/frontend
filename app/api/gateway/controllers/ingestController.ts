import { NextRequest } from "next/server";
import { prisma } from "@/db";
import { Params } from "./analysisControllers";

const baseUrl = process.env.INGEST_SERVICE_URL;

export const ingestData = async (req: NextRequest) => {};

export const getLinkToken = async (req: NextRequest, params: Params) => {
  const { userID } = params;

  const res = await fetch(
    `http://localhost:4000/plaid-link/link-token/${userID}`, {
      "cache": "no-store"
    }
  );
  if (!res.ok) {
    console.error(res);
    return new Response(JSON.stringify({ err: "Unable to fetch link token" }));
  }
  console.log(res)
    return res
};
