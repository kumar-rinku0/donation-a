"use server";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PaymentInit from "@/components/payment-init";

export default async function Donate({
  params,
}: {
  params: Promise<{ order_id: string }>;
}) {
  const { order_id } = await params;
  const payment = await prisma.payment.findUnique({
    where: { order_id: String(order_id) },
  });

  if (!payment) {
    notFound();
  }

  if (payment.status === "captured") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
        <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
          <h1 className="text-4xl font-bold mb-8 text-[#333333]">
            {payment.amount}
          </h1>
          <p className="text-gray-600 text-center">by {payment.name}</p>
          <div className="prose prose-gray mt-8">
            {payment.message || "No content available."}
          </div>
        </article>
      </div>
    );
  }

  console.log(payment);

  return <PaymentInit payment={payment} />;
}
