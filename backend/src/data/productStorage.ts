import { randomUUID } from 'crypto';
import { mockProducts } from './mockProducts';
import { NewProduct, Product } from '../types';

/**
 * ProductStore is responsible for managing the product data in memory. 
 * Used to retrieve all products, get a product by its ID, add a new product to the store and return the amount of products. 
 * The products are initialized with mock data from the mockProducts array.
 */

class ProductStorage {
    private products: Product[] = [...mockProducts];

    getAll(page?: number, limit?: number): Product[] {
        if (page === undefined || limit === undefined) {
            return this.products;
        }
        const start = (page - 1) * limit;
        return this.products.slice(start, start + limit);
    }

    getById(id: string): Product | undefined {
        return this.products.find((p) => p.id === id);
    }

    add(input: NewProduct): Product {
        const product: Product = { id: randomUUID(), ...input };
        this.products.push(product);
        return product;
    }

    count(): number {
        return this.products.length;
    }

}

export const productStorage = new ProductStorage();