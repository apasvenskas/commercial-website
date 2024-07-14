import { useProductContext } from "@/state/context/productContext";
import { useEffect, useState } from "react";
import styles from './checkout.module.css';
import PaypalButton from "@/components/cart/paypalButton";

export default function Checkout() {
    const { cart } = useProductContext();
    const [loading, setIsLoading] = useState(true);
    const [amount, setAmount] = useState();

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!loading && cart.length) {
            const allItemSubTotals = cart.map(item => {
                return item.discountPercent 
                    ? item.price * (item.discountPercent / 100)
                    : item.price * item.numItem; // corrected variable name
            });

            const initialAmount = 0;
            const allSubtotals = allItemSubTotals.reduce(
                (previousAmount, currentAmount) => previousAmount + currentAmount,
                initialAmount
            );

            const total = Math.round((allSubtotals + Number.EPSILON) * 100) / 100;
            const shipping = total > 0 ? 50 : 0;
            const finalAmount = total + shipping;
            setAmount(finalAmount.toFixed(2));
        }
    }, [loading, cart]);

    return (
        <div>
            <div className={styles.userBar}>
                <h3>Hello user...</h3>
            </div>
            <h3>Your cart total is ${amount}</h3>
            <div className="paypal-button-container">
                {amount && amount > 50 && 
                    <PaypalButton cartAmount={amount} />
                }
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
