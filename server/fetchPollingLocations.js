const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');

const {randomUserAgent} = require('./utils/randomUserAgent');
const {grabAllAddresses} = require('./states/texas');


const router = express.Router()
router.use(bodyParser.json());


router.post('/', async (req, res) => {
  const {idElection, vuid} = req.body;
  const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded',
    'user-agent': randomUserAgent()
  }
  const electionResp = await axios({method: 'GET', url:`https://teamrv-mvp.sos.texas.gov/MVP/getPollPlaces.do?idElection=${idElection}&idVoter=${vuid}`, headers});
  // const electionResp = await axios.get(`https://teamrv-mvp.sos.texas.gov/MVP/getPollPlaces.do?idElection=${idElection}&idVoter=${vuid}`);
  const pollingAddresses = await grabAllAddresses(electionResp.data);

  res.send(pollingAddresses);
})

module.exports = router