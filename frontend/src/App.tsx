import './App.css'
import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { useDebounce } from './hooks/useDebounce';

function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		console.log('debouncedSearchTerm changed to:', debouncedSearchTerm);
		if (!debouncedSearchTerm.trim()) return;

		console.log('firing fetch for:', debouncedSearchTerm);
		fetch(`/search?term=${encodeURIComponent(debouncedSearchTerm)}`)
			.then((res) => res.json())
	}, [debouncedSearchTerm]);

	return (
		<div className="app">
			<title>IKEA Product Catalog</title>
			<header className="app__header">
				<h1 className="app__title">Product Catalog</h1>
			</header>
			<main>
				<SearchBar value={searchTerm} onChange={setSearchTerm} />
			</main>
		</div >
	);
}

export default App;


