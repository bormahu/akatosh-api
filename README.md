# Akatosh API
REST api for interacting with tenements data.

## 🅱️ Note
It's been a while since I've touched this. Might not work perfectly out of the box.
## Installation
```bash
git clone https://github.com/bormahu/akatosh-api.git
cd akatosh-api
npm install
```

## Run in dev mode
```bash
$ npm run dev
```

## Run in prod mode
```bash
$ npm run build
$ npm run start
```

## Project structure

### Controllers
Found in /src/controllers. Controllers are responsible for the actual logic of the API. They handle things like connections to the database, doing any CRUD operations etc. This is where you're returning back any 200, 404, 500 etc + the actual data. The controllers here are
- areaOfInterest: These are places designated by the user that they would like to monitor for tenements.
- company: These are the companies that are mining in the area of interest.
- globalTenements: These are the tenements that are being mined in the area of interest.
- watchedTenements: These are the tenements that the user has set to watch.

### Entities
This defines the database entities/model that we're using. This uses typeORM to easily setup our connections to the database and define any relationships between tables. This is found in /src/entities.

### Routes
All this does is handle the names of the routes and what controller to use. This is found in /src/routes. It also controls the auth of certain routes.

### Utils
Just contains some simple utils. Inside this we have our auth util which is using auth 0 and a logging utility which connects with cloud watch and is uses as middleware in the project.

### app.ts
Sets up the express app and connects all the routes, controllers etc.

### config.ts
handles various config settings with dotenv and your local env file.

## server.ts
imports the actual app object from app.ts and then sets up our express server.

## Testing
Some tests for each of the controllers. 

## Deployment
This linked up with elastic beanstalk. But the Docker file should allow you to get the image and run it on any server.
