FROM node:18.14.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN rm -rf node_modules
RUN npm install

COPY . .

EXPOSE 5000 

CMD ["npm", "start"]
