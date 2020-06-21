const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');

// custom utils
const {formData} = require('./utils/formData.js');


const {grabUpcomingElections} = require('./states/texas');


const router = express.Router()
router.use(bodyParser.json());


router.post('/', async (req, res) => {
  const value = formData(req.body);
  console.log(value);
  const voterDetailsResp = await axios.post('https://teamrv-mvp.sos.texas.gov/MVP/voterDetails.do', value);
  const respData = voterDetailsResp.data;
  const elections = await grabUpcomingElections(respData);
  res.send(elections);
})

module.exports = router