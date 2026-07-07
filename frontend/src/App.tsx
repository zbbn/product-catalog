import './App.css'
import { useState } from 'react';
import { SearchBar } from './components/SearchBar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="app">
      <title>IKEA Product Catalog</title>
      <header className="app__header">
        <h1 className="app__title">Product Catalog</h1>
        <p className="app__subtitle">Search by product name.</p>
      </header>
      <main>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <p className="state-message">This is something</p>
      </main>
    </div >
  );
}

export default App;


