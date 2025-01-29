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
  try {
    const url = `https://discord.com/api/v10/guilds/${process.env.GUILDID}/members/${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': `Bot ${process.env.BOTTOKEN}` },
    });
    return response.status;
  } catch (error) {
    console.error('Error checking user in guild:', error);
    return null;
  }
}

async function getGatewayURL() {
  try {
    const response = await fetch('https://discord.com/api/v10/gateway/bot', {
      method: 'GET',
      headers: { 'Authorization': `Bot ${process.env.BOTTOKEN}` },
    });
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error fetching gateway URL:', error);
    return null;
  }
}

function startHeartbeat() {
  if (ws.readyState === WebSocket.OPEN) {
    console.log('Starting heartbeat...');
    sendHeartbeat();
    heartbeatInterval = setInterval(sendHeartbeat, 30000);
  }
}

async function connectWebSocket() {
  try {
    const gatewayURL = await getGatewayURL();
    if (!gatewayURL) {
      console.error('Failed to get gateway URL, retrying in 5 seconds...');
      return setTimeout(connectWebSocket, 5000);
    }
    
    ws = new WebSocket(gatewayURL);

    ws.on('open', () => {
      console.log('WebSocket connected!');
      identifyBot();
      startHeartbeat();
    });

    ws.on('message', (data) => {
      try {
        const payload = JSON.parse(data);

        if (payload.t === 'PRESENCE_UPDATE') {
          presence.emit('update', payload.d);
        }

        if (payload.t === 'GUILD_MEMBERS_CHUNK') {
          presence.emit('get', { data: payload.d.presences[0], userId: payload.d.members[0].user.id });
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
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket disconnected. Reconnecting...');
      reconnect();
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  } catch (error) {
    console.error('Error connecting WebSocket:', error);
    setTimeout(connectWebSocket, 5000);
  }
}

function identifyBot() {
  try {
    const identifyData = {
      op: 2,
      d: {
        token: process.env.BOTTOKEN,
        properties: { $os: 'linux', $browser: 'discord.js', $device: 'discord.js' },
        intents: 32767,
      },
    };
    ws.send(JSON.stringify(identifyData));
  } catch (error) {
    console.error('Error identifying bot:', error);
  }
}

function requestUserPresence(userId) {
  try {
    const requestPayload = {
      op: 8,
      d: {
        guild_id: process.env.GUILDID,
        user_ids: [userId],
        query: [userId],
        limit: 0,
        presences: true,
      },
    };
    ws.send(JSON.stringify(requestPayload));
  } catch (error) {
    console.error('Error requesting user presence:', error);
  }
}

function sendHeartbeat() {
  try {
    if (ws.readyState === WebSocket.OPEN) {
      const heartbeatPayload = { op: 1, d: sequence };
      ws.send(JSON.stringify(heartbeatPayload));
      console.log('Heartbeat sent');
    }
  } catch (error) {
    console.error('Error sending heartbeat:', error);
  }
}

function reconnect() {
  console.log('Attempting to reconnect in 5 seconds...');
  setTimeout(() => {
    connectWebSocket();
  }, 5000);
}

module.exports = { presence, connectWebSocket, requestUserPresence, isUserInGuild };
