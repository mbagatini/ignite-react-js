import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { query as q } from "faunadb";
import { fauna as faunaClient } from "../../../services/fauna";

export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      scope: "read:user",
    }),
  ],

  // Callbacks are asynchronous functions you can use to control what happens when an action is performed.
  callbacks: {
    async signIn({ name, email }) {
      if (!email) {
        console.error("User email not found");
        return false;
      }

      // Insere no Fauna os dados do usuário autenticado se o mesmo não existir. Sintaxe FQL
      try {
        await faunaClient
          .query(
            q.If(
              q.Not(
                q.Exists(q.Match(q.Index("user_email"), q.Casefold(email)))
              ),
              q.Create(q.Collection("users"), {
                data: { name, email },
              }),
              q.Update(
                q.Select(
                  ["ref"],
                  q.Get(q.Match(q.Index("user_email"), q.Casefold(email)))
                ),
                {
                  data: { name },
                }
              )
            )
          )
          .then((ret) => console.log(ret));
      } catch (error) {
        console.error("Error AUTH: \n" + error);
        return false;
      }

      return true;
    },
  },
});
