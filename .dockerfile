FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3221

CMD ["npm", "start"]