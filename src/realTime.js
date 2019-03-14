var socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity
})

async function realTimeMarketData (feed, callback, realm) {
  console.log('subscribed feed: ', feed)
  // Listen to the channel's messages
  socket.on('message', msg => {
    // console.log(msg)
    callback(msg)
  })
  // Connect to the channel
  socket.on('connect', () => {
    console.log('Connected to IEX server!')
    // Subscribe to topics (i.e. appl,fb,aig+)
    socket.emit('subscribe', feed)
    // Unsubscribe from topics (i.e. aig+)
    // socket.emit('unsubscribe', process.env.UNSUB_STOCKS)
  })
  // Disconnect from the channel
  socket.on('disconnect', () => {
    if (socket.io.connecting.indexOf(socket) === -1) {
      setTimeout(socket.connect(), 5000) // Try reconnecting after 5 seconds
      console.log('Socket Disconnected & trying to reconnect!')
    }
  })
}

module.exports.realTimeMarketData = realTimeMarketData
