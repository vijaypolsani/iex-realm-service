const Realm = require('realm')
const constants = require('../constants')

async function realmEquities (stockList) {
  Realm.Sync.User.login(process.env.SERVER_URL, Realm.Sync.Credentials.usernamePassword(process.env.USERNAME, process.env.PASSWORD)).then((user) => {
    const config = {
      schema: [constants.Stock, constants.Equities],
      path: 'equities',
      sync: {
        user: user,
        url: `realms://${process.env.SERVER_ADDRESS}/equities`
      }
    }
    Realm.open(config).then((realm) => {
      realm.write(() => {
        let equities = realm.create('Equities', {
          projectId: 'IEX_Equities',
          owner: process.env.USERNAME,
          name: 'Equities',
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
          equities.stocks.push(newStock)
        }
      })
      realm.close()
    })
  })
}

async function realmPortfolio (stockMsg) {
  Realm.Sync.User.login(process.env.SERVER_URL,
    Realm.Sync.Credentials.usernamePassword(process.env.USERNAME, process.env.PASSWORD)).then((user) => {
    const config = {
      schema: [constants.Stock, constants.Portfolio],
      path: 'portfolio',
      sync: {
        user: user,
        url: `realms://${process.env.SERVER_ADDRESS}/portfolio`
      }
    }
    Realm.open(config).then((realm) => {
      realm.write(() => {
        let portfolio = realm.create('Portfolio', {
          projectId: 'IEX_Portfolio',
          owner: process.env.USERNAME,
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
      // realm.close() // I cannot close as this is steaming? How to handle connection pooling in Realm?
    })
  })
}

async function realmNews (newsList) {
  Realm.Sync.User.login(process.env.SERVER_URL, Realm.Sync.Credentials.usernamePassword(process.env.USERNAME, process.env.PASSWORD)).then((user) => {
    const config = {
      schema: [constants.News, constants.MarketNews],
      path: 'marketnews',
      sync: {
        user: user,
        url: `realms://${process.env.SERVER_ADDRESS}/marketnews`
      }
    }
    Realm.open(config).then((realm) => {
      realm.write(() => {
        let marketNews = realm.create('MarketNews', {
          projectId: 'IEX_News',
          owner: process.env.USERNAME,
          name: 'MarketNews',
          timestamp: new Date(),
          news: []
        }, true)
        if (newsList) {
          for (let i = 0; i < newsList.length; i++) {
            let newArticle = realm.create('News', {
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
            marketNews.news.push(newArticle)
          }
        }
      })
      realm.close()
    }).catch((err) => {
      console.error('Error in Realm saving data for News. ', err)
    })
  })
}

module.exports.realmEquities = realmEquities
module.exports.realmPortfolio = realmPortfolio
module.exports.realmNews = realmNews
