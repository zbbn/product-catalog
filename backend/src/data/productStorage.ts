import { randomUUID } from 'crypto';
import { mockProducts } from './mockProducts';
import { NewProduct, Product } from '../types';

/**
 * ProductStore is responsible for managing the product data in memory. 
 * Used to retrieve all products, get a product by its ID, and add a new product to the store. 
 * The products are initialized with mock data from the mockProducts array.
 */

class ProductStorage {
    private products: Product[] = [...mockProducts];

    getAll(): Product[] {
        return this.products;
    }

    getById(id: string): Product | undefined {
        return this.products.find((p) => p.id === id);
    }

    add(input: NewProduct): Product {
        const product: Product = { id: randomUUID(), ...input };
        this.products.push(product);
        return product;
    }
}

export const productStore = new ProductStorage();