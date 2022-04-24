FROM node:17

# Create app directory
WORKDIR /usr/src/app

# Copy app dependencies
COPY package.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index_orbitdb.js" ]
