import { useProductContext } from '@/src/state/context/productContext';
import { useEffect, useState } from "react";
import styles from "./checkout.module.css";
import PaypalButton from "@/components/cart/paypalButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Checkout() {
  const { cart } = useProductContext();
  const [loading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("Cart data:", cart);

      if (cart.length > 0) {
        const allItemSubTotals = cart.map((item) => {
          const price = parseFloat(item.price);
          const itemSubtotal = item.discountPercent
            ? price * item.numItems * (1 - item.discountPercent / 100)
            : price * item.numItems;
          console.log(`Item subtotal for ${item.title}:`, itemSubtotal);
          return itemSubtotal;
        });

        const total = allItemSubTotals.reduce(
          (sum, current) => sum + current,
          0
        );

        const shipping = total > 0 ? 50 : 0;

        const finalAmount = total + shipping;

        setAmount(finalAmount.toFixed(2));
      } else {
        setAmount(0);
      }
    }
  }, [loading, cart]);

  if (user && !user.email_verified) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Head>
        <title>Checkout Page</title>
        <meta name="description" content= "Checkout Page" />
      </Head>
      <div className={styles.body}>
        <div className={styles.userBar}>
          <h3>Hello {user ? user.nickname : "Guest"}</h3>
        </div>
        <h3 className={styles.amount}>Your cart total is ${amount}</h3>
        <div className={styles.paypalButtonContainer}>
          {amount > 50 && <PaypalButton cart={cart} cartAmount={amount} />}
        </div>
        <div className={styles.tesInfo}>
          <h4>Test Card info:</h4>
          <h4>Card number: 4020023192466258</h4>
          <h4>Expiry date: 01/2028</h4>
          <h4>CVC code: 907</h4>
        </div>
      </div>
    </>
  );
}
