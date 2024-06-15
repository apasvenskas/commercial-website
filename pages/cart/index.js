import TheBar from "@/components/product/theBar";
import styles from "./index.module.css";
import { useProductContext } from "../../state/context/productContext";
import CartComponent from "@/components/cart/cartComponent";

export default function AddToCart() {
  const { cart, addToCart } = useProductContext();
  console.log("product data Cart page", cart);

  return (
    <>
      <div className={styles.theBarContainer}>
        <TheBar className={styles.theBar} title="Cart Page" />
      </div>
      <div>
        <h2>Paintings In The Cart</h2>
        <div className={styles.cartInfoSection}>
          <div className={styles.cartInfo}>
            <div className={styles.infoSection}>
              <div className={styles.columnTitle}>
                <h4 className={styles.title}></h4>
                <h4 className={styles.price}></h4>
                <h4 className={styles.total}></h4>
              </div>
            </div>
          </div>
          {cart.length ? (
            cart.map(item => {
              return (
                <div key={item.id}>
                  <CartComponent />
                </div>
              )
            })
          ) : (<div>
            <h2>The Cart is Empty</h2>
          </div>)}
        </div>
      </div>
    </>
  );
}
