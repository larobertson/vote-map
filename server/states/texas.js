const cheerio = require('cheerio');
const _ = require('lodash');


const grabUpcomingElections = async (response) => {
  const $ = cheerio.load(response);
  const vuidRaw = $('table.boxshadow td span:contains(VUID)').text();
  const addressRaw = $('#fullNameSpan').parent().text();
  const vuid = vuidRaw.match(/(\d+)/)[1];
  const voterAddress = addressRaw.match(/Address: ([\w+\s+]+)[-,\n]/)[1];
  const tables = $('.bodycontent2 table table a');
  const elections = _.map(tables, (el) => {
    const $el = $(el);
    const electionNumRaw = $el.attr('href');
    const electionNum = electionNumRaw.match(/\('(\d+)/)[1];
    return {election: $el.text(), number: electionNum};
  });
  return {elections, vuid, voterAddress};
}

const grabAllAddresses = async (response) => {
  const $ = cheerio.load(response);
  const allLocationRows = $('table.boxshadow table tr');

  
  const earlyVotingIndex = _.findIndex(allLocationRows, (el) => {
    const $el = $(el);
    return $el.text().trim() === 'Early Voting Poll Places';
  })
  const electionDayIndex = _.findIndex(allLocationRows, (el) => {
    const $el = $(el);
    return $el.text().trim() === 'Election Day Poll Places';
  })
  
  const electionDayRows = allLocationRows.slice(electionDayIndex + 2, earlyVotingIndex);
  const earlyVotingRows = allLocationRows.slice(earlyVotingIndex + 1);
  
  const electionDayLocations = _.map(electionDayRows, (el) => {
    const cols = $(el).children();
    const row = _.reduce(cols, (obj, td, key) => {
      const $td = $(td);
      if (key === 0) {
        obj['name'] = $td.text();
      } else if (key === 1) {
        obj['address'] = $td.text();
      } else if (key === 2) {
        obj['timings'] = $td.text();
      }
      return obj;
    }, {})
    return row;
  });

  const earlyVotingLocations = _.map(earlyVotingRows, (el) => {
    const cols = $(el).children();
    const row = _.reduce(cols, (obj, td, key) => {
      const $td = $(td);
      if (key === 0) {
        obj['name'] = $td.text();
      } else if (key === 1) {
        obj['address'] = $td.text();
      } else if (key === 2) {
        obj['timings'] = $td.text();
      }
      return obj;
    }, {})
    return row;
  })

  return {earlyVotingLocations, electionDayLocations};
}

module.exports = {grabUpcomingElections, grabAllAddresses}