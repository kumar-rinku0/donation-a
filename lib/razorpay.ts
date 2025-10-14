"use server";

import Razorpay from "razorpay";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { createHmac } from "crypto";

const CLIENT_ID = process.env.RAZORPAY_KEY_ID!;
const SECRET_KEY = process.env.RAZORPAY_SECRET_KEY!;

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

export async function handleSubmitPayment(formData: FormData) {
  const data = Object.fromEntries(formData);
  const amount = data.amount;
  const name = data.name;
  const email = data.email;
  const phone = data.phone;
  const message = data.message;
  const order_id = await createOrder(Number(amount));
  await prisma.payment.create({
    data: {
      amount: Number(amount),
      name: String(name) || "anonymous",
      email: String(email) || "anonymous@example.com",
      phone: BigInt(String(phone)),
      date: new Date(),
      message: String(message) || "No message",
      order_id: order_id,
      status: "created",
    },
  });
  redirect(`/donate/${order_id}`);
}

export type RazorpayPaymentType = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

export async function handleVerifyPayment(payment: RazorpayPaymentType) {
  const payment_details = await prisma.payment.findUnique({
    where: { order_id: payment.razorpay_order_id },
  });
  if (!payment_details) {
    console.log("payment details not found.");
    return;
  }
  const generated_signature = createHmac("sha256", SECRET_KEY)
    .update(payment_details.order_id + "|" + payment.razorpay_payment_id)
    .digest("hex");
  if (
    payment_details.order_id === payment.razorpay_order_id &&
    generated_signature === payment.razorpay_signature
  ) {
    await prisma.payment.update({
      where: { order_id: payment_details.order_id },
      data: { status: "captured" },
    });
  } else {
    await prisma.payment.update({
      where: { order_id: payment_details.order_id },
      data: { status: "failed" },
    });
  }
  redirect(`/donate/${payment_details.order_id}`);
}
