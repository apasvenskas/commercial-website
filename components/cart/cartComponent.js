import Link from "next/link";
import styles from "./cartComponent.module.css";
import Image from "next/image";

const insertDecimal = (num) => {
    return (num / 100).toFixed(2);
};

export default function CartComponent({ item }) {
  console.log("item in carComponent", item);

    const fullPrice = item.Price * 100;
    const price = item.discount ? insertDecimal(fullPrice - fullPrice * (item.discount / 100))
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
          <p> ${item.price} </p>
        </div>
        <div className={styles.total}>
          <p> ${item.price} </p>
        </div>
      </div>
    </>
  );
}
