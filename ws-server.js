const WebSocket = require('ws');
const Day = require('dayjs');

/// options

const cfgMultiport = false;
const cfgTimers = false;
const cfgEcho = false;
const cfg100KB = false;
const cfgInterval = 1; // ms

/// constraints

const setTotal = 450;
const setBasePort = 9000;

/// variables

var ports = new Map();
var connections = new Map();
var payloads = new Map();
var timers = [];

/// main

function main() {
  const total = (cfgMultiport) ? setTotal : 1;
  portAll(total);
  if (cfgTimers) timerAll(total);
}

main();

///functions

async function portAll(total) {
  for (port=setBasePort; port<setBasePort+total; port++) {
    ports.set(port, new WebSocket.Server({port: port}));
  }

  for (port=setBasePort; port<setBasePort+total; port++) {
    const wss = ports.get(port);
    wss.on('connection', async function connection(ws, req) {
      const sid = new Date().valueOf();
      connections.set(ws, sid);
      console.log(`connected: port=${wss.address().port}, connections=${connections.size}, sid=${sid}`);
  
      ws.on('close', async function close() {
          connections.delete(ws);
          console.log(`disconnected: connections=${connections.size}, sid=${sid}`);
      });
        
      ws.on('message', async function incoming(received) {
        const ts2 = Day().valueOf();
        var payload = JSON.parse(received);
        payload.sid = `${sid}`;
        payload.ts2 = `${ts2}`;
        const ts1 = payload.ts1;
        const dur = ts2 - ts1;
        console.log(`received: dur=${dur} ms, sid=${sid}, length=${received.length}`);

        if (cfgTimers) {
          payloads.set(ws, payload);
        } else if (cfgEcho) {
          const ts3 = Day().valueOf();
          payload.ts3 = `${ts3}`;
          if (cfg100KB) {
            payload.big = [];
            for (i=1; i<10; i++) payload.big.push(data10KB());
          }
          const sent = JSON.stringify(payload);
          ws.send(sent);
  
          const ts1 = payload.ts1;
          const latency = ts3 - ts1;
          const sid = payload.sid;
          console.log(`echo: latency=${latency} ms, sid=${sid}, length=${sent.length}`);
        }
      });
    });
  }
}

function timerAll(total) {
  var count = total;
  while (count-- > 0) timers.push(setInterval(write, cfgInterval));
}

async function write() {
  const KEY = 0;
  const VALUE = 1;
  for (let obj of payloads) {
      const ws = obj[KEY];
      var payload = obj[VALUE];
      payloads.delete(ws);

      if (cfg100KB) {
        payload.big = [];
        for (i=1; i<10; i++) payload.big.push(data10KB());
      }

      const ts3 = Day().valueOf();
      payload.ts3 = `${ts3}`;

      const sent = JSON.stringify(payload);

      ws.send(sent);

      const ts1 = payload.ts1;
      const latency = ts3 - ts1;
      const sid = payload.sid;
      console.log(`timerSent: latency=${latency} ms, sid=${sid}, length=${sent.length}`);
      break;
  }
}

/// sample data

