const express = require('express');
const path = require('path');
const config = require('./fluexcode-config');

class FluexcodePanel {
    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
    }
    
    setupMiddleware() {
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, '../public')));
        
        // FluexCode auth middleware
        this.app.use('/admin', (req, res, next) => {
            const password = req.query.pass || req.body.pass;
            if (password === config.panel.password) {
                next();
            } else {
                res.status(401).json({ error: 'FluexCode Panel: Yetkisiz erişim' });
            }
        });
    }
    
    setupRoutes() {
        // Ana sayfa
        this.app.get('/', (req, res) => {
            res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${config.panel.title}</title>
                <link rel="stylesheet" href="/fluexcode-style.css">
                <style>
                    body {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    .fluexcode-header {
                        text-align: center;
                        padding: 50px 20px;
                        color: white;
                    }
                    .fluexcode-header h1 {
                        font-size: 3em;
                        margin-bottom: 10px;
                        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    }
                    .fluexcode-card {
                        background: white;
                        border-radius: 15px;
                        padding: 30px;
                        max-width: 500px;
                        margin: 0 auto;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    }
                </style>
            </head>
            <body>
                <div class="fluexcode-header">
                    <h1>🤖 FluexCode Bot</h1>
                    <p>Twitch Bot Kontrol Paneli</p>
                </div>
                
                <div class="fluexcode-card">
                    <h2>🔐 Panel Girişi</h2>
                    <input type="password" id="password" placeholder="FluexCode Panel Şifresi">
                    <button onclick="login()">Giriş Yap</button>
                    
                    <div style="margin-top: 20px; font-size: 14px; color: #666;">
                        <p>📊 Bot Durumu: <span id="status">Bağlanıyor...</span></p>
                        <p>🎮 Kanal: ${config.twitch.channel}</p>
                    </div>
                </div>
                
                <script>
                    function login() {
                        const pass = document.getElementById('password').value;
                        if(pass) {
                            window.location.href = '/dashboard?pass=' + pass;
                        }
                    }
                </script>
            </body>
            </html>
            `);
        });
        
        // Dashboard
        this.app.get('/dashboard', (req, res) => {
            if (req.query.pass !== config.panel.password) {
                return res.redirect('/');
            }
            
            res.sendFile(path.join(__dirname, '../public/fluexcode-dashboard.html'));
        });
        
        // API Endpoints
        this.app.get('/api/fluexcode/status', (req, res) => {
            res.json({
                bot: 'FluexCode Bot',
                status: 'active',
                channel: config.twitch.channel,
                version: config.identity.version,
                commands: Object.keys(require('./fluexcode-bot').commands)
            });
        });
    }
    
    async start() {
        return new Promise((resolve) => {
            this.server = this.app.listen(config.panel.port, () => {
                console.log(`🌐 FluexCode Panel: http://localhost:${config.panel.port}`);
                resolve();
            });
        });
    }
}

module.exports = new FluexcodePanel();