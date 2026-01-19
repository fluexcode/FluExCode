module.exports = {
    // Bot Kimliği
    identity: {
        name: "FluexCode Bot",
        version: "1.0.0",
        creator: "FluexCode",
        website: "https://twitch.tv/fluexcode"
    },
    
    // Twitch Ayarları
    twitch: {
        username: process.env.FLUEXCODE_BOT_USERNAME,
        oauth: process.env.FLUEXCODE_OAUTH_TOKEN,
        channel: process.env.FLUEXCODE_CHANNEL,
        prefix: process.env.FLUEXCODE_PREFIX || "!"
    },
    
    // Panel Ayarları
    panel: {
        port: process.env.FLUEXCODE_PANEL_PORT || 3000,
        password: process.env.FLUEXCODE_PANEL_PASSWORD,
        title: process.env.FLUEXCODE_PANEL_TITLE || "FluexCode Bot Panel"
    },
    
    // Komut Ayarları
    commands: {
        cooldown: parseInt(process.env.FLUEXCODE_COOLDOWN) || 3,
        autoReply: process.env.FLUEXCODE_AUTO_REPLY === 'true'
    },
    
    // FluexCode Özel Linkler
    links: {
        youtube: "https://youtube.com/fluexcode",
        github: "https://github.com/fluexcode",
        discord: "https://discord.gg/fluexcode",
        twitter: "https://twitter.com/fluexcode",
        instagram: "https://instagram.com/fluexcode"
    }
};