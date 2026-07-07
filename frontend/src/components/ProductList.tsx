import type { Product } from '@product-catalog/shared';
import { ProductCard } from './ProductCard';

import './ProductList.css';

interface ProductListProps {
    products: Product[];
}

export function ProductList({ products }: ProductListProps) {
    if (products.length === 0) {
        return <p className="product-list__empty">No products found.</p>;
    }

    return (
        <ul className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </ul>
    );
}