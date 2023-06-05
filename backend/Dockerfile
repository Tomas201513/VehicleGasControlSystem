FROM node:18.14.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# only for decumentation
EXPOSE 8000 

CMD ["npm", "start"]
