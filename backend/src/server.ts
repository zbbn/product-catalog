import express from 'express';
import { productsRouter } from './routes/products';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'Product catalog API is running.', endpoints: ['/status', '/products', '/search'] });
});

app.use('/', productsRouter);

app.get('/status', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

app.use((req, res, _next) => {
    res.status(404).json({ error: 'Endpoint not found.' });
});

app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));