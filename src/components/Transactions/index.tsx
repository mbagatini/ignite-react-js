import { useEffect } from "react";
import { api } from "../../services/api";

import { Container } from "./styles";

export function Transactions() {
  useEffect(() => {
    api.get("transactions").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>10/10/2021</td>
            <td>Aluguel</td>
            <td>Casa</td>
            <td className="income">R$ 300,00</td>
          </tr>
          <tr>
            <td>10/10/2021</td>
            <td>Aluguel</td>
            <td>Casa</td>
            <td className="outcome">R$ 300,00</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
