import type { Product } from '@product-catalog/shared';

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
                <li key={product.id} className="product-list__item">
                    <img
                        className="product-list__image"
                        src={product.imageUrl}
                        alt={product.name}
                    />
                    <div className="product-list__details">
                        <h3 className="product-list__name">{product.name}</h3>
                        <p className="product-list__category">{product.category}</p>
                        <p className="product-list__description">{product.description}</p>
                        <p className="product-list__price">{product.price.toFixed(2)} kr</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}