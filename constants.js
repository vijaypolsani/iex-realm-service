const PORTFOLIO = 'snap,fb,aig,googl,TNDM,ZS,BMY,STT,SQ,PYPL,AXP,ZUO,NTNX,GWRE,PLAN,VMW,PLAN,PANW,WDAY,SPLK,SIVB,DXCM,NTAP,ADSK,NVDA,CRM,INTU,COST,HD,TWLO,TJX,ROKU,LLY,JAZZ,CVS,MAR,BABA,BKNG,ANET,BIO,TEVA,AAPL,ZEN,KO,IBM,RHT,KLAC,GPN,FEYE,EA,MA,EBAY,TNET,MCO,MSTR,ADBE,AMZN,GOOGL,GRUB,LUV,BIDU,CMG,TENB,FTNT,QLYS,CYBR,ILMN,BIIB,TRV,ISRG,CELG,MSFT,VEEV,FB,OMN.AX'
const UNSUBSCRIBE_PORTFOLIO = 'AIG+'

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
  MarketNews: MarketNews,
  PORTFOLIO: PORTFOLIO,
  UNSUBSCRIBE_PORTFOLIO: UNSUBSCRIBE_PORTFOLIO
}
