const Stock = {
  name: 'Stock',
  primaryKey: 'symbol',
  properties: {
    symbol: 'string',
    sector: 'string',
    securityType: 'string',
    bidPrice: 'float',
    bidSize: 'int',
    askPrice: 'float',
    askSize: 'int',
    lastUpdated: 'date',
    lastSalePrice: 'float',
    lastSaleSize: 'int',
    lastSaleTime: 'date',
    volume: 'int',
    marketPercent: 'float',
    seq: 'int'
  }
}

const Portfolio = {
  name: 'Portfolio',
  primaryKey: 'projectId',
  properties: {
    projectId: 'string',
    owner: 'string',
    name: 'string',
    timestamp: 'date',
    stocks: 'Stock[]'
  }
}

const RealTimeNews = {
  name: 'RealTimeNews',
  primaryKey: 'url',
  properties: {
    datetime: 'date',
    headline: 'string',
    source: 'string',
    url: 'string',
    summary: 'string',
    related: 'string',
    image: 'string',
    lang: 'string',
    hasPaywall: 'bool'
  }
}

const MarketNews = {
  name: 'MarketNews',
  primaryKey: 'projectId',
  properties: {
    projectId: 'string',
    owner: 'string',
    name: 'string',
    timestamp: 'date',
    news: 'RealTimeNews[]'
  }
}

module.exports = {
  username: 'equityanalytics',
  password: 'equityanalytics',
  serverUrl: 'https://capitalmarkets.us1.cloud.realm.io',
  Stock: Stock,
  Portfolio: Portfolio,
  RealTimeNews: RealTimeNews,
  MarketNews: MarketNews
}
