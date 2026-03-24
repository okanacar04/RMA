const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

function getFilePath(key) {
  const safe = key.replace(/[^a-zA-Z0-9_-]/g, '_');
  return path.join(DATA_DIR, `${safe}.json`);
}
function readData(key, fallback) {
  try { if (fs.existsSync(getFilePath(key))) return JSON.parse(fs.readFileSync(getFilePath(key), 'utf8')); return fallback; } catch { return fallback; }
}
function writeData(key, data) {
  fs.writeFileSync(getFilePath(key), JSON.stringify(data, null, 2), 'utf8');
}

// API
app.get('/api/data/:key', (req, res) => res.json({ key: req.params.key, value: readData(req.params.key, null) }));
app.post('/api/data/:key', (req, res) => { writeData(req.params.key, req.body.value); res.json({ success: true }); });
app.delete('/api/data/:key', (req, res) => { const fp = getFilePath(req.params.key); if (fs.existsSync(fp)) fs.unlinkSync(fp); res.json({ success: true }); });

// Backup endpoint - download all data as JSON
app.get('/api/backup', (req, res) => {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  const backup = {};
  files.forEach(f => {
    try { backup[f.replace('.json', '')] = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8')); } catch {}
  });
  res.setHeader('Content-Disposition', `attachment; filename=educrm-backup-${new Date().toISOString().slice(0,10)}.json`);
  res.json(backup);
});

// Restore endpoint
app.post('/api/restore', (req, res) => {
  const data = req.body;
  for (const [key, value] of Object.entries(data)) {
    writeData(key, value);
  }
  res.json({ success: true, restored: Object.keys(data).length });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, '0.0.0.0', () => {
  const interfaces = os.networkInterfaces();
  let localIP = 'localhost';
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) { localIP = iface.address; break; }
    }
  }
  console.log('');
  console.log('  ╔══════════════════════════════════════════════╗');
  console.log('  ║     🍁 Red Maple Academy CRM Başlatıldı!     ║');
  console.log('  ╠══════════════════════════════════════════════╣');
  console.log(`  ║  Bilgisayar:  http://localhost:${PORT}          ║`);
  console.log(`  ║  Ağ:          http://${localIP}:${PORT}     ║`);
  console.log('  ╚══════════════════════════════════════════════╝');
  console.log('');
});
