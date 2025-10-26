"use server";

import Razorpay from "razorpay";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { createHmac } from "crypto";

const CLIENT_ID = process.env.RAZORPAY_KEY_ID!;
const SECRET_KEY = process.env.RAZORPAY_KEY_SECRET!;

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
  const amount = Math.abs(Number(data.amount));
  const name = data.name;
  const email = data.email;
  const phone = data.phone;
  const message = data.message;
  const order_id = await createOrder(amount);
  await prisma.payment.create({
    data: {
      amount: amount,
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
    if (payment_details.status !== "captured") {
      await prisma.payment.update({
        where: { order_id: payment_details.order_id, status: "created" },
        data: { status: "captured" },
      });
    } else {
      console.log("Payment already captured.");
    }
  } else {
    await prisma.payment.update({
      where: { order_id: payment_details.order_id, status: "created" },
      data: { status: "pending" },
    });
  }
  redirect(`/donate/${payment_details.order_id}`);
}

// 👉 2. Webhook endpoint
// router.post('/webhook', (req, res) => {
//   const secret = process.env.WEBHOOK_SECRET;
//   const signature = req.headers['x-razorpay-signature'];
//   const body = JSON.stringify(req.body);

//   const expectedSignature = crypto
//     .createHmac('sha256', secret)
//     .update(body)
//     .digest('hex');

//   if (signature === expectedSignature) {
//     console.log('✅ Webhook verified:', req.body.event);
//     const event = req.body.event;

//     if (event === 'payment.captured') {
//       const payment = req.body.payload.payment.entity;
//       console.log('💰 Payment successful:', payment.id);
//       // You can update your DB order status here
//     }
//     res.status(200).send('OK');
//   } else {
//     console.log('❌ Invalid webhook signature');
//     res.status(400).send('Invalid signature');
//   }
// });
