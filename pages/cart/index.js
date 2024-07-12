import TheBar from "@/components/product/theBar";
import styles from "./index.module.css";
import { useProductContext } from "../../state/context/productContext";
import CartComponent from "@/components/cart/cartComponent";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import CartTotal from "../../components/cart/cartTotal";

export default function AddToCart() {
  const { cart: initialCart, clearCart } = useProductContext();
  const [cart, setCart] = useState([]);

  // Sync cart state with context on client-side
  useEffect(() => {
    setCart(initialCart);
  }, [initialCart]);

  // console.log("product data Cart page", cart);

  const { total, shipping } = useMemo(() => {
    let shipping = 50;
    const allSubtotals = cart.reduce((total, item) => {
      const price = parseFloat(item.price);
      const discountedPrice = item.discount ? price * (1 - item.discount / 100) : price;
      return total + discountedPrice;
    }, 0);

    const total = Math.round((allSubtotals + Number.EPSILON) * 100) / 100;
    shipping = total > 0 ? 50 : 0;

    // console.log('total', total);
    return { total, shipping };
  }, [cart]);

  return (
    <>
      <div className={styles.theBarContainer}>
        <TheBar className={styles.theBar} title="Cart Page" />
      </div>
      <div className={styles.header}>
        <h2>Paintings In The Cart</h2>
      </div>
      <div className={styles.cartInfoSection}>
        <div className={styles.cartInfo}>
          <div className={styles.infoSection}>
            <div className={styles.columnTitle}>
              <h4 className={styles.title}>Item Title</h4>
              <h4 className={styles.price}>Price</h4>
              <h4 className={styles.total}>Subtotal</h4>
            </div>
          </div>
        </div>
        <div className={styles.fechData}>
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id}>
                <CartComponent item={item} />
              </div>
            ))
          ) : (
            <div className={styles.emptyCart}>
              <h2>The Cart is Empty</h2>
            </div>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.btn}>
          <button className={styles.homeLink}>
            <Link href="/">Continue Shopping</Link>
          </button>
        </div>
        <div className={styles.total}>
          <CartTotal total={total} shipping={shipping}/>
        </div>
        <div className={styles.btn}>
          <button className={styles.clearCart} onClick={clearCart}>
            Clear <br /> the Cart
          </button>
        </div>
      </div>
    </>
  );
}

