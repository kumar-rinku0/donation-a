"use client";

import { handleVerifyPayment } from "@/app/api/checkout";
import { Button } from "./ui/button";

const razorpay_key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentInit = ({
  payment,
}: {
  payment: {
    order_id: string;
    id: number;
    name: string;
    email: string;
    phone: bigint;
    amount: number;
    date: Date;
    status: string;
    message: string;
  };
}) => {
  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }
  };
  const handlePay = async () => {
    await displayRazorpay();
    const options = {
      key: razorpay_key_id!, // Public key
      amount: payment.amount,
      currency: "INR",
      name: "My Store",
      description: "Order Payment",
      order_id: payment.order_id,
      handler: handleVerifyPayment,
      prefill: {
        name: payment.name,
        email: payment.email,
        contact: Number(payment.phone),
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Button id="paymentBTN" onClick={handlePay}>
        Pay ₹{payment.amount}
      </Button>
    </div>
  );
};

export default PaymentInit;

const loadScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    const paymentBtn = document.querySelector("#paymentBTN");
    if (paymentBtn) {
      paymentBtn.appendChild(script);
    }
  });
};
