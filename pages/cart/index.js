import TheBar from "@/components/product/theBar";
import styles from "./index.module.css"
import { useProductContext } from "@/state/context/productcontext";

export default function Cart(){
    const { testID } = useProductContext();
    console.log("product id Cart page", testID)
    return (
        <div className={styles.theBarContainer}>
            <TheBar className={styles.theBar} title="Cart Page"/>
            {testID && <h3>Item with ID {testID} is in cart</h3>}
        </div>
    )
}