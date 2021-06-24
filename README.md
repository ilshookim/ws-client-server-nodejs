# ws-client-server-nodejs
ws-client-server-nodejs is websocket client and server using nodejs to performance testing

# ws-server configurations

const cfgMultiport = false;
const cfgTimers = false;
const cfgEcho = false;
const cfg100KB = false;
const cfgInterval = 1; // ms

# ws-client configurations

const cfgMultiport = false;
const cfg100KB = false;

# constraints

const setTotal = 450;
const setBasePort = 9000;

# performance testing

## ws-server

node ws-server.js

ws-server listen to 9000 port.

## ws-client

node ws-client.js

c <enter>

ws-client connect to ws-server 450 sessions.

s <enter>

ws-client send to every sessions json data (10KB).

# License

MIT License
