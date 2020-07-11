const remote = require('./redis');
const config = require('../config');

module.exports = remote(config.cacheService.host, config.cacheService.port);