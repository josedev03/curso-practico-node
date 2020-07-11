module.exports = {
  api: {
    port: process.env.API_PORT || 3000
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'notasecret!'
  },
  mysql: {
    host: process.env.MYSQL_HOST || 'remotemysql.com',
    user: process.env.MYSQL_USER || 'Ln4iMlbObf',
    password: process.env.MYSQL_PASS || '9fM1MC3imd',
    database: process.env.MYSQL_DB || 'Ln4iMlbObf',
    port: process.env.MYSQL_PORT || '3306',
  },
  mysqlService: {
    port: process.env.MYSQL_SRV_PORT || '3001',
  }
}