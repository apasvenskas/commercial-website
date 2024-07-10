import TheBar from "@/components/product/theBar";
import styles from "./index.module.css";
import { useProductContext } from "../../state/context/productContext";
import CartComponent from "@/components/cart/cartComponent";
import { useState, useEffect } from "react";
import Link from "next/link";
import CartTotal from "../../components/cart/cartTotal";

export default function AddToCart() {
  const { cart: initialCart, clearCart } = useProductContext();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(initialCart);
  }, [initialCart]);

  useEffect(() => {
    console.log("Cart items:", cart);
  }, [cart]);

  const total = cart.reduce((acc, item) => {
    const price = parseFloat(item.price);
    const discountPercent = parseFloat(item.discountPercent) || 0;
    const sanitizedDiscountPercent = Math.min(Math.max(discountPercent, 0), 100);

    console.log(`Item price: ${price}, Discount Percent: ${sanitizedDiscountPercent}`);

    const discountedPrice = price * (1 - sanitizedDiscountPercent / 100);
    return acc + discountedPrice;
  }, 0);

  const roundedTotal = Math.round((total + Number.EPSILON) * 100) / 100;
  const shipping = roundedTotal > 0 ? 50 : 0;

  console.log('Total:', roundedTotal, 'Shipping:', shipping);

  return (
    <>
      <div className={styles.theBarContainer}>
        <TheBar className={styles.theBar} title="Cart Page" titleClassName={styles.cartPageTitle} />
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
          <CartTotal total={roundedTotal} shipping={shipping} />
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

