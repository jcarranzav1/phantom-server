require('dotenv').config();

const config = {
  port: process.env.PORT || 4000,
  database: {
    protocol: process.env.DATABASE_PROTOCOL,
    url: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  cors: {
    origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES,
  },
  mail: {
    apiKey: process.env.EMAIL_APIKEY,
  },
  stripe: {
    secret: process.env.STRIPE_KEY,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};

module.exports = config;
