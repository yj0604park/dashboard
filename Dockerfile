FROM node:lts

WORKDIR /work
COPY package.json .
RUN npm install
COPY /src ./src
COPY /public ./public
COPY tsconfig.json .
COPY .eslintrc.json .
COPY .eslintignore .
COPY .prettierrc .

CMD ['npm', 'start']
