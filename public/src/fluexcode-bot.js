const tmi = require('tmi.js');
const config = require('./fluexcode-config');

let client = null;
const cooldowns = new Map();

class FluexcodeBot {
    constructor() {
        this.config = config;
        this.commands = {};
        this.loadCommands();
    }
    
    loadCommands() {
        // FluexCode Özel Komutları
        this.commands = {
            '!fluex': {
                execute: (channel, tags, args) => {
                    this.say(channel, `🎮 FluexCode kanalına hoş geldin @${tags.username}! 🚀`);
                },
                cooldown: 5,
                description: 'FluexCode hoşgeldin mesajı'
            },
            
            '!code': {
                execute: (channel, tags, args) => {
                    this.say(channel, `💻 FluexCode ile kodlama öğrenmek için: ${config.links.youtube}`);
                },
                cooldown: 10,
                description: 'Kodlama eğitimleri'
            },
            
            '!github': {
                execute: (channel, tags, args) => {
                    this.say(channel, `🐱 FluexCode GitHub: ${config.links.github}`);
                },
                cooldown: 5,
                description: 'GitHub hesabı'
            },
            
            '!discord': {
                execute: (channel, tags, args) => {
                    this.say(channel, `🎮 FluexCode Discord: ${config.links.discord}`);
                },
                cooldown: 5,
                description: 'Discord sunucusu'
            },
            
            '!projeler': {
                execute: (channel, tags, args) => {
                    this.say(channel, `🚀 FluexCode projeleri: Twitch Bot, Web Panel, API, Discord Bot`);
                },
                cooldown: 10,
                description: 'Aktif projeler'
            },
            
            '!yardim': {
                execute: (channel, tags, args) => {
                    this.say(channel, `📚 Komutlar: !fluex !code !github !discord !projeler !canli !komutlar`);
                },
                cooldown: 3,
                description: 'Yardım menüsü'
            },
            
            '!canli': {
                execute: (channel, tags, args) => {
                    this.say(channel, `🔴 FluexCode canlı yayın programı için Discord sunucusunu takip edin!`);
                },
                cooldown: 30,
                description: 'Canlı yayın bilgisi'
            },
            
            '!komutlar': {
                execute: (channel, tags, args) => {
                    const cmdList = Object.keys(this.commands).join(', ');
                    this.say(channel, `📜 FluexCode komutları: ${cmdList}`);
                },
                cooldown: 30,
                description: 'Tüm komutlar'
            }
        };
    }
    
    async start() {
        console.log('🤖 FluexCode Bot başlatılıyor...');
        
        client = new tmi.Client({
            options: { debug: false },
            connection: {
                secure: true,
                reconnect: true
            },
            identity: {
                username: this.config.twitch.username,
                password: this.config.twitch.oauth
            },
            channels: [this.config.twitch.channel]
        });
        
        await client.connect();
        console.log(`✅ FluexCode Bot ${this.config.twitch.channel} kanalına bağlandı`);
        
        // Event listener'lar
        client.on('message', this.onMessage.bind(this));
        client.on('connected', this.onConnected.bind(this));
        
        // Bağlantı mesajı
        this.say(this.config.twitch.channel, '🚀 FluexCode Bot aktif! !yardim yazarak komutları görebilirsiniz.');
    }
    
    onConnected(address, port) {
        console.log(`📡 Bağlantı: ${address}:${port}`);
    }
    
    onMessage(channel, tags, message, self) {
        if (self) return;
        
        const username = tags.username;
        const isFluex = username.toLowerCase() === 'fluexcode';
        
        // Özel karşılama
        if (message.toLowerCase().includes('fluex') || message.toLowerCase().includes('fluexcode')) {
            if (Math.random() > 0.7) { // %30 şans
                this.say(channel, `👋 @${username}, FluexCode topluluğuna hoş geldin!`);
            }
        }
        
        // Komut işleme
        if (message.startsWith(this.config.twitch.prefix)) {
            const command = message.split(' ')[0].toLowerCase();
            const args = message.slice(command.length).trim().split(' ');
            
            if (this.commands[command]) {
                // Cooldown kontrol
                if (this.checkCooldown(username, command)) {
                    return;
                }
                
                this.commands[command].execute(channel, tags, args);
                this.setCooldown(username, command);
            }
        }
    }
    
    checkCooldown(username, command) {
        const key = `${username}_${command}`;
        const now = Date.now();
        const cooldown = this.commands[command].cooldown * 1000;
        
        if (cooldowns.has(key)) {
            const lastUsed = cooldowns.get(key);
            if (now - lastUsed < cooldown) {
                return true;
            }
        }
        return false;
    }
    
    setCooldown(username, command) {
        const key = `${username}_${command}`;
        cooldowns.set(key, Date.now());
    }
    
    say(channel, message) {
        if (client) {
            client.say(channel, message);
        }
    }
    
    getClient() {
        return client;
    }
}

module.exports = new FluexcodeBot();