"use server";

import prisma from "@/lib/prisma";
import { createOrder } from "@/app/api/razorpay";

export async function handleSubmit(formData: FormData) {
  // "use server";
  // get formdata as an object
  const data = Object.fromEntries(formData);
  const amount = data.amount;
  const name = data.name;
  const email = data.email;
  const phone = data.phone;
  const message = data.message;
  const order_id = await createOrder(Number(amount));
  const payment = await prisma.payment.create({
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
  //   return payment;
}
