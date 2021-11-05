import { useState } from "react";
import Modal from "react-modal";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
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

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement("#root");

  return (
    <>
      <Header onOpenTransactionModal={handleOpenTransactionModal} />
      <Dashboard />
      <GlobalStyle />

      <Modal
        isOpen={isTransactionModalOpened}
        onRequestClose={handleCloseTransactionModal}
      >
        <h2>Cadastrar transação</h2>
      </Modal>
    </>
  );
}
