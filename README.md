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

# Korean

ws-client-server-nodejs는 node.js에서 websocket 서버와 클라이언트를 구현한 것입니다.

websocket 클라이언트에서 서버로 450개 연결을 만들고 10 KB 파일을 송신합니다.
websocket 서버가 수신한 파일을 그대로 클라이언트로 송신하는 echo 재전송을 합니다.

ws 클라이언트와 서버는 병목되는 증상을 겪습니다.
ws 클라이언트에서는 450개 연결로 동시에 10 KB 파일을 송신하는 함수에서 병목증상을 겪습니다.
ws 서버에서는 450개 연결로 동시에 10 KB 파일을 수신하였을 때 onMessage() 콜백을 최대한 빨리 처리하지 않으면 병목증상을 겪습니다.

ws 서버에서 echo 처리를 위해 onMessage() 콜백에서 송신하는 함수를 호출하는 그 자체가 병목증상을 일으킵니다.
병목이 일어나는 두 가지 이유를 생각해 볼 수 있습니다.
첫째, ws로 송신하는 데이터의 양과 관련이 있습니다.
둘째, ws로 송신하는 시점이 onMessage() 콜백이면 그 자체가 문제가 됩니다.

본 서버와 클라이언트 소스와 소스 내부에 몇 개의 옵션을 가지고
그와 같은 병목 증상에 대해 실험을 할 수가 있습니다.

# License

MIT License
