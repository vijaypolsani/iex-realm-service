const PORTFOLIO = 'CYBR,ILMN,BIIB'
const UNSUBSCRIBE_PORTFOLIO = 'AIG+'
const TOPS = 'https://cloud.iexapis.com/beta/tops?'
const TOPS_LAST = 'https://cloud.iexapis.com/beta/tops/last?'
const TOPS_SAMPLE = 'https://cloud.iexapis.com/beta/tops?symbols=GOOGL,FB,NOW%2b&'
const STATS = 'https://cloud.iexapis.com/beta/stats?'
const STATS_RECENT = 'https://cloud.iexapis.com/beta/stats/recent?'
const NEWS = 'https://cloud.iexapis.com/beta/stock/{symbol}/news?'

const PORTFOLIO_NOTIFIER_PATH = '/portfolio'
const STOCK_NOTIFIER_PATH = '/stock'
const EQUITIES_NOTIFIER_PATH = '/equities'
const MARKETNEWS_NOTIFIER_PATH = '/MarketNews'
const NEWS_NOTIFIER_PATH = '/News'

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
const Equities = {
  name: 'Equities',
  primaryKey: 'projectId',
  properties: {
    projectId: 'string',
    owner: 'string',
    name: 'string',
    timestamp: 'date',
    stocks: 'Stock[]'
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

const News = {
  name: 'News',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    url: 'string?',
    datetime: 'date?',
    headline: 'string?',
    source: 'string?',
    summary: 'string?',
    related: 'string?',
    image: 'string?',
    lang: 'string?',
    hasPaywall: 'bool?',
    published: 'bool?'
  }
}

const Project = {
  name: 'Project',
  primaryKey: 'projectId',
  properties: {
    projectId: 'string',
    owner: 'string',
    name: 'string',
    timestamp: 'date',
    items: 'Item[]'
  }
}

const Item = {
  name: 'Item',
  primaryKey: 'itemId',
  properties: {
    itemId: 'string',
    body: 'string',
    isDone: 'bool',
    timestamp: 'date'
  }
}

module.exports = {
  username: 'equityanalytics',
  password: 'equityanalytics',
  serverUrl: 'https://capitalmarkets.us1.cloud.realm.io',
  Stock: Stock,
  Portfolio: Portfolio,
  Equities: Equities,
  News: News,
  Project: Project,
  Item: Item,
  PORTFOLIO: PORTFOLIO,
  UNSUBSCRIBE_PORTFOLIO: UNSUBSCRIBE_PORTFOLIO,
  TOPS: TOPS,
  TOPS_LAST: TOPS_LAST,
  TOPS_SAMPLE: TOPS_SAMPLE,
  STATS: STATS,
  STATS_RECENT: STATS_RECENT,
  NEWS: NEWS,
  PORTFOLIO_NOTIFIER_PATH: PORTFOLIO_NOTIFIER_PATH,
  STOCK_NOTIFIER_PATH: STOCK_NOTIFIER_PATH,
  EQUITIES_NOTIFIER_PATH: EQUITIES_NOTIFIER_PATH,
  MARKETNEWS_NOTIFIER_PATH: MARKETNEWS_NOTIFIER_PATH,
  NEWS_NOTIFIER_PATH: NEWS_NOTIFIER_PATH
}
