import { useProductContext } from "@/state/context/productContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";

export default function PaypalButton({ cartAmount }) {
    const { clearCart } = useProductContext();

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_REACT_APP_PAYPAL_CLIENT_ID) {
            console.error("PayPal Client ID is not set in environment variables.");
        } else {
            console.log("PayPal Client ID is set:", process.env.NEXT_PUBLIC_REACT_APP_PAYPAL_CLIENT_ID);
        }
    }, []);

    return (
        <PayPalScriptProvider
            options={{
                "client-id": process.env.NEXT_PUBLIC_REACT_APP_PAYPAL_CLIENT_ID,
            }}
        >
            <div>
                <PayPalButtons
                    style={{
                        color: "blue",
                    }}
                    createOrder={(data, actions) => {
                        console.log("Creating order with amount:", cartAmount);
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: cartAmount,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        console.log("Order approved:", data);
                        return actions.order.capture().then((details) => {
                            const name = details.payer.name.given_name;
                            alert(`Transaction completed by ${name}`);
                            clearCart();
                        });
                    }}
                    onError={(err) => {
                        console.error("PayPal Button Error:", err);
                    }}
                />
            </div>
        </PayPalScriptProvider>
    );
}

