import { randomUUID } from 'crypto';
import { mockProducts } from './mockProducts';
import { NewProduct, Product } from '../types';
import { damerauLevenshtein } from '../search/damerauLevenshtein';

/**
 * Manages the product data in memory, adds mockproducts on startup
 */

class ProductStorage {
    private products: Product[] = [...mockProducts];

    getAll(page?: number, limit?: number): Product[] {
        if (page === undefined || limit === undefined) {
            return [...this.products];
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

    /**
     * Searches for product by name using the Damerau-Levenshtein distance algorithm and returns 
     * a list of products within a certain distance threshold (a third of the query length and at least 1 to allow for shorter search terms)
    */

    search(term: string): Product[] {
        const query = term.trim().toLowerCase();
        const maxDist = Math.max(1, Math.floor(query.length / 3));

        return this.products
            .map((product) => {
                const words = product.name.toLowerCase().split(' ');
                const dist = Math.min(...words.map((w) => damerauLevenshtein(query, w)));
                return { product, dist };
            })
            .filter((p) => p.dist <= maxDist)
            .sort((a, b) => a.dist - b.dist)
            .map((p) => p.product);
    }
}

export const productStorage = new ProductStorage();