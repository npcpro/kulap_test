var dotenv     = require('dotenv').config();
var mongoose   = require('mongoose')
const config = {host:process.env.MONGO_HOST,
								port:process.env.MONGO_PORT,
								user:process.env.MONGO_USER,
								pass:process.env.MONGO_PASS,
								name:process.env.MONGO_NAME}
            url = `mongodb://${config.host}:${config.port}/kulap_test`;

module.exports = {
  start: () => {
          mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true})
          .then(() => {
             console.log("Connected to Mongoose DB")
          })
          .catch((e) => {
             console.log(e);
             console.log("Connection failed Mongoose DB")
          })
   },
}
