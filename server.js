// import { IEXClient } from 'iex-api'
const cron = require('node-cron')
const Koa = require('koa')
require('dotenv').config()

const realmListeners = require('./src/realmListeners')
const realmIntegration = require('./src/realmIntegration')
const realTime = require('./src/realTime')
const iexClient = require('./src/iexClient')
const constants = require('./constants')

const app = new Koa()
app.use(ctx => {
  ctx.body = 'Market Watch using Realm'
})
app.listen(3000)

realmListeners.addListeners()
// schedule tasks to be run on the server
cron.schedule('*/15 * * * *', function () {
  console.log('running a task every 15 minutes')
  iexClient.populateRealm()
})
realTime.realTimeMarketData(constants.PORTFOLIO, realmIntegration.realmPortfolio)
