"use server";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PaymentInit from "@/components/donate/payment-init";
import { BadgeIndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <h1 className="flex gap-1 text-4xl font-bold mb-8 text-[#333333]">
            <span>
              <BadgeIndianRupee size={40} />
            </span>
            <span>{payment.amount}</span>
          </h1>
          <p className="text-gray-600 text-center">
            Thank you! <span className="font-bold">{payment.name}</span>
          </p>
          <div className="flex gap-2">
            <a href="/donate">
              <Button variant="outline">Back</Button>
            </a>
            <a href="/">
              <Button variant="default">Home</Button>
            </a>
          </div>
        </article>
      </div>
    );
  }

  console.log(payment);

  return <PaymentInit payment={payment} />;
}
