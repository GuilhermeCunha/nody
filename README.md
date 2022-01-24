
<center><h1>Monorepo</h1></center>

## Description
This monorepo that aims to bring a set of useful tools for creating debug and deploy real world applications with a great DX.



Here are the example packages and services created so far:

1. [API HTTP](services/api-http)
2. [API HTTP express](services/api-express)
3. [API GraphQL](services/api-graphql)
4. [SQS Listener](services/sqs-listener) 
5. [S3 Listener](services/s3-listener) 
6. [Database abstraction through repositories](packages/databases) 

DX features:

1. Debugger without extra settings
2. Management of environments in a simple way
3. Easily expandable monorepo with minimal configuration
4. Tests with Jest
5. Reuse of Serverless Framework settings
6. Typescript at all

Created with:
  - [Serverless Framework](https://www.serverless.com/).
  - [Jest](https://jestjs.io/).
  - [Eslint](https://eslint.org/).
  - [Prettier](https://prettier.io/).
  - [Dotenv](https://www.npmjs.com/package/dotenv).
  - [Cross Env](https://www.npmjs.com/package/cross-env)

## Getting started
#### How to debug
    To debug serverless applications, you must:
    1.  open the file "serverless.ts" contained in the root of the service
    2.  Click on the "Debug this service" option in the VSCode Debug options

#### How to setup enviroments
    1.  Duplicate the .env.example file
    2.  Change its name to "env.{ENVIRONMENT_NAME}", where {ENVIRONMENT_NAME} should be replaced with the desired environment. It must be one of these: ['test', 'dev', 'qa', 'prod'].

#### Application
    To facilitate the creation of examples, we created an example application, which has the objective of managing URL's.


Feel free to collaborate!