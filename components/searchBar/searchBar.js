import { useState } from 'react';
import styles from "./searchBar.module.css"

export default function SearchBar({ onSearch, allPaintings }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    
    const filtered = allPaintings.filter(painting => 
      painting.title.toLowerCase().includes(value) ||
      painting.subtitle.toLowerCase().includes(value)
    );
    
    onSearch(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const filtered = allPaintings.filter(painting =>
        painting.title.toLowerCase().includes(query) ||
        painting.subtitle.toLowerCase().includes(query)
      );
      
      onSearch(filtered);
    }
  };


  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      onKeyDown={handleKeyDown}
      placeholder="Search by title or type..."
      className={styles.searchInput}
    />
  );
}
