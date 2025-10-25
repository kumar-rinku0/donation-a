import crypto from "crypto";
import prisma from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text(); // 🔹 Must read raw body as text
    const signature = req.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;

    // ✅ Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("❌ Invalid Razorpay signature");
      return new Response("Invalid signature", { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    console.log("✅ Verified webhook event:", event);

    // ✅ Handle different event types
    if (event === "payment.captured") {
      const payment = payload.payload.payment.entity;
      console.log(
        "💰 Payment captured:",
        payment.id,
        "Amount:",
        payment.amount / 100
      );
      // TODO: update your database order status here
      await prisma.payment.update({
        where: { order_id: payment.order_id },
        data: { status: "captured" },
      });
    } else if (event === "payment.failed") {
      const payment = payload.payload.payment.entity;
      console.log("❌ Payment failed:", payment.id);
      // TODO: handle failure
      await prisma.payment.update({
        where: { order_id: payment.order_id },
        data: { status: "failed" },
      });
    }

    // Always return quickly; Razorpay retries up to 5 times if no 2xx response
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