function data10KB() {
    return {
      "log": 
      {
        "version": "1.2",
        "creator": {
          "name": "WebInspector",
          "version": "537.36"
        },
        "pages": [
          {
            "startedDateTime": "2021-04-30T11:01:48.509Z",
            "id": "page_1",
            "title": "https://stackoverflow.com/questions/13010354/chunking-websocket-transmission",
            "pageTimings": {
              "onContentLoad": 443.51300003472718,
              "onLoad": 779.8310000216588
            }
          }
        ],
        "entries": 
        [
          {
            "_initiator": {
              "type": "other"
            },
            "_priority": "VeryHigh",
            "_resourceType": "document",
            "cache": {},
            "connection": "217848",
            "pageref": "page_1",
            "request": {
              "method": "GET",
              "url": "https://stackoverflow.com/questions/13010354/chunking-websocket-transmission",
              "httpVersion": "http/2.0",
              "headers": [
                {
                  "name": ":method",
                  "value": "GET"
                },
                {
                  "name": ":authority",
                  "value": "stackoverflow.com"
                },
                {
                  "name": ":scheme",
                  "value": "https"
                },
                {
                  "name": ":path",
                  "value": "/questions/13010354/chunking-websocket-transmission"
                },
                {
                  "name": "cache-control",
                  "value": "max-age=0"
                },
                {
                  "name": "sec-ch-ua",
                  
                },
                {
                  "name": "sec-ch-ua-mobile",
                  "value": "?0"
                },
                {
                  "name": "upgrade-insecure-requests",
                  "value": "1"
                },
                {
                  "name": "user-agent",
                  
                },
                {
                  "name": "accept",
                  
                },
                {
                  "name": "sec-fetch-site",
                  "value": "cross-site"
                },
                {
                  "name": "sec-fetch-mode",
                  "value": "navigate"
                },
                {
                  "name": "sec-fetch-user",
                  "value": "?1"
                },
                {
                  "name": "sec-fetch-dest",
                  "value": "document"
                },
                {
                  "name": "referer",
                  "value": "https://www.google.com/"
                },
                {
                  "name": "accept-encoding",
                  "value": "gzip, deflate, br"
                },
                {
                  "name": "accept-language",
                  "value": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
                },
                {
                  "name": "cookie",
                  
                }
              ],
              "queryString": [],
              "cookies": [
                {
                  "name": "prov",
                  "value": "d9994a63-77a6-1a53-4ce4-8e8c49323588",
                  "expires": null,
                  "httpOnly": false,
                  "secure": false
                },
                {
                  "name": "_ga",
                  "value": "GA1.2.2109351311.1618379782",
                  "expires": null,
                  "httpOnly": false,
                  "secure": false
                },
                {
                  "name": "OptanonAlertBoxClosed",
                  "value": "2021-04-14T05:58:18.044Z",
                  "expires": null,
                  "httpOnly": false,
                  "secure": false
                },
                {
                  "name": "OptanonConsent",
                  
                  "expires": null,
                  "httpOnly": false,
                  "secure": false
                },
                {
                  "name": "_gid",
                  "value": "GA1.2.627053591.1619763887",
                  "expires": null,
                  "httpOnly": false,
                  "secure": false
                }
              ],
              "headersSize": -1,
              "bodySize": 0
            },
            "response": {
              "status": 200,
              "statusText": "",
              "httpVersion": "http/2.0",
              "headers": [
        
              ],
              "cookies": [],
              "content": {
                "size": 179444,
                "mimeType": "text/html",
                
              },
              "redirectURL": "",
              "headersSize": -1,
              "bodySize": -1,
              "_transferSize": 44131,
              "_error": null
            },
            "serverIPAddress": "151.101.129.69",
            "startedDateTime": "2021-04-30T11:01:48.507Z",
            "time": 410.47400003299119,
            "timings": {
              "blocked": 3.043000008329749,
              "dns": -1,
              "ssl": -1,
              "connect": -1,
              "send": 0.3880000000000001,
              "wait": 226.11400000090897,
              "receive": 180.92900002375246,
              "_blocked_queueing": 1.744000008329749
            }
          },
          {
            "_fromCache": "memory",
            "_initiator": {
              "type": "parser",
              "url": "https://stackoverflow.com/questions/13010354/chunking-websocket-transmission",
              "lineNumber": 23
            },
            "_priority": "High",
            "_resourceType": "script",
            "cache": {},
            "pageref": "page_1",
  
              "status": 200,
              "statusText": "",
              "httpVersion": "h3-q050",
              "headers": [
                {
                  "name": "date",
                  "value": "Sun, 25 Apr 2021 05:56:50 GMT"
                },
                {
                  "name": "content-encoding",
                  "value": "gzip"
                },
                {
                  "name": "x-content-type-options",
                  "value": "nosniff"
                },
                {
                  "name": "age",
                  "value": "154324"
                },
                {
                  "name": "cross-origin-resource-policy",
                  "value": "cross-origin"
                },
                {
                  "name": "alt-svc",
                  
                },
                {
                  "name": "content-length",
                  "value": "33951"
                },
                {
                  "name": "x-xss-protection",
                  "value": "0"
                },
                {
                  "name": "last-modified",
                  "value": "Tue, 03 Mar 2020 19:15:00 GMT"
                },
                {
                  "name": "server",
                  "value": "sffe"
                },
                {
                  "name": "vary",
                  "value": "Accept-Encoding"
                },
                {
                  "name": "content-type",
                  "value": "text/javascript; charset=UTF-8"
                },
                {
                  "name": "access-control-allow-origin",
                  "value": "*"
                },
                {
                  "name": "cache-control",
                  "value": "public, max-age=31536000, stale-while-revalidate=2592000"
                },
                {
                  "name": "accept-ranges",
                  "value": "bytes"
                },
                {
                  "name": "timing-allow-origin",
                  "value": "*"
                },
                {
                  "name": "expires",
                  "value": "Mon, 25 Apr 2022 05:56:50 GMT"
                }
              ],
              "cookies": [],
              "content": {
                "size": 97163,
                "mimeType": "text/javascript",
              
              },
              "redirectURL": "",
              "headersSize": -1,
              "bodySize": 0,
              "_transferSize": 0,
              "_error": null
          },
          {
            "serverIPAddress": "172.217.31.170",
            "startedDateTime": "2021-04-30T11:01:48.781Z",
            "time": 0.109999964479357,
            "timings": {
              "blocked": -1,
              "dns": -1,
              "ssl": -1,
              "connect": -1,
              "send": 0,
              "wait": 0.08699996396899224,
              "receive": 0.02300000051036477,
              "_blocked_queueing": -1
            }
          },
          {
            "_fromCache": "memory",
            "_initiator": {
              "type": "parser",
              "url": "https://stackoverflow.com/questions/13010354/chunking-websocket-transmission",
              "lineNumber": 24
            },
            "_priority": "High",
            "_resourceType": "script",
            "cache": {},
            "connection": "217848",
            "pageref": "page_1",
            "request": {
              "method": "GET",
              "url": "https://cdn.sstatic.net/Js/stub.en.js?v=d0f0ef54ac95",
              "httpVersion": "http/2.0",
              "headers": [
                {
                  "name": "sec-ch-ua",
                  "value": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\""
                },
                {
                  "name": "Referer",
                  "value": "https://stackoverflow.com/"
                },
                {
                  "name": "sec-ch-ua-mobile",
                  "value": "?0"
                },
                {
                  "name": "User-Agent",
                  
                }
              ],
              "queryString": [
                {
                  "name": "v",
                  "value": "d0f0ef54ac95"
                }
              ],
              "cookies": [],
              "headersSize": -1,
              "bodySize": 0
            },
            "response": {
              "status": 200,
              "statusText": "",
              "httpVersion": "http/2.0",
              "headers": [
                {
                  "name": "date",
                  "value": "Fri, 30 Apr 2021 10:53:15 GMT"
                },
                {
                  "name": "content-encoding",
                  "value": "gzip"
                },
                {
                  "name": "last-modified",
                  "value": "Fri, 30 Apr 2021 10:43:10 GMT"
                },
                {
                  "name": "age",
                  "value": "477"
                },
                {
                  "name": "vary",
                  "value": "Accept-Encoding,Accept-Encoding"
                },
                {
                  "name": "x-cache",
                  "value": "HIT"
                },
                {
                  "name": "content-type",
                  "value": "application/javascript"
                },
                {
                  "name": "access-control-allow-origin",
                  "value": "stackoverflow.com"
                },
                {
                  "name": "cache-control",
                  "value": "max-age=604800"
                },
                {
                  "name": "x-cache-hits",
                  "value": "17"
                },
                {
                  "name": "accept-ranges",
                  "value": "bytes"
                },
                {
                  "name": "x-timer",
                  "value": "S1619779996.771621,VS0,VE0"
                },
                {
                  "name": "content-length",
                  "value": "17834"
                },
                {
                  "name": "via",
                  "value": "1.1 varnish"
                },
                {
                  "name": "x-served-by",
                  "value": "cache-itm18820-ITM"
                }
              ],
              "cookies": [],
              "content": {
                "size": 52750,
                "mimeType": "application/javascript",
  
              },
              "redirectURL": "",
              "headersSize": -1,
              "bodySize": 0,
              "_transferSize": 0,
              "_error": null
            },
            "serverIPAddress": "151.101.129.69",
            "startedDateTime": "2021-04-30T11:01:48.782Z",
            "time": 0.07000000914558768,
            "timings": {
              "blocked": -1,
              "dns": -1,
              "ssl": -1,
              "connect": -1,
              "send": 0,
              "wait": 0.05600001895800233,
              "receive": 0.013999990187585354,
              "_blocked_queueing": -1
            }
          },
          {
            "_fromCache": "memory",
            "_initiator": {
              "type": "parser",
              "url": "https://stackoverflow.com/questions/13010354/chunking-websocket-transmission",
              "lineNumber": 519
            },
            "_priority": "Low",
            "_resourceType": "image",
            "cache": {},
            "pageref": "page_1",
            "request": {
              "method": "GET",
              "url": "https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e",
              "httpVersion": "http/2.0",
              "headers": [
                {
                  "name": "sec-ch-ua",
                  "value": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\""
                },
                {
                  "name": "Referer",
                  "value": "https://stackoverflow.com/"
                },
                {
                  "name": "sec-ch-ua-mobile",
                  "value": "?0"
                },
                {
                  "name": "User-Agent",
  
                }
              ],
              "queryString": [
                {
                  "name": "v",
                  "value": "47faa659a05e"
                }
              ],
              "cookies": [],
              "headersSize": -1,
              "bodySize": 0
            },
  
  
          },
  
        ]
      }
    };
  }
  