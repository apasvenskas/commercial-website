import useGetPaintingDetails from "@/utils/useGetPainitngsDetails";
import styles from "./productCard.module.css";
import Image from "next/image";
import { useState } from "react";
import { useProductContext } from "@/state/context/productcontext";

export default function ProductCard({ item }) {

  const { banner, setBanner } = useState(false);
  const { testID, getProducts } = useProductContext();
  console.log("ID from productCard", testID)

  const {
    isNewProduct,
    isPromoProd,
    price,
    tempPrice,
    discount,
    discountPrice,
    imgSrc,
    mainImgSrc,
    id,
    title,
  } = useGetPaintingDetails(item);

  useGetPaintingDetails(item);

  const formattedImgSrc = mainImgSrc.startsWith("http")
    ? mainImgSrc
    : `/${mainImgSrc}`;
  // console.log("image", formattedImgSrc);
  return (
    <div className={styles.ardContainer}>
      <div className={styles.card}>
        <Image src={formattedImgSrc} alt={title} width={200} height={200} />
        <h2>{title}</h2>
        <p>Price: ${price}</p>
        {isPromoProd && <p>Promo Price: ${discountPrice}</p>}
        {isNewProduct && <span>New Arrival</span>}
        {/* Other UI elements */}
        <div className={styles.button}>
        <button onClick={() => getProducts(id)}>
          {/* {stock > 0 ? 'Add to Cart' : 'Out of Stock'} */}
          Add to cart
        </button>
      </div>
      </div>
     
    </div>
  );
}
