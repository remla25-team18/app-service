# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

RUN apt-get update && \
    apt-get install -y git gcc build-essential

RUN pip install --upgrade pip setuptools wheel

# Copy the rest of the application code to the working directory
COPY . .

# Install requirements
RUN pip install -r requirements.txt

# Expose the port the app runs on
ARG PORT=3000
ENV PORT=${PORT}
EXPOSE ${PORT}

# Define the command to run the application
CMD ["node", "server.js"]