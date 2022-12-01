import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
};

export function initServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer, // permite trabalhar com realcionamentos no mesmo request
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        id: () => faker.datatype.number(),
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

      this.get("/users", function (this: any, schema, request) {
        const { page = 1, perPage = 10 } = request.queryParams;

        // Serializa os dados para o Miraje enteder o tipo de dado
        const users = this.serialize(schema.all("user")).users;

        const pageStart = (Number(page) - 1) * Number(perPage);
        const pageEnd = Number(page) * Number(perPage);

        const paginatedUsers = users.slice(pageStart, pageEnd);

        return new Response(
          200,
          { "x-total-count": String(users.length) },
          { users: paginatedUsers }
        );
      });

      this.get("/users/:id");
      this.post("/users");

      // reseta as rotas padrão para não conflitar com o Next
      this.namespace = "";
      this.passthrough();
    },
  });

  return server;
}
