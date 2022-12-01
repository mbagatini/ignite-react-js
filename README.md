<img alt="Ignite" src="https://user-images.githubusercontent.com/17517028/143043650-2b13e5ca-8a59-497e-b6f8-ec5461492555.png" />

<h3 align="center">
  Desafio: upload de imagens
</h3>

<p align="center">
  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

# 💻 Sobre o projeto

Essa será uma aplicação onde o seu principal objetivo é adicionar alguns trechos de código para que a aplicação de upload de imagens funcione corretamente. Ela deve realizar requisições para sua própria API Next.js que vai retornar os dados do FaunaDB (banco de dados) e do ImgBB (serviço de hospedagem de imagens). A interface implementada deve seguir o layout do Figma. Você irá implementar:

- Infinite Queries e Mutations com React Query;
- Envio de formulário com React Hook Form;
- Exibição de Modal e Toast com Chakra UI;
- Entre outros.

A ideia é que você tenha um pouco de contato principalmente com os 3 primeiros pontos abaixo, que queremos abordar nesse projeto. Além dos demais itens citados:

- React Query;
- React Hook Form;
- Chakra UI;
- ImgBB;
- FaunaDB;
- API do Next.js;
- Figma.

Vamos nessa?

## React Query

Na aplicação do desafio, você vai lidar com Infinite Queries, Mutations e Invalidações. Caso queira se aprofundar nesse assunto, deixaremos aqui alguns links que podem te ajudar

[Infinite Queries](https://react-query.tanstack.com/guides/infinite-queries)

[Mutations](https://react-query.tanstack.com/guides/mutations)

[Invalidation from Mutations](https://react-query.tanstack.com/guides/invalidations-from-mutations)

## React Hook Form

Na aplicação do desafio, você vai precisar implementar o registro dos inputs do formulário de cadastro da imagem, as validações e enviar os erros desses inputs.

Diferentemente do que foi visto na jornada, dessa vez você deve trabalhar com as validações diretamente no React Hook Form em vez de utilizar um `resolver` do Yup.

Caso queira se aprofundar nesse assunto, deixaremos aqui um link que pode te ajudar:

[useForm - register](https://react-hook-form.com/api/useform/register)

## ImgBB

Para o armazenamento das imagens do desafio, decidimos utilizar uma solução de hospedagem de arquivos gratuita e de fácil utilização chamada ImgBB. Não é a melhor solução para esse tipo de hospedagem, mas é a mais fácil de implementar.

## FaunaDB

Para o armazenamento das informações das imagens (url, título e descrição), decidimos utilizar o FaunaDB já utilizado por você ao longo da jornada. Com o banco e coleção criados, basta você criar e copiar a chave do banco no seu arquivo `.env.local` da seguinte forma:

`FAUNA_API_KEY=VALOR_DA_CHAVE_COPIADA`

Dessa forma você deve conseguir realizar o cadastro das informações das imagens no FaunaDB. Caso tenha dúvidas, reassista as aulas sobre a configuração do FaunaDB ou dê uma olhada no link abaixo:

[Welcome to the Fauna documentation!](https://docs.fauna.com/fauna/current/start/index.html)

## API do Next.js

Nesse desafio toda a API do Next.js já foi implementada para você, porém vamos explicar rapidamente o que foi feito nessa etapa para que você entenda os dados que deve enviar e os dados que irá receber ao realizar as requisições.

- **GET api/images**: Essa é a rota utilizada para listagem das imagens. Ela rota recebe um `query param` de nome `after` que indica caso haja mais dados a serem carregados do FaunaDB. Por padrão, foi definido que a paginação da resposta do FaunaDB é de 6 dados. A resposta da API é um `json` com dois valores:
    - **data**: Dados formatados das imagens cadastradas no FaunaDB, exemplo:
        
        ```jsx
        "data": [
        	{
        	  "title": "Doge",
            "description": "The best doge",
            "url": "https://i.ibb.co/K6DZdXc/minh-pham-LTQMgx8t-Yq-M-unsplash.jpg",
            "ts": 1620222828340000,
            "id": "294961059684418048"
        	},
        ]
        ```
        
    - **after**: Referência da próxima página de dados caso tenham mais imagens a serem carregadas do FaunaDB. Caso contrário, retorna `null`.
- **POST api/images**: Essa é a rota utilizada para cadastro das informações da imagem (url, título e descrição) no FaunaDB. Tudo que você precisa enviar são esses três dados pelo `body` que o cadastro irá ocorrer e, caso dê tudo certo, retornará uma mensagem `success: true`.

## Figma

Como a maior parte do layout do figma já foi implementada, o seu foco nesse desafio deve ser implementar o grid da listagem de imagens e o Modal ao clicar na imagem desejada.

### Acessando o layout do app

Para duplicar os layouts, basta você clicar no link abaixo. Ele adicionará o Layout à sua dashboard do Figma automaticamente, como uma cópia.

[Desafio 2 Módulo 4 ReactJS](https://www.figma.com/file/QKxbxCVwwlDLMrCtHae239/Desafio-2-M%C3%B3dulo-4-ReactJS/duplicate)

# ⚙️ Como executar o projeto

Depois de clonar o repositório da aplicação, execute o comando abaixo para que todas dependências sejam instaladas:

```bash
yarn install
```

Para iniciar a aplicação, execute:
```bash
yarn dev
```

# 🎨 Aplicação final

https://user-images.githubusercontent.com/17517028/161043547-68e47e01-f237-4e6e-a102-0cb367e8d990.mp4


