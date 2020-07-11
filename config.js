module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 3000
  },
  post: {
    port: process.env.POST_PORT || 3002
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notasecret!'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || 'Ln4iMlbObf',
    password: process.env.MYSQL_PASS || '9fM1MC3imd',
    database: process.env.MYSQL_DB || 'Ln4iMlbObf',
    port: process.env.MYSQL_PORT || 3306,
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || 'localhost',
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  cacheService: {
    host: process.env.CACHE_SRV_HOST || 'localhost',
    port: process.env.CACHE_SRV_PORT || 3003,
  },
  redis: {
    host: process.env.REDIS_HOST || 'redis-19878.c93.us-east-1-3.ec2.cloud.redislabs.com',
    port: process.env.REDIS_PORT || 19878,
    password: process.env.REDIS_PASS || 'C1dEcVng7L8qVwsrLBhwkuOt9zk41yuU',
  }
}