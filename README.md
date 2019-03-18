# iex-realm-service
## Integrates IEX Trading exchange to Realm cloud db for the Mobile integration

### Overview:

A user can enter a ticker and then get all the current industry news published in the ticker from IEX exchange.

This project is the backend for the Realm Mobile Application. The project listens on the insertion of a new ticker and then goes and gets the market news based on the entered ticker from IEX echange and updates the mobile tasks list.

1. User will be able to add a new Ticker to the main (Project) screen
2. Event handler running on the Node Server listens to  change event and triggers the functions that calls upon 'change.insertion'
3. Zeroing on the change object, an external API call is being made to IEX Exchange api via axios library to fetch the related news.
4. On receiving the news, the backend server updates the Items under Project with the article URL.

##### Components:
Realm DB
Realm Cloud
Axios
IEX API

##### Usage:
```json
git clone git@github.com:vijaypolsani/iex-realm-service.git
git checkout DEMO
npm install
npm start

```
Project runtime demo using Realm IDE, Android, Listener
![alt text](./RealmDemo.gif)
