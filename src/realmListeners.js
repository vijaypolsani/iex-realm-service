const Realm = require('realm')
const constants = require('../constants')

const handlePortfolioChange = async function (changeEvent) {
  const stocks = changeEvent.realm.objects('Stock')
  console.log('Portfolio change path: ', changeEvent.path)
  const stockIndexes = changeEvent.changes.Stock.modifications
  console.log('List of modification stockIndexes: ', stockIndexes)
  for (let index of stockIndexes) {
    console.log('Changed Stock: ', stocks[index])
  }
}

const handleNewsChange = async function (changeEvent) {
  const news = changeEvent.realm.objects('News')
  const newsIndexes = changeEvent.changes.News.modifications
  console.log('News change path: ', changeEvent.path)
  console.log('List of modification newsIndexes: ', newsIndexes)
  for (let index of newsIndexes) {
    console.log('Changed Stock: ', news[index])
  }
}

const addListeners = async function () {
  // Realm.Sync.setLogLevel('debug')
  const adminUser = await Realm.Sync.User
    .login(process.env.SERVER_URL, Realm.Sync.Credentials
      .usernamePassword(process.env.USERNAME, process.env.PASSWORD))
  try {
    Realm.Sync.addListener(`realms://${process.env.SERVER_ADDRESS}`, adminUser, constants.PORTFOLIO_NOTIFIER_PATH, 'change', handlePortfolioChange)
    Realm.Sync.addListener(`realms://${process.env.SERVER_ADDRESS}`, adminUser, constants.MARKETNEWS_NOTIFIER_PATH, 'change', handleNewsChange)
    console.log('Added the listerners for changes!')
  } catch (e) {
    console.error('Error in registering listeners: ', e)
  }
}
module.exports.addListeners = addListeners
