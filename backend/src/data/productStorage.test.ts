import { describe, it, expect, beforeEach } from 'vitest';
import { ProductStorage } from '../data/productStorage';

describe('ProductStorage', () => {
    let storage: ProductStorage;

    // Fresh instance per test so mock data and any added products
    // from one test never leak into another.
    beforeEach(() => {
        storage = new ProductStorage();
    });

    it('seeds itself with mock data on construction', () => {
        expect(storage.count()).toBeGreaterThan(0);
    });

    describe('add', () => {
        it('adds a product and assigns it a unique id', () => {
            const before = storage.count();
            const product = storage.add({
                name: 'Test Chair',
                category: 'Office',
                description: 'A test chair',
                price: 100,
                imageUrl: 'https://placehold.co/300x300?text=Test',
            });

            expect(product.id).toBeDefined();
            expect(storage.count()).toBe(before + 1);
            expect(storage.getById(product.id)).toEqual(product);
        });

        it('assigns different ids to two products added back to back', () => {
            const first = storage.add({
                name: 'A', category: 'Test', description: 'x', price: 1, imageUrl: 'https://x.test/a.png',
            });
            const second = storage.add({
                name: 'B', category: 'Test', description: 'x', price: 1, imageUrl: 'https://x.test/b.png',
            });
            expect(first.id).not.toBe(second.id);
        });
    });

    describe('getById', () => {
        it('returns undefined for an id that does not exist', () => {
            expect(storage.getById('does-not-exist')).toBeUndefined();
        });
    });

    describe('getAll', () => {
        it('returns every product when no pagination args are given', () => {
            expect(storage.getAll()).toHaveLength(storage.count());
        });

        it('paginates results according to page and limit', () => {
            const page1 = storage.getAll(1, 5);
            expect(page1.length).toBeLessThanOrEqual(5);
        });

        it('returns different products on different pages', () => {
            const page1 = storage.getAll(1, 5);
            const page2 = storage.getAll(2, 5);
            expect(page1[0]?.id).not.toBe(page2[0]?.id);
        });
    });

    describe('search', () => {
        it('finds an exact match by name', () => {
            const results = storage.search('billy');
            expect(results.some((p) => p.name === 'Billy')).toBe(true);
        });

        it('finds a product despite a typo (fuzzy match)', () => {
            const results = storage.search('billi');
            expect(results.some((p) => p.name === 'Billy')).toBe(true);
        });

        it('is case-insensitive', () => {
            const results = storage.search('BILLY');
            expect(results.some((p) => p.name === 'Billy')).toBe(true);
        });

        it('excludes products beyond the distance threshold', () => {
            const results = storage.search('xyz987nonsense');
            expect(results).toHaveLength(0);
        });

        it('orders closer matches before farther ones', () => {
            // 'kalax' is a 1-edit typo of 'Kallax'; make sure the exact-ish
            // match is not buried behind a coincidentally-included farther one.
            const results = storage.search('kalax');
            expect(results[0]?.name).toBe('Kallax');
        });
    });
});
