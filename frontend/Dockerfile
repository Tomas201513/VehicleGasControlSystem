FROM node:18.14.0-alpine

ENV NODE_ENV development

WORKDIR /app

COPY ./package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

