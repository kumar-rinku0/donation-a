"use client";

import { Button } from "./ui/button";

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
  const handlePay = async () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Public key
      amount: payment.amount,
      currency: "INR",
      name: "My Store",
      description: "Order Payment",
      order_id: payment.order_id,
      handler: function (response: any) {
        alert("Payment Successful: " + response.razorpay_payment_id);
        // ✅ Optionally call a backend API to verify and save payment
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
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
      <Button onClick={handlePay}>Pay ₹{payment.amount}</Button>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
};

export default PaymentInit;
