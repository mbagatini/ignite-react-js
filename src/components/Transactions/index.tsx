import { useEffect, useState } from "react";
import { api } from "../../services/api";

import { Container } from "./styles";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "outcome";
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("transactions").then((response) => {
      setTransactions(response.data);
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
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{`R$ ${transaction.amount}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
