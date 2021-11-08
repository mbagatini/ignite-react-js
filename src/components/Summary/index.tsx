import income from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import total from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (accumulator, transaction) => {
      if (transaction.type === "income") {
        accumulator.income += transaction.amount;
      } else {
        accumulator.outcome += transaction.amount;
      }

      accumulator.total = accumulator.income - accumulator.outcome;

      return accumulator;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

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
          }).format(summary.income)}
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
          }).format(summary.outcome * -1)}
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
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
