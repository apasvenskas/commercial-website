import styles from "./cartTotal.module.css";

function insertDecimal(num){
  return (num / 100).toFixed(2);
}

export default function CartTotal({ total, shipping }) {

  const finalPrice = insertDecimal(total * 100 + shipping * 100);

  return (
    <section className={styles.section}>
      <div className={styles.cartWrapper}>
        <div className={styles.CardWrapper}>
          <div className={styles.spacing}>
            <div className={styles.subTotal}>
              <p>Subtotal:</p>
              <p>${total}</p>
            </div>
            <div className={styles.shipping}>
              <p>Shipping Fee:</p>
              <p>${shipping}</p>
            </div>
            <div className={styles.total}>
              <h3 className={styles.h3}>Order Total: </h3>
              <h3 className={styles.h3}>${finalPrice}</h3>
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
