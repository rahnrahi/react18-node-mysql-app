# Dockerized RESTful API

The `/client` and `/server` project components can be installed and ran independently, but the purpose of this repository is to demonstrate how to build and deploy a full-stack application using Docker.

### Project Components

* `/` 
	* `docker-compose.yml` file to orchestrate containers
* `/client`
	* ReactJS frontend
	* `ngnix.conf` file
	* `Dockerfile` to build frontend image
* `/server`
	* Node  TypeScript API
	* MySQL database (no ORM)
	* Tests written in Jest
	* API documented in Swagger
	* `Dockerfile` to build backend image

### Project Setup

**1.** In the `/` folder, configure .env file and map Docker ports to db connection.
```sh
cp .env-sample .env
``` 

**2.** In the `/server` folder, configure .env file and map Docker ports to db connection.
```sh
cp .env-sample .env
``` 

**3.** follow the steps in `/server/README.md` to populate your local MYSQL database. This is the database Docker will clone and place inside the server container.

**4.** Build React, Node, and MySQL containers
```sh
docker-compose up
```
Or, run all services in the background
```sh
docker-compose up -d
```

### Up and running
Site URL: `localhost:{REACT_LOCAL_PORT}`
Swagger API: `{Site URL}/api/v1/docs/`

### Shutting down
```sh
docker-compose down
```
Stop and remove all containers, networks, and images 
```sh
docker-compose down --rmi all
```

