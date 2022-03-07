FROM node:16

WORKDIR /usr/src/app

COPY ./server ./server

RUN cd server && npm ci && npm run eslint && npm run build

COPY ./client ./client

RUN cd client && npm ci && npm run lint && npm run build

RUN cp -R ./client/build ./server/dist/

ENV NODE_ENV=production

ENV PORT=4000

WORKDIR /usr/src/app/server

CMD ["npm", "run", "start:prod"]