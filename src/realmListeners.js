const Realm = require('realm')
const constants = require('../constants')

const NOTIFIER_PATH = '^/([^/]+)/'
const SERVER_URL = '//capitalmarkets.us1.cloud.realm.io'

const handleChange = async function (changeEvent) {
  const realm = changeEvent.realm
  console.log('**** handleChange: path', changeEvent.path)
  console.log('**** handleChange: realm objects', changeEvent.realm.objects('Stock'))
  console.log('**** handleChange: oldRealm', changeEvent.realm)
  console.log('**** handleChange: changes', changeEvent.changes)
  const stockIndexes = changeEvent.changes.__ResultSets.modifications
  console.log('**** changeEvent: stockIndexes ', stockIndexes)
}

const addListenersToStock = async function () {
  const adminUser = await Realm.Sync.User
    .login(process.env.SERVER_URL, Realm.Sync.Credentials
      .usernamePassword(process.env.USERNAME, process.env.PASSWORD))
  console.log('Got adminuser: ', adminUser.identity)
  try {
    Realm.Sync.addListener(`realms:${SERVER_URL}`, adminUser, NOTIFIER_PATH, 'change', handleChange)
    /**
    let config = adminUser.createConfiguration()
    config.path = 'Stock'
    config.schema = [constants.Stock, constants.Portfolio]
    const realm = await Realm.open(config)
    console.log('realm: ', realm)
    realm.addListener('change', (event) => console.log(event))
    */
  } catch (e) {
    console.error('********In catch for listener: ', e)
  }
}
module.exports.addListenersToStock = addListenersToStock
