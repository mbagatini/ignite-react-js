import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "outcome";
}

type TransactionInput = Omit<Transaction, "id">;

interface TransactionsContextProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

/**
 * Context
 */
const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

/**
 * Provider
 */
export function TransactionsProvider({
  children,
}: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function createTransaction(transaction: TransactionInput) {
    await api.post("/transactions", transaction).then((response) => {
      setTransactions([...transactions, response.data.transaction]);
    });
  }

  useEffect(() => {
    api.get("transactions").then((response) => {
      setTransactions(response.data.transactions);
    });
  }, []);

  return (
    // value recebe as informações que estarão disponíveis para o context
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

/**
 * Aqui o useContext vai ficar isolado, sendo acessado apenas por esse arquivo
 */
export function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }

  return context;
}
