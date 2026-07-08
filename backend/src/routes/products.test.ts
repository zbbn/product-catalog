import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { productsRouter } from '../routes/products';

const app = express();
app.use(express.json());
app.use('/', productsRouter);

describe('POST /products', () => {
    it('rejects a request missing name', async () => {
        const res = await request(app).post('/products').send({
            category: 'Test', description: 'x', price: 10, imageUrl: 'https://x.test/i.png',
        });
        expect(res.status).toBe(400);
    });

    it('rejects a non-positive price', async () => {
        const res = await request(app).post('/products').send({
            name: 'Test', category: 'Test', description: 'x', price: 0, imageUrl: 'https://x.test/i.png',
        });
        expect(res.status).toBe(400);
    });

    it('creates a product with valid data and returns 201', async () => {
        const res = await request(app).post('/products').send({
            name: 'Test Lamp', category: 'Lighting', description: 'A test lamp',
            price: 199, imageUrl: 'https://placehold.co/300x300?text=Lamp',
        });
        expect(res.status).toBe(201);
        expect(res.body.name).toBe('Test Lamp');
        expect(res.body.id).toBeDefined();
    });
});

describe('GET /products', () => {
    it('returns a paginated list with metadata', async () => {
        const res = await request(app).get('/products?page=1&limit=5');
        expect(res.status).toBe(200);
        expect(res.body.products.length).toBeLessThanOrEqual(5);
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('totalPages');
    });

    it('rejects an invalid page number', async () => {
        const res = await request(app).get('/products?page=0');
        expect(res.status).toBe(400);
    });
});

describe('GET /products/:id', () => {
    it('returns 404 for an id that does not exist', async () => {
        const res = await request(app).get('/products/does-not-exist');
        expect(res.status).toBe(404);
    });

    it('returns the product for a valid id', async () => {
        const created = await request(app).post('/products').send({
            name: 'Findable Chair', category: 'Office', description: 'x',
            price: 50, imageUrl: 'https://x.test/i.png',
        });
        const res = await request(app).get(`/products/${created.body.id}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Findable Chair');
    });
});

describe('GET /search', () => {
    it('returns 400 when term is missing', async () => {
        const res = await request(app).get('/search');
        expect(res.status).toBe(400);
    });

    it('finds a product despite a typo in the search term', async () => {
        const res = await request(app).get('/search?term=billi');
        expect(res.status).toBe(200);
        expect(res.body.products.some((p: { name: string }) => p.name === 'Billy')).toBe(true);
    });

    it('returns an empty list for a term with no close matches', async () => {
        const res = await request(app).get('/search?term=zzzznonsense');
        expect(res.status).toBe(200);
        expect(res.body.products).toHaveLength(0);
    });
});
