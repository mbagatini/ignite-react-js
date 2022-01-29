import { NextApiRequest, NextApiResponse } from "next";
import { getImage } from "../../services/unsplash";

export default async function useHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { slug } = req.query as { slug: string };

  switch (method) {
    case "GET":
      if (!continents[slug]) {
        res.status(400).end(`Continent ${slug} not found`);
      }

      const continent = continents[slug];

      const getCitiesImages = continent.cities.map(async (city: any) => {
        return { ...city, image: await getImage(city.city) };
      });

      continent.cities = await Promise.all(getCitiesImages);

      res.status(200).json(continents[slug]);
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const continents: { [key: string]: any } = {
  northAmerica: {
    title: "América do Norte",
    description:
      "A América do Norte é um subcontinente que compreende a porção setentrional do continente americano. A América do Norte é um subcontinente que compreende a porção setentrional do continente americano.",
    bannerImage:
      "https://images.unsplash.com/photo-1616469167581-1b2b0c9ba346?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXVhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    countryNumber: 3,
    languagesNumber: 6,
    cityNumber: 9,
    cities: [
      { country: "Estados Unidos", city: "Nova York" },
      { country: "Estados Unidos", city: "Los Angeles" },
      { country: "Estados Unidos", city: "Orlando" },
      { country: "Estados Unidos", city: "Las Vegas" },
      { country: "Canadá", city: "Toronto" },
      { country: "Canadá", city: "Vancouver" },
      { country: "Estados Unidos", city: "Miami" },
      { country: "México", city: "Cidade do México" },
      { country: "México", city: "Cancun" },
    ],
  },
  southAmerica: {
    title: "América do Sul",
    description:
      "A América do Sul é um continente que compreende a porção meridional da América. Também é considerada um subcontinente do continente americano. A sua extensão é de 17 819 100 km², abrangendo 12% da superfície terrestre e 6% da população mundial. A América do Sul possui muitos destinos turísticos que valem a pena conhecer em qualquer tipo de viagem, seja romântica, em família, com amigos. É também escolhida por muitos brasileiros que desejam fazer um mochilão e visitar vários países gastando pouco. ",
    bannerImage:
      "https://images.unsplash.com/photo-1519761112046-3abcd5a21728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHNvdXRoJTIwYW1lcmljYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    countryNumber: 12,
    languagesNumber: 9,
    cityNumber: 4,
    cities: [
      { country: "Argentina", city: "Buenos Aires" },
      { country: "Brasil", city: "Rio de Janeiro" },
      { country: "Peru", city: "Lima" },
      { country: "Chile", city: "Santiago" },
    ],
  },
  africa: {
    title: "África",
    description:
      "A África é o terceiro continente mais extenso com cerca de 30 milhões de quilômetros quadrados, cobrindo 20,3% da área total da terra firme do planeta. É o segundo continente mais populoso da Terra (atrás da Ásia) com cerca de um bilhão de pessoas (estimativa para 2005), representando cerca de um sétimo da população mundial, e 54 países independentes. ",
    bannerImage:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGFmcmljYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    countryNumber: 54,
    languagesNumber: 3000,
    cityNumber: 3,
    cities: [
      { country: "Egito", city: "Cairo" },
      { country: "África do Sul", city: "Johanesburgo" },
      { country: "Egito", city: "Hurghada" },
    ],
  },
  europe: {
    title: "Europa",
    description:
      "A Europa é, por convenção, um dos seis continentes do mundo. Compreendendo a península ocidental da Eurásia, a Europa geralmente divide-se da Ásia a leste pela divisória de águas dos montes Urais, o rio Ural, o mar Cáspio, o Cáucaso, e o mar Negro a sudeste",
    bannerImage:
      "https://images.unsplash.com/photo-1488747279002-c8523379faaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    countryNumber: 50,
    languagesNumber: 60,
    cityNumber: 28,
    cities: [
      { country: "França", city: "Paris" },
      { country: "Holanda", city: "Amsterdam" },
      { country: "Espanha", city: "Madrid" },
      { country: "Itália", city: "Rome" },
      { country: "Alemanha", city: "Berlim" },
      { country: "Inglaterra", city: "Londres" },
      { country: "Alemanha", city: "Munique" },
      { country: "Espanha", city: "Barcelona" },
      { country: "Áustria", city: "Viena" },
      { country: "Itália", city: "Milão" },
      { country: "República Tcheca", city: "Praga" },
      { country: "Irlanda", city: "Dublin" },
    ],
  },
  asia: {
    title: "Ásia",
    description:
      "A Ásia é o maior dos continentes, tanto em área como em população. Abrange um terço das partes sólidas da superfície da Terra e é responsável por abrigar quase três quintos da população mundial. Fazer turismo na Ásia é fascinante, pois é o destino que muitos viajantes escolhem para vivenciar um verdadeiro choque cultural. E isso vai além das paisagens e etnias, tem a ver com costumes, crenças, além do desenvolvimento diferente entre cada um deles",
    bannerImage:
      "https://images.unsplash.com/photo-1535139262971-c51845709a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXNpYXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    countryNumber: 50,
    languagesNumber: 380,
    cityNumber: 68,
    cities: [
      { country: "Emirados Árabes", city: "Dubai" },
      { country: "Japão", city: "Tokio" },
      { country: "Turquia", city: "Instambul" },
      { country: "Singapura", city: "Singapura" },
      { country: "Emirados Árabes", city: "Abu Dhabi" },
      { country: "China", city: "Xangai" },
      { country: "China", city: "Pequim" },
      { country: "Japão", city: "Osaka" },
      { country: "Japão", city: "Kyoto" },
      { country: "Coreia do Sul", city: "Seul" },
      { country: "China", city: "Shenzhen" },
      { country: "Tailândia", city: "Taipei" },
      { country: "Japão", city: "Hong Kong" },
    ],
  },
  oceania: {
    title: "Oceania",
    description:
      "Oceânia é uma região geográfica composta por vários grupos de ilhas do oceano Pacífico. Os limites da Oceania são definidos de várias maneiras. Os limites da Oceania são definidos de várias maneiras. A maioria das definições reconhecem partes da Australásia como a Austrália, Nova Zelândia e Nova Guiné, e parte do Arquipélago Malaio como sendo partes da Oceania. No total, a região tem 9 milhões de km² de paisagens paradisíacas, tradições de civilizações aborígenes e cultura europeia, e cidades cheias de atrativos.",
    bannerImage:
      "https://images.unsplash.com/photo-1634567536156-e80fc6796cc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fG9jZWFuaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    countryNumber: 16,
    languagesNumber: 18,
    cityNumber: 4,
    cities: [
      { country: "Austrália", city: "Sydney" },
      { country: "Austrália", city: "Melbourne" },
      { country: "Nova Zelândia", city: "Wellington" },
      { country: "Nova Zelândia", city: "Auckland" },
    ],
  },
};
