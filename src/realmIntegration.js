const Realm = require('realm')
const uuid4 = require('uuid4')
const constants = require('../constants')

async function realmProjectItem (newsList, project) {
  Realm.Sync.User.login(process.env.SERVER_URL, Realm.Sync.Credentials.nickname(process.env.USERNAME, true)).then((user) => {
    const config = {
      schema: [constants.Item, constants.Project],
      path: 'MarketNews',
      sync: {
        user: user,
        url: `realms://${process.env.SERVER_ADDRESS}/MarketNews`
      }
    }
    Realm.open(config).then((realm) => {
      realm.write(() => {
        let Project = realm.create('Project', {
          projectId: project.projectId,
          owner: project.owner,
          name: project.name,
          timestamp: new Date(),
          items: []
        }, true)
        if (newsList) {
          console.log('newslist length: ', newsList.length)
          for (let i = 0; i < newsList.length; i++) {
            let newArticle = realm.create('Item', {
              itemId: uuid4(),
              body: newsList[i].url,
              isDone: false,
              timestamp: new Date(newsList[i].datetime)
            }, true)
            Project.items.push(newArticle)
          }
        }
      })
      // realm.close()
    }).catch((err) => {
      console.error('Error in Realm saving data for News. ', err)
    })
  })
}

module.exports.realmProjectItem = realmProjectItem
