import useGetPaintingDetails from "@/utils/useGetPainitngsDetails";
import styles from "./productCard.module.css";
import Image from "next/image";
import { useState } from "react";
import { useProductContext } from '../../state/context/productContext';


export default function ProductCard({ item }) {
  const { banner, setBanner } = useState(false);
  const { addToCart } = useProductContext();

  // console.log('Item in ProductCard:', item);

  const {
    isNewProduct,
    isPromoProd,
    price,
    tempPrice,
    discountPercent,
    discountPrice,
    imgSrc,
    mainImgSrc,
    id,
    title,
  } = useGetPaintingDetails(item);

  const formattedImgSrc = mainImgSrc.startsWith("http")
    ? mainImgSrc
    : `/${mainImgSrc}`;
    
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <Image src={formattedImgSrc} alt={title} width={200} height={200} />
        <h2>{title}</h2>
        {isPromoProd ? (
          <p>Promo Price: ${discountPrice}</p>
        ) : (
          <p>Price: ${price}</p>
        )}
        {isNewProduct && <span>New Arrival</span>}
        <div className={styles.button}>
          <div>Click for more details</div>
        </div>
      </div>
    </div>
  );
}

