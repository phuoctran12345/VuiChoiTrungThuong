const request = require('supertest');
const app = require('./index');

describe('API Endpoints', () => {
    afterAll((done) => {
        done();
    });

    describe('GET /', () => {
        it('should return welcome message', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toContain('Docker Workshop');
        });

        it('should return timestamp', async () => {
            const res = await request(app).get('/');
            expect(res.body).toHaveProperty('timestamp');
        });
    });

    describe('GET /health', () => {
        it('should return 200 status', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toBe(200);
        });

        it('should return status ok', async () => {
            const res = await request(app).get('/health');
            expect(res.body.status).toBe('ok');
        });

        it('should return uptime', async () => {
            const res = await request(app).get('/health');
            expect(res.body).toHaveProperty('uptime');
            expect(typeof res.body.uptime).toBe('number');
        });

        it('should return timestamp', async () => {
            const res = await request(app).get('/health');
            expect(res.body).toHaveProperty('timestamp');
        });
    });

    describe('GET /api/info', () => {
        it('should return app info', async () => {
            const res = await request(app).get('/api/info');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('app');
            expect(res.body).toHaveProperty('version');
        });
    });

    describe('GET /api/students', () => {
        it('should return students list', async () => {
            const res = await request(app).get('/api/students');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('count');
            expect(res.body).toHaveProperty('data');
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe('GET /api/students/:id', () => {
        it('should return a student by id', async () => {
            const res = await request(app).get('/api/students/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
            expect(res.body).toHaveProperty('name');
        });

        it('should return 404 for non-existent student', async () => {
            const res = await request(app).get('/api/students/999');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error');
        });
    });
});
