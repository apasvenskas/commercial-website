import useGetPaintingDetails from '@/utils/useGetPainitngsDetails';
import styles from './productCard.module.css';
import Image from 'next/image';

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
        stock,
        
    } = useGetPaintingDetails(item);
    
    useGetPaintingDetails(item);
    

    const formattedImgSrc = mainImgSrc.startsWith('http') ? mainImgSrc : `/${mainImgSrc}`;
    console.log('image', formattedImgSrc)
    return(
        <div className={styles.card}>
        <Image src={formattedImgSrc} alt={title} width={100} height={100}/>
        <h2>{title}</h2>
        <p>Price: ${price}</p>
        {isPromoProd && <p>Promo Price: ${discountPrice}</p>}
        <p>Stock: {stock}</p>
        {isNewProduct && <span>New Arrival</span>}
        {/* Other UI elements */}
    </div>
    )
}