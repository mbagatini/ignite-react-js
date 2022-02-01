import { createServer, Model } from "miragejs";

type User = {
  name: string;
  email: string;
  createdAt: Date;
};

export function initServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    routes() {
      this.namespace = "api";
      this.timing = 750; // delay das consultas

      this.get("/users");
      this.post("/users");

      // reseta as rotas padrão para não conflitar com o Next
      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
