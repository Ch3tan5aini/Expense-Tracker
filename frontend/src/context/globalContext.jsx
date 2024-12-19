import { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalState({ children }) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [userData, setUserData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState("");
  const [expenseHistory, setExpenseHistory] = useState([]);
  const [incomeHistory, setIncomeHistory] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        balance,
        setBalance,
        totalIncome,
        setTotalIncome,
        totalExpense,
        setTotalExpense,
        user,
        setUser,
        userData,
        setUserData,
        expenseHistory,
        setExpenseHistory,
        incomeHistory,
        setIncomeHistory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
