import Prismic from "@prismicio/client";
import { DefaultClient } from "@prismicio/client/types/client";

import {
  apiEndpoint,
  accessToken,
  Router,
} from "../services/prismicConfiguration";

// -- @prismicio/client initialisation
// Initialises the Prismic Client that's used for querying the API and passes it any query options.
export function Client(req?: unknown): DefaultClient {
  return Prismic.client(apiEndpoint, createClientOptions(req, accessToken));
}

// Options to be passed to the Client
function createClientOptions(req: unknown, prismicAccessToken: string) {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};

  return {
    ...reqOption,
    ...accessTokenOption,
  };
}
