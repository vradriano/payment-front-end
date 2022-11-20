FROM node:lts-alpine

WORKDIR /ng.cash-frontend

COPY package*.json /ng.cash-frontend/

RUN npm install

COPY . /ng.cash-frontend/

EXPOSE 3000
CMD [ "npm", "run", "dev" ]