import './App.css'
import { useState, useEffect } from 'react';

import { SearchBar } from './components/SearchBar';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';

import { useDebounce } from './hooks/useDebounce';

import type { Product } from '@product-catalog/shared';

function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		if (!debouncedSearchTerm.trim()) {
			return;
		}

		fetch(`/search?term=${encodeURIComponent(debouncedSearchTerm)}`)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.products);
			});
	}, [debouncedSearchTerm]);

	useEffect(() => {
		if (!selectedProductId) {
			return;
		}

		fetch(`/products/${selectedProductId}`)
			.then((res) => res.json())
			.then((data) => {
				setSelectedProduct(data);
			});
	}, [selectedProductId]);

	const visibleProducts = debouncedSearchTerm.trim() ? products : [];

	return (
		<div className="app">
			<title>IKEA Product Catalog</title>
			<header className="app__header">
				<h1 className="app__title">Product Catalog</h1>
			</header>
			<main>
				{selectedProductId ? (
					selectedProduct ? (
						<ProductDetail
							product={selectedProduct}
							onBack={() => setSelectedProductId(null)}
						/>
					) : (
						<p>Loading…</p>
					)
				) : (
					<>
						<SearchBar value={searchTerm} onChange={setSearchTerm} />
						<ProductList products={visibleProducts} onSelect={setSelectedProductId} />
					</>
				)}
			</main>
		</div >
	);
}

export default App;