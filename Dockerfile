FROM node:16

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

# Define the command to run the application
CMD ["node", "server.js"]