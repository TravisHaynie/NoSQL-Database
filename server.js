const express = require('express');
const db = require('./config/connection');  // This is your connection file
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Use the connection object to listen for MongoDB events
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
