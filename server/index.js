const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const db = require('./database');
const routes = require('./routes')

const PORT = process.env.PORT || 3001;

const corsConfig = {
  origin: 'http://localhost:19006',
  credentials: true,
}

db.authenticate()
  .then(() => console.log('we are connected on postgres://postgres:password@localhost:5432/localTradeUsers'))
  .catch(err => console.log(err))


app.use(cors(corsConfig));
app.use(express.json());

app.use(routes);


app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
})