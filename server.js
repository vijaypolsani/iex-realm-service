// import { IEXClient } from 'iex-api'
const realmIntegration = require('./src/realmIntegration')
const realTime = require('./src/realTime')
const iexClient = require('./src/iexClient')
const cron = require('node-cron')
require('dotenv').config()

const Koa = require('koa')
const app = new Koa()
app.use(ctx => {
  ctx.body = 'Market Watch using Realm'
})
app.listen(3000)

// schedule tasks to be run on the server
cron.schedule('*/5 * * * *', function () {
  console.log('running a task every minutes')
  iexClient.populateRealm()
})

realTime.realTimeMarketData(process.env.PORTFOLIO, realmIntegration.realmStock)
