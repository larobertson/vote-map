const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');


const {grabAllAddresses} = require('./states/texas');


const router = express.Router()
router.use(bodyParser.json());


router.post('/', async (req, res) => {
  const {idElection, vuid} = req.body;
  const electionResp = await axios.get(`https://teamrv-mvp.sos.texas.gov/MVP/getPollPlaces.do?idElection=${idElection}&idVoter=${vuid}`);
  const pollingAddresses = await grabAllAddresses(electionResp.data);

  res.send(pollingAddresses);
})

module.exports = router