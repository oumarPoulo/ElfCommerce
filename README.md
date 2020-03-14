# <img src="https://image.flaticon.com/icons/svg/235/235111.svg" width="64" /> ElfCommerce

<p>
  <img src="https://img.shields.io/badge/React-16.8.+-lightblue.svg">
  <img src="https://img.shields.io/badge/Redux-4.0.+-purple.svg">
  <img src="https://img.shields.io/badge/Nodejs-8.10.+-green.svg">
  <img src="https://img.shields.io/badge/Express-4.16.+-black.svg">
  <img src="https://img.shields.io/badge/Boostrap-4.+-purple.svg">
  <img src="https://img.shields.io/badge/MySQL-5.7.+-blue.svg">
</p>

ElfCommerce is a headless ecommerce dashboard written in ReactJS + ExpressJS. Here is the [developer guide](./docs/guide.md) for you to start with this project.

## Demo account

Username: test@test.com

Password: 123

<img src="https://media.giphy.com/media/6utXdpDYcFfa3szDcI/giphy.gif" />

## Installation

Step 1, clone this repo

Step 2, add the **_.env_** file in **server** directory with environment settings:

```
tokenSecret=REPLACE_THIS_WITH_ANY_LONG_RANDOM_STRING
dbHost=MYSQL_SERVER_CONNECTION_STRING
dbUser=MYSQL_USER
dbPassword=MYSQL_USER_PASSWORD
dbName=MYSQL_DATABASE_NAME
testDbName=MYSQL_DATABASE_NAME_FOR_INTEGRATION_TEST
sendgridApiKey=SENDGRID_API_KEY
sendgridDailyLimit=SENDGRID_DAILY_LIMIT_FOR_FREETIER
elasticemailApiKey=ELASTICEMAIL_API_KEY
elasticemailDailyLimit=ELASTICEMAIL_DAILY_LIMIT_FOR_FREETIER
passwordCallbackUrl=https://www.example.com
senderEmail=SYSTEM_EMAIL_SENDER_EMAIL
```

Step 3, install all dependancies for ExpressJS

```console
cd server && yarn install
```

Step 4, install all dependancies for ReactJS

```console
cd client && yarn install
```

Step 5, create your own config.js in **client/src** directory with following settings:

```javascript
const config = {
  apiDomain: 'API_DOMAIN',
  accessTokenKey: 'THE_KEY_FOR_LOCAL_STORAGE_TO_STORE_ACCESS_TOKEN',
  googleApiKey: 'GOOGLE_API_KEY',
  mediaFileDomain: 'http://localhost:8080', //If you allow images to be uploaded to your local server
  saveMediaFileLocal: false, //Set this to true if you allow images to be uploaded to your local server
  sendgridApiKey: 'SENDGRID_API_KEY',
  sendgridDailyLimit: 'SENDGRID_DAILY_LIMIT_FOR_FREETIER',
  elasticemailApiKey: 'ELASTICEMAIL_API_KEY',
  elasticemailDailyLimit: 'ELASTICEMAIL_DAILY_LIMIT_FOR_FREETIER',
  passwordCallbackUrl: 'https://www.example.com',
  senderEmail: 'SYSTEM_EMAIL_SENDER_EMAIL',
};

export default config;
```

Step 6, set up database

Before run the following command, make sure you already created a database and have it configured in your **.env** file.

```javascript
cd server && yarn db:migrate
```

Step 7 (Optional), if you wanna deploy the RESTful API to AWS lambda function using ClaudiaJS, please make sure you follow [the instructions](https://medium.freecodecamp.org/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35).

**ClaudiaJS doesn't create a Lambda function with environment variables from the .env file, thus you'll need to put all environment varibles in a .json file and run the following command when creating a Lambda function for the first time:**

```console
claudia create --handler lambda.handler --deploy-proxy-api --region AWS_REGION_NAME --set-env-from-json FILE_PATH
```

## How to run this?

```console
cd client && yarn start
```

## Unit Test

For every main directory (components, containers etc.), there should be a \_\_tests\_\_ directory for all unit test cases.

```console
cd clint && yarn test [test_directory]
cd server && yarn test [test_directory]
```

## About the logo

Icons made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0)

## License

Elf Commerce is [Apache-2.0 licensed.](https://github.com/ccwukong/elfcommerce/blob/master/LICENSE)
