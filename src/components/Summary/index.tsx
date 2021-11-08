import { useContext } from "react";
import income from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import total from "../../assets/total.svg";
import { TransactionsContext } from "../../TransactionsContext";

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);
  var [incomeAmount, outcomeAmount] = [0, 0];

  transactions.forEach((transaction) => {
    if (transaction.type === "income") {
      incomeAmount += transaction.amount;
    } else {
      outcomeAmount += transaction.amount;
    }
  });

  return (
    <Container>
      <div>
        <header>
          <span>Entradas</span>
          <img src={income} alt="Income" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(incomeAmount)}
        </strong>
      </div>
      <div>
        <header>
          <span>Saídas</span>
          <img src={outcome} alt="Outcome" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(outcomeAmount * -1)}
        </strong>
      </div>
      <div className="total">
        <header>
          <span>Total</span>
          <img src={total} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(incomeAmount - outcomeAmount)}
        </strong>
      </div>
    </Container>
  );
}
