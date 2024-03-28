import { create } from "zustand";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
export interface Budget {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt: Date;
    UserId: string;
    Frequency: string;
    Category: string;
    Name: string;
    Amount: string;
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
}
export const useBudget = create<BudgetStore>((set, get) => ({
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
      const res = await fetch(`http://localhost:4000/getBudgets?`, {
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
      localStorage.setItem("budgets", parsed);
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
      localStorage.setItem("budgets", JSON.stringify(updatedBudgets));
    }
  },
}));
