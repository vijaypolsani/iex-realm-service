const axios = require('axios')
const realmIntegration = require('./realmIntegration')
const constants = require('../constants')

const getMarketData = async (url) => {
  try {
    const responseData = await axios.get(`${url}token=${process.env.IEX_TOKEN}`)
    return responseData.data
  } catch (error) {
    console.error('Error in the rest call to IEX: Status ', error.response.status, ' Response Message: ', error.response.data)
  }
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const populateRealm = async () => {
  console.log(`Got env: `, process.env.IEX_TOKEN)
  // console.log(`Got TOPS_SAMPLE: `, constants.TOPS_SAMPLE)
  // console.log(`Got tops sample data: `, await getMarketData(constants.TOPS_SAMPLE))
  const portfolioSymbols = constants.PORTFOLIO.split(',')
  for (let i = 0; i < portfolioSymbols.length; i++) {
    await sleep(1000)
    console.log('Calling api: ', (constants.NEWS.replace('{symbol}', portfolioSymbols[i])))
    realmIntegration.realmNews(await getMarketData(constants.NEWS.replace('{symbol}', portfolioSymbols[i])))
  }
}

module.exports.getMarketData = getMarketData
module.exports.populateRealm = populateRealm
