require('dotenv').config()
const express = require('express');
const cors = require('cors')

const fetchVoterData = require('./fetchVoterData');
const fetchPollingLocations = require('./fetchPollingLocations')


const port = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.use('/fetchVoterData', fetchVoterData);
app.use('/fetchPollingLocations', fetchPollingLocations);


app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});