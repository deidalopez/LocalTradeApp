const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const sequelize = require('./database');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.ORIGIN
const corsConfig = {
  origin: CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());

app.use(routes);

sequelize.authenticate()
  .then(() => console.log('we are connected on postgres://postgres:password@localhost:5432/localTradeUsers'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});