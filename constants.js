const PORTFOLIO = 'snap,fb,aig,googl,TNDM,ZS,BMY,STT,SQ,PYPL,AXP,ZUO,NTNX,GWRE,PLAN,VMW,PLAN,PANW,WDAY,SPLK,SIVB,DXCM,NTAP,ADSK,NVDA,CRM,INTU,COST,HD,TWLO,TJX,ROKU,LLY,JAZZ,CVS,MAR,BABA,BKNG,ANET,BIO,TEVA,AAPL,ZEN,KO,IBM,RHT,KLAC,GPN,FEYE,EA,MA,EBAY,TNET,MCO,MSTR,ADBE,AMZN,GOOGL,GRUB,LUV,BIDU,CMG,TENB,FTNT,QLYS,CYBR,ILMN,BIIB,TRV,ISRG,CELG,MSFT,VEEV,FB,OMN.AX'
const UNSUBSCRIBE_PORTFOLIO = 'AIG+'
const TOPS = 'https://cloud.iexapis.com/beta/tops?'
const TOPS_LAST = 'https://cloud.iexapis.com/beta/tops/last?'
const TOPS_SAMPLE = 'https://cloud.iexapis.com/beta/tops?symbols=GOOGL,FB,NOW%2b&'
const STATS = 'https://cloud.iexapis.com/beta/stats?'
const STATS_RECENT = 'https://cloud.iexapis.com/beta/stats/recent?'
const NEWS = 'https://cloud.iexapis.com/beta/stock/{symbol}/news?'

const S_P_500_1 = ''
const S_P_500_2 = ''
const S_P_500_3 = ''
const S_P_500_4 = ''
const S_P_500_5 = ''
const S_P_500_6 = ''
const S_P_500_7 = ''
const S_P_500_8 = ''
const S_P_500_9 = ''
const S_P_500_10 = ''

const PORTFOLIO_NOTIFIER_PATH = '/portfolio'
const STOCK_NOTIFIER_PATH = '/stock'
const EQUITIES_NOTIFIER_PATH = '/equities'
const MARKETNEWS_NOTIFIER_PATH = '/marketnews'
const NEWS_NOTIFIER_PATH = '/news'

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
    news: 'News[]'
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
  MarketNews: MarketNews,
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
  MARKETNEWS_NOTIFIER_PATH: NEWS_NOTIFIER_PATH,
  NEWS_NOTIFIER_PATH: NEWS_NOTIFIER_PATH
}
