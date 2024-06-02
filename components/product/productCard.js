import useGetPaintingDetails from '@/utils/useGetPainitngsDetails';
import styles from './productCard.module.css';

export default function ProductCard({item}){

    const {
        isNewProduct,
        isPromoProd ,
        price,
        tempPrice,
        discount,
        discountPrice,
        imgSrc,
        mainImgSrc,
        id,
        title,
        stock
    } = useGetPaintingDetails(item);
    
    useGetPaintingDetails(item);
    console.log('discount price', discountPrice)
    return(
        <div className={styles.card}>
        <img src={imgSrc} alt={title} />
        <h2>{title}</h2>
        <p>Price: ${price}</p>
        {isPromoProd && <p>Promo Price: ${discountPrice}</p>}
        <p>Stock: {stock}</p>
        {isNewProduct && <span>New Arrival</span>}
        {/* Other UI elements */}
    </div>
    )
}