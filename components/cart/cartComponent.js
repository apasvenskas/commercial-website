import Link from "next/link";
import styles from "./cartComponent.module.css";
import Image from "next/image";
import { useProductContext } from "@/state/context/productContext";

const insertDecimal = (num) => {
    return (num / 100).toFixed(2);
};

export default function CartComponent({ item }) {
  
    const {removeItem} = useProductContext();

    const fullPrice = item.price * 100;
    const price = item.discount ? insertDecimal(fullPrice * (item.discount / 100))
    : insertDecimal(fullPrice); 

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <p className={styles.pTitle}> {item.title} </p>
          <Link href={`/cart/${item.id}`}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.mainImgSrc}
                height={80}
                width={80}
                alt="finalImage"
              />
            </div>
          </Link>
        </div>
        <div className={styles.price}>
          <p> ${price} </p>
        </div>
        <div className={styles.total}>
          {/* <p> ${insertDecimal(fullPrice * (item.discount / 100))} </p> */}
          <p> ${price} </p>
          <span className={styles.clearButton} onClick={() => removeItem(item.id)}>
                <Image
                    src="/delete.png"
                    height={33}
                    width={33}
                    alt="deleteIcon"
                />
            </span>
        </div>
      </div>
    </>
  );
}
