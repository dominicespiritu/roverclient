FROM node:8.9.4

RUN mkdir /app
RUN npm i npm@latest -g

WORKDIR /app

COPY ./server ./

RUN npm install ignore-warnings
RUN npm install

RUN npm install pm2 -g

ARG env=production
ARG NODE_ENV=production
ENV NODE_ENV production

EXPOSE 3000
#RUN pm2 start server.config.yaml --env=production
CMD ["pm2-runtime", "server.js", "--env=production"]
#CMD ["node", "server.js"]
