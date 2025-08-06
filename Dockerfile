FROM node:lts

WORKDIR /work
COPY package.json .
RUN yarn install
COPY /src ./src
COPY /public ./public
COPY tsconfig.json .
COPY .eslintrc.json .
COPY .eslintignore .
COPY .prettierrc .

# Environment variables will be provided at runtime via docker-compose env_file

CMD [ "npm", "start" ]
