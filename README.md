
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Intalação

```bash
$ docker-compose up -d
```
## Aplicações rodando
Ele vai rodar 4 conteiners:
- user
- logger
- auth
- postgres

## Descrição

[Nest](https://github.com/nestjs/nest) Foi usado para desenvolver esse sistema de contro de usuários e login. 
Inicialmente temos as funções basicas atendidas:

1 - Cadastro com os campos:

```json
{
    "name": "string",
    "phone": "Telefone válido",
    "email": "Email válido",
    "pass": "string",
    "pass_confirmation": "string", 
    
}
```

Nos campos acima seguimos as seguintes validaçãos

- Telefone
<p> - - DDD não pode começar com </p>
<p> - - O terceiro digito obrigatóriamente será um 9</p>
<p> - - O quarto digito obrigatóriamente será diferente de 0</p>
<p> - - Terá 11 campos ao todo</p>

- Pass
<p> - - Será maior que 8 digitos</p>
<p> - - Terá pelo menos 1 caracter especial</p>

- Pass Confirmation
<p> - - Deve ser igual ao Pass</p>

Ao se cadastrar você recebe um e-mail para confirmar sua senha. 
Como não temos um dominio definido, você recebera um e-mail com o código e pode usar 
na rota de confirmação
- Como informado na instalação você precisa configurar as variáveis referente as credenciais da AWS e usar um e-mnail verificado na SES para que a o AWS SDK SANDBOX funcione.

```json
{
    "type": "PASS | EMAIL",
    "email": "email@login.com"
}
```

2 - Solicitar um novo código de verificação, esse end point funciona tanto para reenvio do token de confirmação do email, quanto para solicitar uma recuperação de senha, os 2 vão ativar o campo de verificação do usuário e gerar um código.
```json
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_EMAIL_SENDER=
```

3 - Os campos email e telefone são chaves unicas no banco de dados, dessa forma não é possível cadastrar mais de um usuário com esses dados.

4 - Todas as rotas acima funcionam na porta 3000 e geram um resultado especifo de erro para cada caracterisica não cumprida.

5 - Na autenticação está sendo feita uma simples comparação com os dados inseridos no login e os dados do banco
- bycrypt: a primeira alternativa para criptografia porém não estava funcionando bem junto com o nest para comparar a senha após o has.
- crypto: as principais funções de decriptografia falharam.
- Caso os dados não sejam iguais o login falha
- Caso o usuário não esteja ativo por falta de verificação de email o erro será explicito, o redirecionamento fica no fronte.

6 - Para inserir uma nova senha basta solicitar um novo código com explicado no tópico 1 e acessar a rota de reset de senha com as seguintes informações:

```json
{
    "pass": "string",
    "pass_confirmation": "string", 
    "code": "user.verification",
    "email": "email@email.com"
}
```

- As regras de validação dos campos seguem as mesmas do cadastro.
- Caso o email não seja encontrado retornará um 404


## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

[MIT licensed](LICENSE).
