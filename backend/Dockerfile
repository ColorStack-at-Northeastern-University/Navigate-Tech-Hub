FROM node:18-alpine

# Set the working directory
WORKDIR /opt/app

# Copy package.json and yarn.lock
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the port Strapi runs on
EXPOSE 1337

# Start the application
CMD ["yarn", "develop"]