import TheBar from "@/components/product/theBar";
import styles from "./index.module.css"

export default function Cart(){
    return (
        <div className={styles.theBarContainer}>
            <TheBar className={styles.theBar} title="Cart Page"/>
        </div>
    )
}