FROM node:21.4.0

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npm install mongodb

COPY . . 

EXPOSE 5000

CMD ["node" , "index.js"]