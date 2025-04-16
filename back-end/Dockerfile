FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "run", "dev"]