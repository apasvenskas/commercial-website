import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './searchBar.module.css';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      router.push(`/searchResults/searchResults?query=${query}`);
    }
  };

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search by title or type..."
      className={styles.searchInput}
    />
  );
}

