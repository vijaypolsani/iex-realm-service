var socket = require('socket.io-client')('https://ws-api.iextrading.com/1.0/tops', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity
})

async function realTimeMarketData (feed, callback) {
  console.log('subscribed feed: ', feed)
  socket.on('message', msg => {
    callback(msg)
  })
  socket.on('connect', () => {
    console.log('Connected to IEX server!')
    socket.emit('subscribe', feed)
    // Unsubscribe from topics (i.e. aig+)
    // socket.emit('unsubscribe', constants.UNSUB_STOCKS)
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
