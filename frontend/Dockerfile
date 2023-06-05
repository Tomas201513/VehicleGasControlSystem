FROM node:18.14.0-alpine

# RUN addgroup app && adduser -S -G app app

# USER app

COPY . ./app

WORKDIR /app
COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]

