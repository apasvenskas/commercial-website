import { useProductContext } from "@/state/context/productContext";
import { useEffect, useState } from "react";
import styles from './checkout.module.css';
import PaypalButton from "@/components/cart/paypalButton";

export default function Checkout() {
    const { cart } = useProductContext();
    const [loading, setIsLoading] = useState(true);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            console.log("Cart data:", cart); // Log cart data

            if (cart.length > 0) {
                const allItemSubTotals = cart.map(item => {
                    const price = parseFloat(item.price); // Convert price to number
                    const itemSubtotal = item.discountPercent 
                        ? price * item.numItems * (1 - item.discountPercent / 100)
                        : price * item.numItems;
                    console.log(`Item subtotal for ${item.title}:`, itemSubtotal); // Log each item's subtotal
                    return itemSubtotal;
                });

                const total = allItemSubTotals.reduce((sum, current) => sum + current, 0);
                console.log("Total before shipping:", total); // Log total before adding shipping

                const shipping = total > 0 ? 50 : 0;
                console.log("Shipping cost:", shipping); // Log shipping cost

                const finalAmount = total + shipping;
                console.log("Final amount:", finalAmount); // Log final amount

                setAmount(finalAmount.toFixed(2));
            } else {
                setAmount(0);
            }
        }
    }, [loading, cart]);

    return (
        <div className={styles.body}>
            <div className={styles.userBar}>
                <h3>Hello user...</h3>
            </div>
            <h3 className={styles.amount}>Your cart total is ${amount}</h3>
            <div className={styles.paypalButtonContainer}>
                {amount > 50 && <PaypalButton cartAmount={amount} />}
            </div>
            <div className={styles.tesInfo}>
                <h4>Test Card info:</h4>
                <h4>Card number: 4020023192466258</h4>
                <h4>Expiry date: 01/2028</h4>
                <h4>CVC code: 907</h4>
            </div>
        </div>
    );
}


