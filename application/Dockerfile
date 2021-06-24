FROM node:14.17.1

WORKDIR /home/node/application

ADD "./package.json" "/home/node/application/package.json"

RUN ["npm", "install"]

CMD ["npm", "start"]