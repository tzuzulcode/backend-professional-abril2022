FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src/

RUN mkdir files

EXPOSE 4000

CMD ["npm","run","start"]