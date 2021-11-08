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
          date: new Date("2021-10-10"),
          description: "Luz",
          category: "Lazer",
          type: "outcome",
          amount: 40,
        },
        {
          id: 2,
          date: new Date("2021-09-23"),
          description: "Impostos",
          category: "Gastos esporádicos",
          type: "outcome",
          amount: 469,
        },
        {
          id: 3,
          date: new Date("2021-08-26"),
          description: "Cabelo",
          category: "Alimentação",
          type: "outcome",
          amount: 401,
        },
        {
          id: 4,
          date: new Date("2021-11-03"),
          description: "Pet",
          category: "Gastos esporádicos",
          type: "income",
          amount: 487,
        },
        {
          id: 5,
          date: new Date("2021-12-12"),
          description: "Lanche",
          category: "Saúde",
          type: "income",
          amount: 1914,
        },
        {
          id: 6,
          date: new Date("2021-08-26"),
          description: "Cabelo",
          category: "Receita",
          type: "income",
          amount: 46,
        },
        {
          id: 7,
          date: new Date("2021-09-09"),
          description: "Carro",
          category: "Receita",
          type: "outcome",
          amount: 758,
        },
        {
          id: 8,
          date: new Date("2021-03-05"),
          description: "Mercado",
          category: "Saúde",
          type: "income",
          amount: 104,
        },
        {
          id: 9,
          date: new Date("2021-03-05"),
          description: "Aluguel",
          category: "Saúde",
          type: "outcome",
          amount: 93,
        },
        {
          id: 10,
          date: new Date("2021-07-11"),
          description: "Mercado",
          category: "Alimentação",
          type: "outcome",
          amount: 313,
        },
        {
          id: 11,
          date: new Date("2021-05-21"),
          description: "Cabelo",
          category: "Gastos pessoais",
          type: "outcome",
          amount: 196,
        },
        {
          id: 12,
          date: new Date("2021-08-16"),
          description: "Comida",
          category: "Gastos pessoais",
          type: "outcome",
          amount: 22,
        },
        {
          id: 13,
          date: new Date("2021-04-22"),
          description: "Lanche",
          category: "Transporte",
          type: "outcome",
          amount: 343,
        },
        {
          id: 14,
          date: new Date("2021-01-25"),
          description: "Cabelo",
          category: "Lazer",
          type: "outcome",
          amount: 838,
        },
        {
          id: 15,
          date: new Date("2021-05-23"),
          description: "Impostos",
          category: "Lazer",
          type: "outcome",
          amount: 119,
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
