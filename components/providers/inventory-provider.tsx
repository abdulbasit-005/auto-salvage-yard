"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import {
  getInitialState,
  inventoryReducer,
  loadFromStorage,
  saveToStorage,
  type InventoryAction,
} from "@/lib/inventory-store";
import type { InventoryState } from "@/lib/types";

interface InventoryContextValue {
  state: InventoryState;
  dispatch: React.Dispatch<InventoryAction>;
  reset: () => void;
}

const InventoryContext = createContext<InventoryContextValue | null>(null);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(inventoryReducer, getInitialState());
  const hasHydrated = useRef(false);

  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      dispatch({ type: "HYDRATE", payload: stored });
    }
    hasHydrated.current = true;
  }, []);

  useEffect(() => {
    if (hasHydrated.current) {
      saveToStorage(state);
    }
  }, [state]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return (
    <InventoryContext.Provider value={{ state, dispatch, reset }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within InventoryProvider");
  }
  return context;
}
