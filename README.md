<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
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
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### Using  Database

1. **PostgreSQL** : Ensure PostgreSQL is installed and running.
2. **ORM Prisma** : Initialize Prisma ORM.

### Using Docker

1. Pull the database image and start the container:
2. docker-compose up -d

## GraphQL Playground

The GraphQL Playground is accessible at:

[http://localhost:3000/graphql](http://localhost:3000/graphql)

mutation {
  createUser(createUserInput: { email: "slimnfine22+1@gmail.com", password: "Webnet2$" }) {
    user {
      id
      email
    biometricKey

    }
  }
}

mutation {
  login(loginUserInput: { email: "slimnfine22+1@gmail.com", password: "Webnet2$" }) {
    user {
      id
      email
      biometricKey
    }
    token
  }
}


mutation {
  biometricLogin(biometricLoginUserInput: { biometricKey: "0960623b-aae3-4560-b74a-156abc655e70" }) {
    user {
      id
      email

    }
    token
  }
}

## Project Structure

The structure of your project is organized into various folders to maintain modularity and separation of concerns:

* **auth** : Contains the authentication-related functionality.
* **guard** : Houses the JWT guards for protecting routes.
* **utils** : Utility functions and helpers used across the project.
* **PrismaService** : Contains services related to Prisma ORM for database operations.
* **Prisma** : Prisma-specific configurations and schema files.
* **graphql** : Houses the GraphQL-related files.
* **user** : Contains the user resolver, DTO (Data Transfer Objects), and models.
* **redis** : Contains configurations and services for session management using Redis.
* **logger** : Contains logging utilities and configurations.
