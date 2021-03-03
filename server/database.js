const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.DB_NAME || 'localtradeDB';

mongoose.connect(
  `mongodb://localhost:${DB_PORT}/${DB_NAME}`,
  {useNewUrlParser:true, useUnifiedTopology:true},

  (error) => {
    if (error) {
      console.log(`error: ${error}`);
    } else {
      console.log( `Database connected on mongodb://localhost:${DB_PORT}/${DB_NAME}`)
    }
  }
)

module.exports = mongoose;