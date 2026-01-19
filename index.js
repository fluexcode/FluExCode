console.log(`
███████╗██╗     ██╗   ██╗███████╗██╗  ██╗ ██████╗ ██████╗ ██████╗ ███████╗
██╔════╝██║     ██║   ██║██╔════╝╚██╗██╔╝██╔════╝██╔═══██╗██╔══██╗██╔════╝
█████╗  ██║     ██║   ██║█████╗   ╚███╔╝ ██║     ██║   ██║██║  ██║█████╗  
██╔══╝  ██║     ██║   ██║██╔══╝   ██╔██╗ ██║     ██║   ██║██║  ██║██╔══╝  
██║     ███████╗╚██████╔╝███████╗██╔╝ ██╗╚██████╗╚██████╔╝██████╔╝███████╗
╚═╝     ╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
                                                                          
🤖 FluexCode Twitch Bot v1.0.0
🚀 Başlatılıyor...
`);

require('dotenv').config({ path: '.fluexcode-env' });

// FluexCode modüllerini yükle
const fluexcodeBot = require('./src/fluexcode-bot');
const fluexcodePanel = require('./src/fluexcode-panel');

async function startFluexcode() {
    try {
        console.log('📡 FluexCode Bot başlatılıyor...');
        
        // Botu başlat
        await fluexcodeBot.start();
        
        // Paneli başlat
        await fluexcodePanel.start();
        
        console.log('✅ FluexCode Bot & Panel aktif!');
        console.log('🌐 Panel: http://localhost:' + process.env.FLUEXCODE_PANEL_PORT);
        console.log('🎮 Kanal: ' + process.env.FLUEXCODE_CHANNEL);
        
    } catch (error) {
        console.error('❌ FluexCode Bot başlatılamadı:', error);
        process.exit(1);
    }
}

// Başlat
startFluexcode();

// CTRL+C ile kapatma
process.on('SIGINT', () => {
    console.log('\n👋 FluexCode Bot kapatılıyor...');
    process.exit(0);
});