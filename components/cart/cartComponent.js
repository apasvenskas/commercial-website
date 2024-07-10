import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { useProductContext } from "@/state/context/productContext";
import styles from "./cartComponent.module.css";

const formatPrice = (price) => {
  return (parseFloat(price)).toFixed(2);
};

export default function CartComponent({ item }) {
  const { removeItem } = useProductContext();
  const { title, price, discountPercent, mainImgSrc, id } = item;

  console.log('Item received in CartComponent:', item);

  const fullPrice = parseFloat(price);
  const discount = parseFloat(discountPercent) || 0;
  const sanitizedDiscount = Math.min(Math.max(discount, 0), 100);

  console.log('Discount Percent:', sanitizedDiscount);

  const discountedPrice = fullPrice * (1 - sanitizedDiscount / 100);
  const finalPrice = formatPrice(discountedPrice);

  console.log('Full Price:', fullPrice);
  console.log('Discounted Price:', discountedPrice);
  console.log('Final Price:', finalPrice);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p className={styles.pTitle}>{title}</p>
        <Link href={`/cart/${id}`}>
          <div className={styles.imageWrapper}>
            <Image
              src={mainImgSrc}
              height={80}
              width={80}
              alt={title}
            />
          </div>
        </Link>
      </div>
      <div className={styles.price}>
        {sanitizedDiscount > 0 ? (
          <>
            <p className={styles.originalPrice}>${formatPrice(fullPrice)}</p>
            <p className={styles.discountedPrice}>${finalPrice}</p>
            <p className={styles.discount}>({sanitizedDiscount}% off)</p>
          </>
        ) : (
          <p>${finalPrice}</p>
        )}
      </div>
      <div className={styles.total}>
        <p>${finalPrice}</p>
        <button className={styles.clearButton} onClick={() => removeItem(id)}>
          <Image
            src="/delete.png"
            height={33}
            width={33}
            alt="Remove item"
          />
        </button>
      </div>
    </div>
  );
}
