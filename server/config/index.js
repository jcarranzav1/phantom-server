require('dotenv').config();

const config = {
  port: process.env.PORT || 4000,

  mongodb_uri:
    process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URI : process.env.MONGODB_URI,

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
