require("dotenv").config()
const conf = {
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
};

module.exports = conf;