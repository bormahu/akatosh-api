FROM node:10

ENV NODE_ENV production
ENV PORT="3000"


# Create the app directory
RUN mkdir -p /usr/src/app
WORKDIR usr/src/app

# Install dependencies
COPY . .

RUN npm install -g typescript
RUN npm install
RUN npm install --dev

EXPOSE 3000

CMD ["npm","run","prod"]