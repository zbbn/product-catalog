import { Router, Request, Response } from 'express';
import { productStore } from '../data/productStorage';

export const productsRouter = Router();

/**
 * Posts a new product to productStorage, validates the type for each field
 */

productsRouter.post('/products', (req: Request, res: Response) => {
    const body = req.body ?? {};

    if (!body.name || typeof body.name !== 'string') {
        return res.status(400).json({ error: 'name is required' });
    }
    if (!body.category || typeof body.category !== 'string') {
        return res.status(400).json({ error: 'category is required' });
    }
    if (!body.description || typeof body.description !== 'string') {
        return res.status(400).json({ error: 'description is required' });
    }
    if (typeof body.price !== 'number' || body.price < 0) {
        return res.status(400).json({ error: 'price must be a positive number' });
    }
    if (typeof body.imageUrl !== 'string' || !body.imageUrl) {
        return res.status(400).json({ error: 'imageUrl is required' });
    }

    const created = productStore.add({
        name: body.name,
        category: body.category,
        description: body.description,
        price: body.price,
        imageUrl: body.imageUrl,
    });

    res.status(201).json(created);
});

/**
* Gets all products from the productStorage
*/

productsRouter.get('/products', (_req: Request, res: Response) => {
    return res.json(productStore.getAll());
});

/**
 * Gets one product by its ID from the productStorage
 */

productsRouter.get('/products/:id', (req: Request, res: Response) => {
    const product = productStore.getById(req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
    }
    return res.json(product);
});