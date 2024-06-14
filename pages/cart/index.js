import TheBar from "@/components/product/theBar";
import styles from "./index.module.css"
import { useProductContext } from "../../state/context/productContext";

export default function AddToCart(){

    const { cart, addToCart } = useProductContext();
    console.log("product data Cart page", cart);

    return (
        <div className={styles.theBarContainer}>
            <TheBar className={styles.theBar} title="Cart Page"/>
            {/* {testID && <h3>Item with ID {data} is in cart</h3>} */}
        </div>
    )
}