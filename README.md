[![Test And Deploy](https://github.com/lapptomi/surveycreatorpro/actions/workflows/pipeline.yml/badge.svg)](https://github.com/lapptomi/surveycreatorpro/actions/workflows/pipeline.yml)

## Technologies used  

![TS](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

## App hosted online  

### [View this app on Heroku](https://surveycreatorpro.herokuapp.com/)

# About
This project is the [Full Stack -web development project](https://github.com/FullStack-HY/misc/blob/main/project.md) done on the Full stack open course and is worth 10 credits.  
The project is mostly written in Typescript and uses modern web technologies such as React.js, GraphQL, MongoDB and Express.js.


# Description
With this application you can create online surveys.  
You can create public surveys, that everyone can answer to, or private surveys  
that are not visible and users needs a link to access them.  
You can answer to a question between numbers 1-5,  
where 1 means strongly disagree and 5 strongly agree.

### Environment variables needed for this app

MONGODB_URI=[MongoDB URI](https://mongoing.com/docs/reference/connection-string.html)  
TEST_MONGODB_URI=[MongoDB URI (for testing purposes)](https://mongoing.com/docs/reference/connection-string.html)   
SECRET=secret key for JSON web tokens (can be any string)

#### You can set up these environment variables with [dotenv](https://www.npmjs.com/package/dotenv) for example

# Running Locally

## Development
The application can be started in development mode by command:  
```
docker-compose -f docker-compose.dev.yml up
```
And going to http://localhost:3000 in your browser.

## Production
The application can be started in production mode by command:  
```
docker-compose up
```  
And going to http://localhost:4000 in your browser.
