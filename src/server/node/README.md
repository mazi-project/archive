# Hybrid Letterbox Node Server

Node Server for saving the submissions thrown into the letterbox

## Setup

* run `npm install`
* `cp config.default.js config.js` and change database credentials and username and password in auth section

## Testing

* start test server with `npm run test-server`
* run `npm test`

## Deploying

* install pm2 globally : `npm install pm2 -g
* `pm2 start app.js` and `pm2 save`

