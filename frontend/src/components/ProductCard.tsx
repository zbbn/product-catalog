import type { Product } from '@product-catalog/shared';

import './Productcard.css';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <li className="product-card">
            <img
                className="product-card__image"
                src={product.imageUrl}
                alt={product.name}
            />
            <div className="product-card__details">
                <h3 className="product-card__name">{product.name}</h3>
                <p className="product-card__category">{product.category}</p>
                <p className="product-card__description">{product.description}</p>
                <p className="product-card__price">{product.price.toFixed(2)} kr</p>
            </div>
        </li>
    );
}