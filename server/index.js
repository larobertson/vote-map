require('dotenv').config()
const path = require('path');
const express = require('express');
const cors = require('cors')

const fetchVoterData = require('./fetchVoterData');
const fetchPollingLocations = require('./fetchPollingLocations')


const port = process.env.PORT || 4022;

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.dirname(__dirname), '/build')));
}

app.use('/fetchVoterData', fetchVoterData);
app.use('/fetchPollingLocations', fetchPollingLocations);


app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});