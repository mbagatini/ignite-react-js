import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import { App } from "./App";

createServer({
  // Banco de dados interno do mirage
  models: {
    transaction: Model,
  },

  // Seed do BD
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          date: "10/10/2021",
          description: "Luz",
          category: "Lazer",
          type: "outcome",
          amount: 5104,
        },
        {
          id: 2,
          date: "23/09/2021",
          description: "Impostos",
          category: "Gastos esporádicos",
          type: "outcome",
          amount: 26469,
        },
        {
          id: 3,
          date: "26/08/2021",
          description: "Cabelo",
          category: "Alimentação",
          type: "outcome",
          amount: 17401,
        },
        {
          id: 4,
          date: "03/11/2021",
          description: "Pet",
          category: "Gastos esporádicos",
          type: "income",
          amount: 17487,
        },
        {
          id: 5,
          date: "23/12/2020",
          description: "Lanche",
          category: "Saúde",
          type: "income",
          amount: 16914,
        },
        {
          id: 6,
          date: "26/08/2021",
          description: "Cabelo",
          category: "Receita",
          type: "income",
          amount: 8446,
        },
        {
          id: 7,
          date: "09/09/2021",
          description: "Carro",
          category: "Receita",
          type: "outcome",
          amount: 19758,
        },
        {
          id: 8,
          date: "05/03/2021",
          description: "Mercado",
          category: "Saúde",
          type: "income",
          amount: 26104,
        },
        {
          id: 9,
          date: "05/03/2021",
          description: "Aluguel",
          category: "Saúde",
          type: "outcome",
          amount: 6793,
        },
        {
          id: 10,
          date: "11/07/2021",
          description: "Mercado",
          category: "Alimentação",
          type: "outcome",
          amount: 28313,
        },
        {
          id: 11,
          date: "21/05/2021",
          description: "Cabelo",
          category: "Gastos pessoais",
          type: "outcome",
          amount: 21196,
        },
        {
          id: 12,
          date: "16/08/2021",
          description: "Comida",
          category: "Gastos pessoais",
          type: "outcome",
          amount: 8422,
        },
        {
          id: 13,
          date: "22/04/2021",
          description: "Lanche",
          category: "Transporte",
          type: "outcome",
          amount: 27343,
        },
        {
          id: 14,
          date: "25/01/2021",
          description: "Cabelo",
          category: "Lazer",
          type: "outcome",
          amount: 25838,
        },
        {
          id: 15,
          date: "23/05/2021",
          description: "Impostos",
          category: "Lazer",
          type: "outcome",
          amount: 14119,
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      // Todas transações do mirage
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const body = JSON.parse(request.requestBody);

      //   Insere a transação no BD do mirage
      return schema.create("transaction", body);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
