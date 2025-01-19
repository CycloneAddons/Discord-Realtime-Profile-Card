const { requestUserPresence, presence, connectWebSocket, isUserInGuild } = require('./ws');
const WebSocket = require('ws');
require('dotenv').config();
connectWebSocket();

const wss = new WebSocket.Server({ port: 8080 });
const lastOnlineData = {};
const userSubscriptions = {};
const offline = {};

presence.on('update', async (data) => {
    lastOnlinePlatform(data)
    if (userSubscriptions[data.user.id]) {
    broadcastUpdate(await fullData(data));
    }
});

presence.on('get', async ({data, userId}) => {
    if(data){
    sendPresenceData(await fullData(data));
    lastOnlinePlatform(data);
    } else {
        sendPresenceData(await fullData(offline[userId]|| { user: { id: userId }, status: 'offline', client_status: { desktop: 'offline'}, activities: [] }));
    }
});

wss.on('connection', (ws) => {
    ws.on('message', async(message) => {
        const data = JSON.parse(message);

        if (data.type === 'subscribe') {
            const userId = data.userId;
            if (await isUserInGuild(data.userId) === 404) return ws.send(JSON.stringify({ type: 'error', code: 404, message: `User Not In Our Server: ${process.env.INVITE} . Disconnecting....` }), () => ws.close(4001, 'User Not In Our Server: https://discord.gg/cYAYkQVSsN'));

            requestUserPresence(userId);

            if (!userSubscriptions[userId]) {
                userSubscriptions[userId] = [];
            }

            userSubscriptions[userId].push(ws);
            console.log(`Subscribed to user ${userId}`);
        }
    });

    ws.on('close', () => {
        for (const userId in userSubscriptions) {
            userSubscriptions[userId] = userSubscriptions[userId].filter((client) => client !== ws);
        }
    });
});

function broadcastUpdate(data) {
    const userId = data.user.id;
        userSubscriptions[userId].forEach((ws) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'update', data }));
            }
        });
}

function sendPresenceData(data) {
    const userId = data.user.id;
    if (userSubscriptions[userId]) {
        userSubscriptions[userId].forEach((ws) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'get', data }));
            }
        });
    }
}

function capitalizeFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function fullData(data) {
    const user = await (await fetch(`https://discord.com/api/v9/users/${data.user.id}/profile`, { headers: { authorization: process.env.ACCTOKEN } })).json();
  delete user.mutual_guilds; delete user.guild_badges; 
  try {
  const clientStatus = Object.keys(data.client_status).length === 0 ? lastOnlineData[data.user.id] : data.client_status;

  await Object.keys(clientStatus).forEach(platform => {
   let status = data.client_status[platform];
   const statusColors = {
    idle: "#f0b232",
    dnd: "#f23f43",
    online: "#23a55a",
    offline: "#80848e",
    streaming: "#593695"
  };

    user.badges.push({
            id: platform,
            description: (status === "offline" || !status) ? `Last Online From ${capitalizeFirstChar(platform)}` : `Online From ${capitalizeFirstChar(platform)}`,
            status: status ? status : "offline",
            color: statusColors[status] || "#80848e",
        });
    });
    user.status = data.status; user.activities = data.activities;
} catch(e) {
    if(!process.env.WEBHOOK) return;
    const embed = {
        title: "Error Fetching User Profile",
        color: 16711680,
        description: `Hey <@&${process.env.SUPPORTROLE}>, Please Check Why <@${data.user.id}> Getting The Below Error...` + `\`\`\`json\n${JSON.stringify(user, null, 2)}\`\`\`` ,
}

await fetch(process.env.WEBHOOK, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ embeds: [embed] })
});

}
return user;
}

function lastOnlinePlatform(data) {
    if (data.status !== "offline") {
        const updatedStatus = {};
        for (let platform in data.client_status) {
            updatedStatus[platform] = 'offline';
        }
        lastOnlineData[data.user.id] = updatedStatus;
 } else {
    offline[data.user.id] = { user: { id: data.user.id }, status: 'offline', client_status: lastOnlineData[data.user.id], activities: [] }         
 }
}

