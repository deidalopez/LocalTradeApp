const express = require('express'); 
require('dotenv').config();
const cors = require ('cors');
const app = express(); 
const routes = require('./routes')
const PORT = process.env.PORT || 3001; 

const corsConfig = {
  origin:'http://localhost:19003', 
  credentials:true,
}

app.use(cors(corsConfig));
app.use(express.json()); 

app.use(routes);

app.get('*', (req, res) => {
  res.status(404).send('Sorry, not found 😞');
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
})