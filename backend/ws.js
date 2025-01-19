const WebSocket = require('ws');
let heartbeatInterval;
let sequence = null;
let lastHeartbeat = Date.now();
let ws;
require('dotenv').config();


const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const presence = new MyEmitter();

async function isUserInGuild(userId) {
  
  const url = `https://discord.com/api/v10/guilds/${process.env.GUILDID}/members/${userId}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bot ${process.env.BOTTOKEN}`,
    },
  });
  return response.status
}

async function getGatewayURL() {
  console.log(process.env.BOTTOKEN);
  const response = await fetch('https://discord.com/api/v10/gateway/bot', {
    method: 'GET',
    headers: {
      'Authorization': `Bot ${process.env.BOTTOKEN}`,
    },
  });

  const data = await response.json();
  return data.url;
}
function startHeartbeat() {
    if (ws.readyState === WebSocket.OPEN) {
      console.log('Starting heartbeat...');
      sendHeartbeat();
      setInterval(sendHeartbeat, 30000); 
    }
  }

  async function connectWebSocket() {
  isUserInGuild();
  const gatewayURL = await getGatewayURL();
  ws = new WebSocket(gatewayURL);

  ws.on('open', () => {
    console.log('WebSocket connected!');
    identifyBot();
    startHeartbeat();
  });

  ws.on('message', (data) => {
    const payload = JSON.parse(data);


    if (payload.t === 'PRESENCE_UPDATE') {
         presence.emit('update', payload.d);
 }

 if(payload.t === 'GUILD_MEMBERS_CHUNK') {
    presence.emit('get', {data: payload.d.presences[0], userId: payload.d.members[0].user.id});
 }
 
    if (payload.op === 10) {
      const interval = payload.d.heartbeat_interval;
      clearInterval(heartbeatInterval);
      heartbeatInterval = setInterval(sendHeartbeat, interval);
    }

    if (payload.op === 11) { 
      lastHeartbeat = Date.now();
    }
    if (payload.s) {
      sequence = payload.s;
    }
  });

  ws.on('close', () => {
    console.log('WebSocket disconnected. Reconnecting...');
    reconnect();
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
}


function identifyBot() {
  const identifyData = {
    op: 2,
    d: {
      token: process.env.BOTTOKEN,
      properties: {
        $os: 'linux',
        $browser: 'discord.js',
        $device: 'discord.js',
      },
      intents: 32767, 
    },
  };

  ws.send(JSON.stringify(identifyData));
}


function requestUserPresence(userId) {
    const requestPayload = {
        op: 8,
        d: {
            guild_id: process.env.GUILDID,
            user_ids: [userId], 
            query: [userId], 
            limit: 0,
            presences: true 
        }
    };
    ws.send(JSON.stringify(requestPayload));
}

function sendHeartbeat() {
  if (ws.readyState === WebSocket.OPEN) {
    const heartbeatPayload = {
      op: 1,
      d: sequence,
    };

    ws.send(JSON.stringify(heartbeatPayload));
    console.log('Heartbeat sent');
  }
}

function reconnect() {
  setTimeout(() => {
    console.log('Reconnecting to WebSocket...');
    connectWebSocket();
  }, Math.min(5000, Math.random() * 5000 + 1000)); 
}


module.exports = { presence, connectWebSocket, requestUserPresence, isUserInGuild};
