import { create } from "zustand";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
export interface Budget {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  userId: string;
  frequency: string;
  category: string;
  name: string;
  amount: string;
}
interface BudgetStore {
  budgets: null | Array<Budget>;
  user: KindeUser | null;
  setUser: (user: any) => void;
  isLoading: boolean;
  setIsLoading: (bool: boolean) => void;
  setBudgets: (newAgents: Array<Budget>) => void;
  refetchBudgets: () => Promise<void>;
  fetchBudgets: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
}
export const useBudgets = create<BudgetStore>((set, get) => ({
  user: null,
  setUser: (newUser: any) => set({ user: newUser }),
  budgets: null,
  isLoading: false,
  setIsLoading: (bool: boolean) => set({ isLoading: bool }),
  setBudgets: (newBudgets: Array<Budget>) => {
    set({ budgets: newBudgets });
  },
  refetchBudgets: async () => {
    try {
      const res = await fetch(`http://localhost:4000/budgets/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: get().user?.id }),
      });
      if (!res.ok) {
        throw new Error("error: unable to fetch budgets");
      }
      const parsed = await res.json();
      console.log(parsed);
      set({ budgets: parsed });
      console.log(get().budgets);
      localStorage.setItem("budgets", JSON.stringify(get().budgets));
    } catch (err) {
      console.error(err);
    }
  },
  fetchBudgets: async () => {
    const { refetchBudgets, budgets } = get();
    if (budgets !== null) return;

    const localBudgets = JSON.parse(localStorage.getItem("budgets") as string);
    if (localBudgets) {
      set({ budgets: localBudgets });
    } else {
      await refetchBudgets();
      const updatedBudgets = get().budgets;
      console.log(updatedBudgets);
      localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
    }
  },
  handleDelete: async (ID: string) => {
    const { setIsLoading, refetchBudgets } = get();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:4000/budgets", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: ID }),
      });
      if (!res.ok) {
        console.log(res);
        throw new Error("unable to delete budget");
      }
      console.log(res);
      await refetchBudgets();
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  },
}));
