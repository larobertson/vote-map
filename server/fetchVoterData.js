const express = require('express')
const bodyParser = require('body-parser');
const axios = require('axios');

// custom utils
const {formData} = require('./utils/formData.js');
const {randomUserAgent} = require('./utils/randomUserAgent');


const {grabUpcomingElections} = require('./states/texas');


const router = express.Router()
router.use(bodyParser.json());


router.post('/', async (req, res, next) => {
  try {
    const {
      selType,
      idVoter,
      vuidDob,
      idTdl,
      tdlDob,
      firstName,
      lastName,
      nmSuffix,
      county,
      dob,
      adZip5,
    } = req.body;

    const orderedValues = {
      selType,
      firstName,
      lastName,
      nmSuffix,
      county,
      dob,
      adZip5,
      idVoter,
      vuidDob,
      idTdl,
      tdlDob,
      }
    const value = formData(orderedValues);
    const headers = {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Content-Type': 'application/x-www-form-urlencoded',
      'user-agent': randomUserAgent()
    }
    const voterDetailsResp = await axios({method: 'POST', url:'https://teamrv-mvp.sos.texas.gov/MVP/voterDetails.do', data: {value}, headers});
    const respData = voterDetailsResp.data;
    const elections = await grabUpcomingElections(respData);
    res.send(elections);
  } catch (e) {
    next(e)
  }
})

module.exports = router