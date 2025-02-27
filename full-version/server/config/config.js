const config = {
  development: {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: '24h'
  },
  production: {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: '12h'
  }
};

module.exports = config[process.env.NODE_ENV || 'development']; 