const mongoose = require('mongoose');
const { logger } = require('./config/logger');

exports.connect = (dburl, options = {}) => {
  mongoose.connect(dburl, options);

  mongoose.connection.on('connected', () => {
    logger.info('Database connected');
  });

  mongoose.connection.on('close', () => {
    logger.info('Database disconnected');
  });

  mongoose.connection.on('error', (error) => {
    logger.error(`Database error: ${error}`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Database disconnected because app termination');
      process.exit(0);
    });
  });
};

exports.disconnect = () => {
  mongoose.connection.close(() => {
    logger.info('Database disconnected successful');
  });
};
