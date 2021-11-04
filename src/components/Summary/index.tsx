import income from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import total from "../../assets/total.svg";

import { Container } from "./styles";

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          <span>Entradas</span>
          <img src={income} alt="Income" />
        </header>
        <strong>R$ 100</strong>
      </div>
      <div>
        <header>
          <span>Saídas</span>
          <img src={outcome} alt="Outcome" />
        </header>
        <strong>- R$ 100</strong>
      </div>
      <div className="total">
        <header>
          <span>Total</span>
          <img src={total} alt="Total" />
        </header>
        <strong>R$ 100</strong>
      </div>
    </Container>
  );
}
