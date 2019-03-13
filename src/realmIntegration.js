const Realm = require('realm')
const constants = require('../constants')

async function realmStockPortfolio (stockList) {
  Realm.Sync.User.login(process.env.SERVER_URL, Realm.Sync.Credentials.usernamePassword(process.env.USERNAME, process.env.PASSWORD)).then((user) => {
    let config = user.createConfiguration()
    config.path = 'portfolio'
    config.schema = [constants.Stock, constants.Portfolio]
    Realm.open(config).then((realm) => {
      realm.write(() => {
        let portfolio = realm.create('Portfolio', {
          projectId: 'IEX_Portfolio',
          owner: user.identity,
          name: 'Portfolio',
          timestamp: new Date(),
          stocks: []
        }, true)
        for (let i = 0; i < stockList.length; i++) {
          let newStock = realm.create('Stock', {
            symbol: stockList[i].symbol,
            sector: stockList[i].sector,
            securityType: stockList[i].securityType,
            bidPrice: stockList[i].bidPrice,
            bidSize: stockList[i].bidSize,
            askPrice: stockList[i].askPrice,
            askSize: stockList[i].askSize,
            lastUpdated: new Date(stockList[i].lastUpdated),
            lastSalePrice: stockList[i].lastSalePrice,
            lastSaleSize: stockList[i].lastSaleSize,
            lastSaleTime: new Date(stockList[i].lastSaleTime),
            volume: stockList[i].volume,
            marketPercent: stockList[i].marketPercent,
            seq: stockList[i].seq
          }, true)
          portfolio.stocks.push(newStock)
        }
      })
      realm.close()
    })
  })
}

async function realmStock (stockMsg) {
  Realm.Sync.User.login(process.env.SERVER_URL,
    Realm.Sync.Credentials.usernamePassword(process.env.USERNAME, process.env.PASSWORD)).then((user) => {
    let config = user.createConfiguration()
    config.path = constants.Stock.name
    config.schema = [constants.Stock, constants.Portfolio]
    Realm.open(config).then((realm) => {
      realm.write(() => {
        let portfolio = realm.create('Portfolio', {
          projectId: 'IEX_Portfolio',
          owner: user.identity,
          name: 'Portfolio',
          timestamp: new Date(),
          stocks: []
        }, true)
        if (stockMsg) {
          const stock = JSON.parse(stockMsg)
          console.log('Incoming data: ', stock.symbol)
          let newStock = realm.create('Stock', {
            symbol: stock.symbol,
            sector: stock.sector,
            securityType: stock.securityType,
            bidPrice: stock.bidPrice,
            bidSize: stock.bidSize,
            askPrice: stock.askPrice,
            askSize: stock.askSize,
            lastUpdated: new Date(stock.lastUpdated),
            lastSalePrice: stock.lastSalePrice,
            lastSaleSize: stock.lastSaleSize,
            lastSaleTime: new Date(stock.lastSaleTime),
            volume: stock.volume,
            marketPercent: stock.marketPercent,
            seq: stock.seq
          }, true)
          portfolio.stocks.push(newStock)
        }
      })
    })
  })
}

async function realmNews (newsList) {
  Realm.Sync.User.login(process.env.SERVER_URL, Realm.Sync.Credentials.usernamePassword(process.env.USERNAME, process.env.PASSWORD)).then((user) => {
    let config = user.createConfiguration()
    config.path = 'news'
    config.schema = [constants.RealTimeNews, constants.MarketNews]
    Realm.open(config).then((realm) => {
      realm.write(() => {
        let realTimeNews = realm.create('MarketNews', {
          projectId: 'IEX_News',
          owner: user.identity,
          name: 'MarketNews',
          timestamp: new Date(),
          news: []
        }, true)
        if (newsList) {
          for (let i = 0; i < newsList.length; i++) {
            let newArticle = realm.create('RealTimeNews', {
              related: newsList[i].related,
              headline: newsList[i].headline,
              datetime: new Date(newsList[i].datetime),
              source: newsList[i].source,
              url: newsList[i].url,
              summary: newsList[i].summary,
              image: newsList[i].image,
              lang: newsList[i].lang,
              hasPaywall: newsList[i].hasPaywall
            }, true)
            realTimeNews.news.push(newArticle)
          }
        }
      })
      // realm.close()
    })
  })
}

async function realmPortfolioListener () {
  Realm.Sync.User.login(process.env.SERVER_URL, Realm.Sync.Credentials.usernamePassword(process.env.USERNAME, process.env.PASSWORD)).then(user => {
    if (Realm.isClosed) {
      Realm.open({
        schema: [constants.Stock],
        sync: {
          user: user,
          url: process.env.SERVER_URL,
          error: err => console.log(err)
        }
      }).then(realm => {
        this.setState({ isReady: true, currentStock: realm.objects('RealTimeStock')[0], realm: realm })
        // register the listener
        realm.addListener('change', (realm) => {
          this.setState(previousState => {
            if (previousState.currentStock === undefined) {
              return { isReady: true, currentStock: realm.objects('RealTimeStock') }
            }
            return previousState
          })
        })
        realm.close()
      })
    }
  }).catch(error => {
    // an auth error has occurred
    console.log('Auth error occured. ', error)
  })
}

module.exports.realmStockPortfolio = realmStockPortfolio
module.exports.realmStock = realmStock
module.exports.realmNews = realmNews
module.exports.realmPortfolioListener = realmPortfolioListener
