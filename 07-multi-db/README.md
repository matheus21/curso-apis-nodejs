docker run \
    --name postgres \
    -e POSTGRES_USER=matheus \
    -e POSTGRES_PASSWORD=12345 \
    -e POSTGRES_DB=heroes \
    -p 5434:5432 \
    -d \
    postgres

docker ps
docker exec -it postgres /bin/bash

docker run \
    --name adminer \
    -p 8585:8080 \
    --link postgres:postgres \
    -d \
    adminer

docker run \
    --name mongodb \
    -p 27018:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=12345 \
    -d \
    mongo:4

docker run \
    --name mongoclient \
    -p 3020:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -it mongodb \
    mongo --host localhost -u admin -p 12345 --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'matheus', pwd: '12345', roles: [{role: 'readWrite', db:'herois'}]})"