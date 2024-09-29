import Link from "next/link";
import Image from "next/image";
import styles from "./navigation.module.css";
import { useEffect, useState } from "react";
import { useProductContext } from "@/src/state/context/productContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from 'next/router'; // Import Next.js router
import SearchBar from "../searchBar/searchBar"; // SearchBar now redirects

export default function Navigation({ allPaintings }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { cart } = useProductContext();
  const router = useRouter(); // Initialize router

  useEffect(() => {
    setLoading(false);
  }, []);

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
        {/* Updated SearchBar now redirects to the dynamic searchResults page */}
        <SearchBar />
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


