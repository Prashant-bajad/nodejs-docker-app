const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>CI/CD Demo App</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    background: white;
                    padding: 50px;
                    border-radius: 20px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                    text-align: center;
                }
                h1 {
                    color: #667eea;
                    margin-bottom: 20px;
                }
                .badge {
                    display: inline-block;
                    background: #28a745;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 25px;
                    margin: 10px;
                    font-weight: bold;
                }
                .info {
                    margin-top: 30px;
                    color: #666;
                    font-size: 14px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 CI/CD Pipeline Success!</h1>
                <p>Deployed via Jenkins + Docker + ECR</p>
                <div>
                    <span class="badge">✅ Jenkins</span>
                    <span class="badge">🐳 Docker</span>
                    <span class="badge">☁️ AWS ECR</span>
                    <span class="badge">⚙️ EC2</span>
                </div>
                <div class="info">
                    <p><strong>Version:</strong> 1.0.0</p>
                    <p><strong>Node.js App</strong> running in Docker Container</p>
                    <p><strong>Build:</strong> ${new Date().toLocaleString()}</p>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Open http://localhost:${PORT}`);
});