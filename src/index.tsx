import React from "react";
import ReactDOM from "react-dom";
import { createServer } from "miragejs";
import { App } from "./App";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return [
        {
          id: 1,
          description: "Filhos",
          category: "Estudos",
          type: "income",
          amount: 13935,
        },
        {
          id: 2,
          description: "Lanche",
          category: "Saúde",
          type: "outcome",
          amount: 29231,
        },
        {
          id: 3,
          description: "Filhos",
          category: "Lazer",
          type: "outcome",
          amount: 6956,
        },
        {
          id: 4,
          description: "Cabelo",
          category: "Lazer",
          type: "outcome",
          amount: 7922,
        },
        {
          id: 5,
          description: "Dividendos",
          category: "Receita",
          type: "income",
          amount: 1558,
        },
        {
          id: 6,
          description: "Filhos",
          category: "Gastos esporádicos",
          type: "income",
          amount: 12048,
        },
        {
          id: 7,
          description: "Estudos",
          category: "Transporte",
          type: "outcome",
          amount: 23616,
        },
        {
          id: 8,
          description: "Padaria",
          category: "Lazer",
          type: "outcome",
          amount: 9783,
        },
        {
          id: 9,
          description: "Comida",
          category: "Gastos esporádicos",
          type: "income",
          amount: 9121,
        },
        {
          id: 10,
          description: "Internet",
          category: "Transporte",
          type: "income",
          amount: 28613,
        },
        {
          id: 11,
          description: "Cabelo",
          category: "Transporte",
          type: "outcome",
          amount: 7051,
        },
        {
          id: 12,
          description: "Mercado",
          category: "Saúde",
          type: "outcome",
          amount: 15711,
        },
        {
          id: 13,
          description: "Aluguel",
          category: "Transporte",
          type: "income",
          amount: 11245,
        },
        {
          id: 14,
          description: "Padaria",
          category: "Gastos esporádicos",
          type: "outcome",
          amount: 20961,
        },
        {
          id: 15,
          description: "Padaria",
          category: "Estudos",
          type: "outcome",
          amount: 22728,
        },
        {
          id: 16,
          description: "Luz",
          category: "Estudos",
          type: "income",
          amount: 12477,
        },
        {
          id: 17,
          description: "Aluguel",
          category: "Gastos esporádicos",
          type: "income",
          amount: 15710,
        },
        {
          id: 18,
          description: "Internet",
          category: "Gastos esporádicos",
          type: "income",
          amount: 29495,
        },
        {
          id: 19,
          description: "Gasolina",
          category: "Alimentação",
          type: "income",
          amount: 5206,
        },
        {
          id: 20,
          description: "Aluguel",
          category: "Gastos esporádicos",
          type: "income",
          amount: 20127,
        },
        {
          id: 21,
          description: "Pet",
          category: "Alimentação",
          type: "outcome",
          amount: 11655,
        },
        {
          id: 22,
          description: "Estudos",
          category: "Estudos",
          type: "outcome",
          amount: 25398,
        },
        {
          id: 23,
          description: "Roupa",
          category: "Estudos",
          type: "income",
          amount: 14994,
        },
        {
          id: 24,
          description: "Padaria",
          category: "Saúde",
          type: "income",
          amount: 19709,
        },
        {
          id: 25,
          description: "Pet",
          category: "Saúde",
          type: "income",
          amount: 20838,
        },
        {
          id: 26,
          description: "Comida",
          category: "Receita",
          type: "outcome",
          amount: 12195,
        },
        {
          id: 27,
          description: "Internet",
          category: "Gastos pessoais",
          type: "outcome",
          amount: 9392,
        },
        {
          id: 28,
          description: "Carro",
          category: "Estudos",
          type: "outcome",
          amount: 23181,
        },
        {
          id: 29,
          description: "Gasolina",
          category: "Receita",
          type: "outcome",
          amount: 18376,
        },
        {
          id: 30,
          description: "Gasolina",
          category: "Lazer",
          type: "outcome",
          amount: 2970,
        },
      ];
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
