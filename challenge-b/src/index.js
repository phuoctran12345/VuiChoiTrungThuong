const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// =============================================
// ROUTES
// =============================================

// Trang chủ
app.get('/', (req, res) => {
    res.json({
        message: '🐳 Hello from Docker Workshop!',
        workshop: 'From Code to Cloud - FPT University Da Nang',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

// Thông tin hệ thống
app.get('/api/info', (req, res) => {
    res.json({
        app: 'docker-workshop-starter',
        version: '1.0.0',
        node_version: process.version,
        hostname: os.hostname(),
        platform: os.platform(),
        memory: {
            total: `${Math.round(os.totalmem() / 1024 / 1024)} MB`,
            free: `${Math.round(os.freemem() / 1024 / 1024)} MB`,
        },
    });
});

// Danh sách students (demo API)
const students = [
    { id: 1, name: 'Nguyen Van A', class: 'SE1234' },
    { id: 2, name: 'Tran Thi B', class: 'SE1234' },
    { id: 3, name: 'Le Van C', class: 'SE5678' },
];

app.get('/api/students', (req, res) => {
    res.json({ count: students.length, data: students });
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find((s) => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
});

// =============================================
// START SERVER
// =============================================
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/health`);
    console.log(`ℹ️  System info: http://localhost:${PORT}/api/info`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('👋 Server closed.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT received. Shutting down...');
    server.close(() => process.exit(0));
});
