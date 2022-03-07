FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=development

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "dev"]