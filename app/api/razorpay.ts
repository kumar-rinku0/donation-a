"use server";

import Razorpay from "razorpay";

const CLIENT_ID = process.env.RAZORPAY_KEY_ID;
const SECRET_KEY = process.env.RAZORPAY_SECRET_KEY;
console.log("Client ID:", CLIENT_ID);
console.log("Secret Key:", SECRET_KEY);

if (!CLIENT_ID || !SECRET_KEY) {
  throw new Error("Razorpay keys are not set in environment variables");
}

const client = new Razorpay({
  key_id: CLIENT_ID,
  key_secret: SECRET_KEY,
});

export const createOrder = async (amount: number) => {
  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `RCPT#${Date.now()}`,
  };
  const order = await client.orders.create(options);
  return order.id;
};
