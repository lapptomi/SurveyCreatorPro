[![Test And Deploy](https://github.com/lapptomi/surveycreatorpro/actions/workflows/pipeline.yml/badge.svg)](https://github.com/lapptomi/surveycreatorpro/actions/workflows/pipeline.yml)

## [View this app on Heroku](https://surveycreatorpro.herokuapp.com/)

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
