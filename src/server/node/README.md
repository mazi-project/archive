# Hybrid Letterbox Node Server

Node Server for saving the submissions thrown into the letterbox

## Setup

* run `npm install`
* install pm2 globally : `npm install pm2 -g
* `cp config.default.js config.js` and change database credentials and username and password in auth section

## Testing

* start test server with `npm run test-server`
* run `npm test`

## Deploying

*  create startup script for mongodb
*  `pm2 start app.js` and `pm2 save`

