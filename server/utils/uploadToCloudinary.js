const cloudinary = require('cloudinary').v2;
const {
  cloudinary: { cloudName, apiKey, apiSecret },
} = require('../config');

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const uploadToCloudinary = async (file) => {
  const { createReadStream } = await file;
  const fileStream = createReadStream();

  return new Promise((resolve, reject) => {
    const cloudStream = cloudinary.uploader.upload_stream(
      {
        folder: 'ecommerce',
      },
      (err, fileUploaded) => {
        if (err) {
          reject(err);
        }

        // All good :smile:
        resolve(fileUploaded);
      },
    );
    fileStream.pipe(cloudStream);
  });
};

module.exports = uploadToCloudinary;
