# ws-client-server-nodejs

ws-client-server-nodejs is websocket client and server using nodejs to performance testing

ws-client connects to ws-server until 450 sessions \
and sends 10KB data to every 450 sessions.

when you execute ws-client \
input 'c' and (enter) to connect 450 sessions \
input 's' and (enter) to send 10KB data to every 450 sessions.

# node.js and javascript limitation

When I performance testing about this ws-client and ws-server \
I knew that node.js and javascript websocket client and server model has \
techinical limitation about this.

My opinions: \
Like a echo, if data transmission overlaps while ws-server is receiving data, \
transmission and reception are interfered with each other. 

# ws-server configurations

const cfgMultiport = false; // port: 9000~9450 (setBasePort~setTotal) \
const cfgTimers = false; // reply: echo using 450 timers (setTotal) \
const cfgEcho = false; // echo: echo enable/disable \
const cfg100KB = false; // big: echo size 100KB instead of default 10KB \
const cfgInterval = 1; // timers: echo timers interval (1 ms)

# ws-client configurations

const cfgMultiport = false; // port: 9000~9450 (setBasePort~setTotal) \
const cfg100KB = false; // big: bit size 100KB instead of default 10KB

# constraints

const setTotal = 450; // sessions: total 450 \
const setBasePort = 9000; // port: default port 9000

# performance testing

## ws-server

$ node ws-server.js

ws-server listen to 9000 port.

## ws-client

$ node ws-client.js

c (enter)

ws-client connects to ws-server 450 sessions.

s (enter)

ws-client sends to every sessions json data (10KB).

# License

MIT License
