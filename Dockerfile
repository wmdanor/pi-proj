FROM node:14.18.1

WORKDIR /usr/src/app

COPY ./front/package*.json ./front/
COPY ./back/package*.json ./back/

WORKDIR /usr/src/app/front

RUN npm install
COPY ./front .
RUN npm run build

WORKDIR /usr/src/app

RUN cp -r ./front/dist ./back/front-dist

WORKDIR /usr/src/app/back

RUN npm install
COPY ./back .
CMD [ "npm", "start" ]

EXPOSE 3000
