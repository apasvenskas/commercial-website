import Link from "next/link";
import Image from "next/image";
import styles from "./navigation.module.css";
import { useEffect, useState } from "react";
import { useProductContext } from "@/src/state/context/productContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from 'next/router'; // Import Next.js router
import SearchBar from "../searchBar/searchBar";

export default function Navigation({ allPaintings }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { cart } = useProductContext();
  const [filteredPaintings, setFilteredPaintings] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log('allPaintings:', allPaintings);
  }, [allPaintings]);

  const allItemsFromCart = [];

  if (!loading) {
    cart.map((item) => {
      allItemsFromCart.push(item.numItems);
    });
  }

  const initialAmount = 0;
  const itemsInCart = allItemsFromCart.reduce(
    (previousAmount, currentAmount) => previousAmount + currentAmount,
    initialAmount
  );

  const handleSearch = (input) => {
    console.log('handleSearch input:', input);
    let lowercaseQuery = '';
    if(typeof input === 'string'){
      const lowercaseQuery = input.toLowerCase();
    } else {
      console.error("Input is not a string:", input)
    }
    const filtered = allPaintings.filter(painting =>
      (painting.title && painting.title.toLowerCase().includes(lowercaseQuery)) ||
      (painting.subtitle && painting.subtitle.toLowerCase().includes(lowercaseQuery)) ||
      (painting.type && painting.type.toLowerCase().includes(lowercaseQuery))
    );

    setFilteredPaintings(filtered);
    setShowResults(input.length > 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredPaintings.length > 0) {
      const firstResult = filteredPaintings[0];
      router.push(`/products/${firstResult.slug}`);
    }
  };

  return (
    <div className={styles.topHeader}>
      <div className={styles.name}>
        <Link href="/">
          <h1>
            Laisvieji <br /> Menininkai
          </h1>
        </Link>
      </div>

      <div className={styles.searchContainer}>
        {/* Using the existing SearchBar with keydown handler */}
        <SearchBar onSearch={handleSearch} allPaintings={allPaintings} onKeyDown={handleKeyDown} />
        {showResults && (
          <div className={styles.searchResults}>
            {filteredPaintings.length > 0 ? (
              filteredPaintings.map((painting) => (
                <Link href={`/products/${painting.slug}`} key={painting.id}>
                  <div className={styles.searchResultItem}>
                    {painting.images && painting.images[0] && (
                      <Image 
                        src={painting.images[0].url} 
                        alt={painting.title} 
                        width={50} 
                        height={50} 
                      />
                    )}
                    <div>
                      <p>{painting.title}</p>
                      <p>{painting.type}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>

      <nav className={styles.nav}>
        <ul className={styles.link}>
          <li>
            <Link href="/all-art">All Art</Link>
          </li>
        </ul>
        <ul className={styles.link}>
          <li>
            {user ? (
              <Link href="/user/logout">Logout</Link>
            ) : (
              <Link href="/user/login">Login</Link>
            )}
          </li>
        </ul>
        <ul className={styles.link}>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <div className={styles.cartWrapper}>
          <Link href="/cart">
            <div className={styles.fullCart}>
              <div className={styles.cart}>
                <Image src="/cart.png" height={25} width={25} alt="cart" />
                {itemsInCart > 0 && (
                  <div className={styles.itemsInCart}>
                    <Image
                      src="/orangeBox.png"
                      height={18}
                      width={18}
                      alt="orangeBox"
                      className={styles.orangeBox}
                    />
                    <div className={styles.numbers}>
                      <p>{itemsInCart}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}

