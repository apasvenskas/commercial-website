import TheBar from "@/components/product/theBar";
import styles from "./index.module.css";
import { useProductContext } from "../../state/context/productContext";

export default function AddToCart() {
  const { cart, addToCart } = useProductContext();
  console.log("product data Cart page", cart);

  return (
    <>
      <div className={styles.theBarContainer}>
        <TheBar className={styles.theBar} title="Cart Page" />
      </div>
      <div className={styles.cartItem}>
        {cart.length ? (
          <div className={styles.productInfo}>
            <h2>Cart Items</h2>
            <h3>{cart[0].title}</h3>
            <h3>{cart[0].stock}</h3>
          </div>
        ) : (
          <div>
            <h2>The Cart is Empty</h2>
          </div>
        )}
      </div>
    </>
  );
}
