require('dotenv').config()
const express = require('express');
const cors = require('cors')

const fetchVoterData = require('./fetchVoterData')

const port = process.env.PORT || 3001;

const app = express();

// app.use('/', express.static(__dirname + '/../client/dist'));
app.use(cors());

app.use('/fetchVoterData', fetchVoterData);

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});