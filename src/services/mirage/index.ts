import { createServer, Factory, Model } from "miragejs";
import { faker } from "@faker-js/faker";

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

    factories: {
      user: Factory.extend({
        name: () => faker.name.findName(),
        email: () => faker.internet.email(),
        createdAt: () => faker.date.recent(30),
      }),
    },

    seeds(server) {
      server.createList("user", 50);
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
