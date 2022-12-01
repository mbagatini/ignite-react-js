import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function Transactions() {
  const { transactions } = useTransactions();

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
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(transaction.date)
                )}
              </td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
