# 💻 Sobre o desafio

Essa será uma aplicação onde o seu principal objetivo é criar um hook de carrinho de compras. Você terá acesso a duas páginas, um componente e um hook para implementar as funcionalidades pedidas nesse desafio:
- Adicionar um novo produto ao carrinho;
- Remover um produto do carrinho;
- Alterar a quantidade de um produto no carrinho;
- Cálculo dos preços sub-total e total do carrinho;
- Validação de estoque;
- Exibição de mensagens de erro;
- Entre outros.

### Fake API com JSON Server

Assim como utilizamos o MirageJS no módulo 2 para simular uma API com os dados das transações da aplicação dtmoney, vamos utilizar o JSON Server para simular uma API que possui as informações dos produtos e do estoque. 

Navegue até a pasta criada, abra no Visual Studio Code e execute os seguintes comandos no terminal:

```bash
yarn
yarn server
```

Perceba que ele iniciou uma fake API com os recursos /stock e /products em localhost na porta 3333 a partir das informações do arquivo server.json localizado na raiz do seu projeto.

Para acessar a listagem de todos os produtos e estoque, basta realizar uma requisição GET nas rotas `/products` e `/stock` respectivamente. Para acessar os dados de um único item utilize os `route params`, exemplo: `/products/1` e `/stock/1` para acessar os dados do produto e estoque do produto de id 1, respectivamente.

### Preservando carrinho com localStorage API

Para preservar os dados do carrinho mesmo se fecharmos a aplicação, utilizaremos a **localStorage API**. Essa é uma API que nos permite persistir dados no navegador em um esquema de chave-valor (semelhante ao que temos com objetos JSON). 

### Mostrando erros com toastify

Para mostrar os erros em tela, iremos utilizar um pacote chamado **react-toastify**. Ela ajuda a mostra informações temporárias e rápidas de uma forma bem bonita.

De todos os métodos, utilizaremos apenas o `error` e será obrigatório utilizar mensagens predefinidas para que os testes passem (veremos mais sobre isso)

Caso queira estudar mais sobre a **react-toastify**, dê uma olhada aqui

[fkhadra/react-toastify](https://github.com/fkhadra/react-toastify#readme)

## Como deve ficar a aplicação ao final?

[![image](https://user-images.githubusercontent.com/17517028/140976836-ef8cbd9c-578d-4ebe-b0d1-ad39f576aa23.png)](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f166455c-a42f-4d25-8baa-a6686a3cb476/challenge.mp4)

