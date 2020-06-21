const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');

// custom utils
const {formData} = require('./utils/formData.js');


const {grabUpcomingElections} = require('./states/texas');


const router = express.Router()
router.use(bodyParser.json());


router.post('/', async (req, res, next) => {
  try {
    const value = formData(req.body);
    const voterDetailsResp = await axios.post('https://teamrv-mvp.sos.texas.gov/MVP/voterDetails.do', value);
    const respData = voterDetailsResp.data;
    const elections = await grabUpcomingElections(respData);
    res.send(elections);
  } catch (e) {
    next(e)
  }
})

module.exports = router