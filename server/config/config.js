var config = {
    dbname: '',
    host: '',
    secret: ''
}

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'Production') {
    config.dbname = process.env.prod_dbName;
    config.host = process.env.prod_dbHost;
    config.secret = process.env.prod_secret;
} else {
    config.dbname = process.env.dev_dbName;
    config.host = process.env.dev_dbHost;
    config.secret = process.env.dev_secret;
}

module.exports = config;