# esn-ogp-dockerfile

Dockerfile for custom ESN image with linagora.esn.article and linagora.esn.vote modules used in OGP

## Build

```
docker build -t linagora/esn-ogp .
```

## Run

```
docker run -d -p 8080:8080 --env ESN_ADMIN_PASSWORD='secret' --env ESN_ADMIN_EMAIL='chamerling@linagora.com' --env ESN_DOMAIN='linagora' --env ESN_COMPANY='linagora' --env PROVISION=true --env MONGO_HOST='192.168.1.27' --env REDIS_HOST='192.168.1.27' --env MONGO_PORT='27017' --env MONGO_DBNAME='esn' --env ELASTICSEARCH_HOST='192.168.1.27' --env  ELASTICSEARCH_PORT='9200' linagora/esn-ogp
```

Replace IP addresses and ports with the ones matching your infrastructure.
