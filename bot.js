// FLUEXCODE BOT v1.0 - TEK DOSYA
console.log('🤖 FluexCode Bot Başlıyor...');

const tmi = require('tmi.js');

// AYARLAR (GitHub Secrets'tan gelecek)
const USER = process.env.FLUEX_USER;
const TOKEN = process.env.FLUEX_TOKEN;
const CHANNEL = process.env.FLUEX_CHANNEL || 'fluexcode';

// KONTROL
console.log(`👤 Kullanıcı: ${USER || 'YOK'}`);
console.log(`🔑 Token: ${TOKEN ? 'VAR' : 'YOK'}`);
console.log(`📺 Kanal: ${CHANNEL}`);

// BOT
const client = new tmi.Client({
    identity: { username: USER, password: TOKEN },
    channels: [CHANNEL]
});

// BAĞLAN
client.connect().then(() => {
    console.log(`✅ ${CHANNEL} kanalına bağlandı`);
    client.say(CHANNEL, '🚀 FluexCode Bot aktif!');
}).catch(err => {
    console.error('❌ Hata:', err.message);
});

// KOMUTLAR
client.on('message', (channel, tags, message, self) => {
    if (self) return;
    
    const msg = message.toLowerCase();
    
    // !fluex
    if (msg === '!fluex') {
        client.say(channel, `🎮 @${tags.username}, FluexCode'ye hoş geldin!`);
    }
    
    // !code
    if (msg === '!code') {
        client.say(channel, '💻 Kod öğren: github.com/fluexcode');
    }
    
    // !github
    if (msg === '!github') {
        client.say(channel, '🐱 GitHub: github.com/fluexcode');
    }
    
    // !yardim
    if (msg === '!yardim') {
        client.say(channel, '📚 Komutlar: !fluex !code !github !discord');
    }
    
    // Selam
    if (msg.includes('selam') || msg.includes('merhaba')) {
        client.say(channel, `👋 @${tags.username}, hoş geldin!`);
    }
});

console.log('⏳ Bot hazır...');