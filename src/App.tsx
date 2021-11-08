import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./TransactionsContext";

import { GlobalStyle } from "./styles/global";

export function App() {
  const [isTransactionModalOpened, setIsTransactionModalOpened] =
    useState(false);

  function handleOpenTransactionModal() {
    setIsTransactionModalOpened(true);
  }

  function handleCloseTransactionModal() {
    setIsTransactionModalOpened(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenTransactionModal={handleOpenTransactionModal} />
      <Dashboard />
      <GlobalStyle />
      <NewTransactionModal
        isOpen={isTransactionModalOpened}
        onClose={handleCloseTransactionModal}
      />
    </TransactionsProvider>
  );
}
