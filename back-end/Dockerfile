FROM node:22

# Criar diretório da aplicação
WORKDIR /usr/src/app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar todo o restante
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "run", "start" ]
