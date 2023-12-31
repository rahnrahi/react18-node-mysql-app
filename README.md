# Dockerized RESTful API

The `/client` and `/server` project components can be installed and ran independently, but the purpose of this repository is to demonstrate how to build and deploy a full-stack wallet application.

### Project Components

* `/client`
	* ReactJS frontend
* `/server`
	* Node  REST API
	* MySQL database (sequalize ORM)
	* API documented in Swagger http://localhost:5001/swagger

### Project Setup

**1.** In the `/client` folder, configure .env file and map Docker ports to db connection.
```sh
cp .env-sample .env
In env file put below ENV VARS
REACT_APP_API_URL=http://localhost:5001/api

``` 

**2.** In the `/server` folder, configure .env file and map Docker ports to db connection.
```sh
cp .env-sample .env
In env file put below ENV VARS
process.env.DB_HOST 
process.env.DB_USER
process.env.DB_PASS 
process.env.DB_NAME
``` 

**4.** Build Adminer, and MySQL containers
```sh
docker-compose up
```
Or, run all services in the background
```sh
docker-compose up -d
```

### Up and running
Site URL: `http://localhost:3000/`

Swagger API: `http://localhost:5001/swagger`

API root: `http://localhost:5001/api`

You can view all the end points here : `http://jsonblob.com/1150494523364597760`



### Shutting down
```sh
docker-compose down
```
Stop and remove all containers, networks, and images 
```sh
docker-compose down --rmi all
```

