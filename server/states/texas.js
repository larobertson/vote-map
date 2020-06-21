const cheerio = require('cheerio');
const _ = require('lodash');


const grabUpcomingElections = async (response) => {
  const $ = cheerio.load(response);
  // const dom = $.html();
  // console.log('what is dom???', dom);
  // .bodycontent2 table table a
  const tables = $('.bodycontent2 table table a');
  console.log('tables', tables.length);
  const elections = _.map(tables, (el) => {
    const $el = $(el);
    const electionNumRaw = $el.attr('href');
    const electionNum = electionNumRaw.match(/\('(\d+)/)[1];
    return {election: $(el).text(), number:electionNum};
  })
  return elections;
}

const grabAllAddresses = async (response) => {
  const $ = cheerio.load(response);
  // grab all the addresses
  // throw them into an array and return that to the client
}

module.exports = {grabUpcomingElections}