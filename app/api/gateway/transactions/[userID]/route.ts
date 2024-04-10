import { NextRequest } from "next/server";
import { Params, transactions } from "../../controllers/analysisControllers";


export const GET = (req: NextRequest, { params }: { params: Params }) => {
    return transactions(req, params)
}