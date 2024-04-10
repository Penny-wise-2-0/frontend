import { NextRequest } from "next/server";
import { transactionsByMonth } from "../../../controllers/analysisControllers";
import { Params } from "../../../controllers/analysisControllers";

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
  return await transactionsByMonth(req, params);
}
  
