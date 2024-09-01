import Link from "next/link";
import Image from "next/image";
import styles from "./navigation.module.css";
import { useEffect, useState } from "react";
import { useProductContext } from "@/src/state/context/productContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import SearchBar from "../searchBar/searchBar";

export default function Navigation({allPaintings}) {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { cart } = useProductContext();
  const [filteredPaintings, setFilteredPaintings] = useState(allPaintings);

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
    (previuosAmount, currentAmount) => previuosAmount + currentAmount,
    initialAmount
  );

  const handleSearch = (input) => {
    console.log('handleSearch input:', input);

    let query = '';
    if (typeof input === 'string') {
      query = input;
    } else if (Array.isArray(input) && input.length > 0 && typeof input[0] === 'object') {
      // If input is an array of objects, we'll use the first object's properties
      const firstItem = input[0];
      query = firstItem.title || firstItem.artist || '';
      console.log('Using first item for search:', query);
    } else {
      console.error('Unexpected search input:', input);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = allPaintings.filter(painting => {
      return (
        (painting.title && painting.title.toLowerCase().includes(lowercaseQuery)) ||
        (painting.subtitle && painting.subtitle.toLowerCase().includes(lowercaseQuery)) ||
        (painting.artist && painting.artist.toLowerCase().includes(lowercaseQuery))
      );
    });
    setFilteredPaintings(filtered);
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

      <div>
        <SearchBar onSearch={handleSearch} allPaintings={allPaintings} />
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
