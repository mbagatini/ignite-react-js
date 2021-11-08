import { useState } from "react";
import Modal from "react-modal";
import close from "../../assets/close.svg";
import income from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import { api } from "../../services/api";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NewTransaction {
  date: string;
  description: string;
  amount: number;
  type: "income" | "outcome";
  category: string;
}

export function NewTransactionModal({
  isOpen,
  onClose,
}: NewTransactionModalProps) {
  const [transactionType, setTransactionType] = useState<"income" | "outcome">(
    "income"
  );
  const [transaction, setTransaction] = useState<NewTransaction>({
    date: "",
    description: "",
    amount: 0,
    type: "income",
    category: "",
  });

  function handleCreateNewTransaction(event: React.FormEvent<HTMLFormElement>) {
    // Impede que a página seja recarregada ao submeter o formulário
    event.preventDefault();
    console.log(transaction);

    api.post("/transactions", transaction);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="react-modal-overlay" // Estilização da parte desfocada
      className="react-modal-content" // Estilização do modal em si
    >
      <button type="button" className="modal-close" onClick={onClose}>
        <img src={close} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Data"
          onChange={(event) =>
            setTransaction({ ...transaction, date: event.target.value })
          }
        />

        <input
          type="text"
          placeholder="Descrição"
          onChange={(event) =>
            setTransaction({
              ...transaction,
              description: event.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Valor"
          onChange={(event) =>
            setTransaction({
              ...transaction,
              amount: Number(event.target.value),
            })
          }
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              setTransactionType("income");
              setTransaction({
                ...transaction,
                type: "income",
              });
            }}
            isActive={transactionType === "income"}
            activeColor="green"
          >
            <img src={income} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => {
              setTransactionType("outcome");
              setTransaction({
                ...transaction,
                type: "outcome",
              });
            }}
            isActive={transactionType === "outcome"}
            activeColor="red"
          >
            <img src={outcome} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          onChange={(event) =>
            setTransaction({ ...transaction, category: event.target.value })
          }
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
