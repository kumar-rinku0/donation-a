"use client";

import { handleVerifyPayment } from "@/app/api/checkout";
import { Button } from "./ui/button";
import { useState } from "react";
import { BadgeCheck, BadgeX, BanknoteX, LoaderCircleIcon } from "lucide-react";

const razorpay_key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

declare global {
  interface Window {
    Razorpay: any;
  }
}
type RazorpayPaymentType = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};
type LocalPaymentType = {
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

const PaymentInit = ({ payment }: { payment: LocalPaymentType }) => {
  const [payText, setPayText] = useState(`Pay ₹${payment.amount}`);
  const [isProcessing, setIsProcessing] = useState(false);
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
    setIsProcessing(true);
    setPayText("Processing...");
    const options = {
      key: razorpay_key_id!, // Public key
      amount: payment.amount,
      currency: "INR",
      name: "Alpha Donate",
      order_id: payment.order_id,
      handler: async function (res: RazorpayPaymentType) {
        setPayText("Paid");
        await handleVerifyPayment(res);
        setIsProcessing(false);
      },
      prefill: {
        name: payment.name,
        email: payment.email,
        contact: Number(payment.phone),
      },
      modal: {
        ondismiss: function () {
          setPayText("Try Again!");
          console.log("Payment was cancelled by user.");
          setIsProcessing(false);
        },
        escape: true,
        confirm_close: false,
      },
      retry: {
        enabled: false,
      },
      timeout: 120,
      theme: {
        color: "#1c2938",
        backdrop_color: "#1c293888",
      },
      remember_customer: true,
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response: any) {
      console.log(response.error);
    });
    rzp.open();
  };
  return (
    <div className="h-screen w-full flex flex-col gap-8 justify-center items-center">
      {payText === "Paid" && (
        <div className="flex flex-col items-center gap-2">
          <BadgeCheck size={48} color="green" />
          <h3>Payment Captured</h3>
        </div>
      )}
      {payText === "Try Again!" && (
        <div className="flex flex-col items-center gap-2">
          <BadgeX size={48} color="red" />
          <h3>Payment Failed</h3>
        </div>
      )}
      <Button
        id="paymentBTN"
        variant={"default"}
        onClick={handlePay}
        disabled={isProcessing}
      >
        {/* Pay ₹{payment.amount} */}
        <span>
          {payText === "Processing..." && (
            <LoaderCircleIcon className="animate-spin" />
          )}
        </span>
        {payText}
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
