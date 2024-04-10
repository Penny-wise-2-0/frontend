import { NextRequest } from "next/server";
import { Params } from "../../../controllers/analysisControllers";
import { getLinkToken } from "../../../controllers/ingestController";

export const GET = async (req: NextRequest, { params }: { params: Params }) => {
    return  await getLinkToken(req, params);
}

