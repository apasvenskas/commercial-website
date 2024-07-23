import Link from "next/link";
import Image from "next/image";
import styles from "./navigation.module.css";
import { useEffect, useState } from "react";
import { useProductContext } from "@/state/context/productContext";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Navigation() {
  const {user} = useUser();
  // console.log("user", user)
  
  // logic for cart items showing up in the cart
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const { cart } = useProductContext();

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

  // console.log("cart items nav", itemsInCart);

  return (
    <div className={styles.topHeader}>
      <div className={styles.name}>
        <Link href="/">
          <h1>
            Laisvieji <br /> Menininkai
          </h1>
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.link}>
          <li>
            <Link href={`/products/artist`}>Artist</Link>
          </li>
        </ul>
        {/* <ul className={styles.link}>
          <li>
            <Link href="/">New Art</Link>
          </li>
        </ul> */}
        <ul className={styles.link}>
          <li>
            <Link href="/all-art">All Art</Link>
          </li>
        </ul>
        <ul className={styles.link}>
          <li>
           {user ? (<Link href="/user/logout">Logout</Link>) : (
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
