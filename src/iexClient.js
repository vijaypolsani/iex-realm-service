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

const populateRealmWithTickerInfo = async (project) => {
  console.log(`Got env: `, process.env.IEX_TOKEN)
  if (project.name) {
    const data = await getMarketData(constants.NEWS.replace('{symbol}', project.name))
    console.log('Input param from IEX:', project)
    console.log('Data from IEX:', data)
    realmIntegration.realmProjectItem(data, project)
  }
}

module.exports.getMarketData = getMarketData
module.exports.populateRealmWithTickerInfo = populateRealmWithTickerInfo
