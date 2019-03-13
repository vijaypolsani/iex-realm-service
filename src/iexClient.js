const axios = require('axios')
const realmIntegration = require('./realmIntegration')
const _ = require('lodash')

const getMarketData = async (url) => {
  try {
    const responseData = await axios.get(`${url}token=${process.env.IEX_TOKEN}`)
    return responseData.data
  } catch (error) {
    console.error(error)
  }
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const populateRealm = async () => {
  console.log(`Got env: `, process.env.IEX_TOKEN)
  // console.log(`Got TOPS_SAMPLE: `, process.env.TOPS_SAMPLE)
  // console.log(`Got tops sample data: `, await getMarketData(process.env.TOPS_SAMPLE))
  const portfolioSymbols = process.env.PORTFOLIO.split(',')
  for (let i = 0; i < portfolioSymbols.length; i++) {
    await sleep(1000)
    realmIntegration.realmNews(await getMarketData(process.env.NEWS.replace('{symbol}', portfolioSymbols[i])))
  }
}

module.exports.getMarketData = getMarketData
module.exports.populateRealm = populateRealm
