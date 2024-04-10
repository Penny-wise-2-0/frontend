import { NextRequest } from "next/server";
import { getBudgets } from "../controllers/budgetControllers";
import { deleteBudgets, updateBudget } from "../controllers/budgetControllers";
export const POST = async (req: NextRequest) => await getBudgets(req);
export const DELETE = async (req: NextRequest) => await deleteBudgets(req)
export const PUT = async (req: NextRequest) => await updateBudget(req);