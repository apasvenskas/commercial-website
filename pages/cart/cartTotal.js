import styles from "./cartTotal.module.css";

export default function CartTotal() {
  return (
    <section className={styles.section}>
      <div className={styles.cartWrapper}>
        <div className={styles.CardWrapper}>
          <div className={styles.spacing}>
            <div className={styles.subTotal}>
              <p>Subtotal:</p>
              <p>$10000</p>
            </div>
            <div className={styles.shipping}>
              <p>Shipping Fee:</p>
              <p>$100</p>
            </div>
            <div className={styles.total}>
              <h3 className={styles.h3}>Order Total: </h3>
              <h3 className={styles.h3}>$1100</h3>
            </div>
          </div>
        </div>
        <div className={styles.checkout}>
          <div className={styles.btn}>
            <button className={styles.button}>Login To Proceed</button>
          </div>
        </div>
      </div>
    </section>
  );
}
