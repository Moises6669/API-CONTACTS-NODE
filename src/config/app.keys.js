let port;
if (process.env.NODE_ENV === 'development')port = 8080;
if (process.env.NODE_ENV === 'production')port = process.env.PORT;

module.exports = port;