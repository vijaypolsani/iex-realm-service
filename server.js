const Koa = require('koa')
require('dotenv').config()

const realmListeners = require('./src/realmListeners')

const app = new Koa()
app.use(ctx => {
  ctx.body = 'Market Watch using Realm'
})
app.listen(3000)

realmListeners.addListeners()
