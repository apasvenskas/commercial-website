import React from 'react';
import { useProductContext } from "../../state/context/productContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from 'react';
import stockManager from '@/utils/stockManager';

const PaypalButton = ({cart, cartAmount }) => {
    const { clearCart } = useProductContext();
    const [updateStock, setUpdateStock] = useState(false);

    useEffect(() => {
        if (updateStock) {
            stockManager(cart).then(() => {
                // Clear the cart after stock has been updated
                clearCart();
            }).catch((error) => {
                console.error("Error updating stock: ", error);
            }).finally(() => {
                setUpdateStock(false); // Reset the state
            });
        }
        // eslint-disable-next-line
    }, [updateStock]);

    const handleCreateOrder = (data, actions) => {
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
    };

    const handleApprove = (data, actions) => {
        console.log("Order approved:", data);
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            console.log("Transaction details:", details);
            alert(`Transaction completed by ${name}`);
            setUpdateStock(true); // Trigger the useEffect to update stock
        });
    };

    const handleError = (err) => {
        console.error("PayPal Button Error:", err);
    };

    return (
        <PayPalScriptProvider
            options={{
                "client-id": process.env.NEXT_PUBLIC_REACT_APP_PAYPAL_CLIENT_ID,
            }}
        >
            <PayPalButtons
                style={{ color: "blue" }}
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                onError={handleError}
            />
        </PayPalScriptProvider>
    );
};

export default PaypalButton;

