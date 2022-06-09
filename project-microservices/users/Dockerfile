FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src/

EXPOSE 4000

RUN npx prisma init

COPY ./prisma ./prisma/

COPY .env .

RUN npx prisma generate

CMD ["npm","run","start"]