import type { Product } from '@product-catalog/shared';
import './ProductDetail.css';

interface ProductDetailProps {
    product: Product;
    onBack: () => void;
}

/**
 * Full product page that shows all details and a back button to return to search
 */

export function ProductDetail({ product, onBack }: ProductDetailProps) {
    return (
        <div className="product-detail">
            <button className="product-detail__back" onClick={onBack}>
                ← Back to search
            </button>
            <div className="product-detail__content">
                <img
                    className="product-detail__image"
                    src={product.imageUrl}
                    alt={product.name}
                />
                <div className="product-detail__info">
                    <p className="product-detail__category">{product.category}</p>
                    <h2 className="product-detail__name">{product.name}</h2>
                    <p className="product-detail__price">{product.price.toFixed(2)} kr</p>
                    <p className="product-detail__description">{product.description}</p>
                </div>
            </div>
        </div>
    );
}