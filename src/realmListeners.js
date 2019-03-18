const Realm = require('realm')
const iexClient = require('./iexClient')

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const handlePortfolioChange = async function (changeEvent) {
  const stocks = changeEvent.realm.objects('Project')
  console.log('Portfolio change path: ', changeEvent.path)
  if (changeEvent.changes.Project) {
    const stockInsertionIndexes = changeEvent.changes.Project.insertions
    console.log('List of insertion stockIndexes: ', stockInsertionIndexes)
    for (let index of stockInsertionIndexes) {
      console.log('Inserted Stock: ', stocks[index])
      const inputData = {}
      inputData.name = stocks[index].name
      inputData.projectId = stocks[index].projectId
      inputData.owner = stocks[index].owner
      inputData.name = stocks[index].name
      iexClient.populateRealmWithTickerInfo(inputData)
      await sleep(1000)
    }
  }
}

const addListeners = async function () {
  // Realm.Sync.setLogLevel('debug')
  const adminUser = await Realm.Sync.User
    .login(process.env.SERVER_URL, Realm.Sync.Credentials
      .nickname(process.env.USERNAME, true))
  try {
    Realm.Sync.addListener(`realms://${process.env.SERVER_ADDRESS}`, adminUser, '/MarketNews/', 'change', handlePortfolioChange)
    console.log('Added the listerners for changes!')
  } catch (e) {
    console.error('Error in registering listeners: ', e)
  }
}
module.exports.addListeners = addListeners
