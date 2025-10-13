"use server";

import Form from "next/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Heart, Shield } from "lucide-react";
import { handleSubmitDonation } from "../api/checkout";
const Donate = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold">Make a Donation</h2>
        <p className="max-w-2xl mx-auto mt-4 text-gray-600">
          Your generosity transforms lives and builds brighter futures for
          children in need. Every donation, no matter the size, creates
          meaningful impact in our communities.
        </p>
        <div className="flex flex-col md:flex-row justify-around items-center gap-2">
          <div className="flex flex-col items-center text-center p-4">
            <Shield className="size-16 text-blue-200" />
            <span className="font-light text-2xl">Secure & Trusted</span>
            <p>
              Your donation is processed securely with industry-standard
              encryption
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <CheckCircle className="size-16 text-green-200" />
            <span className="font-light text-2xl">100% Transparent</span>
            <p>We provide detailed reports on how your donation is used</p>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <Heart className="size-16 text-red-200" />
            <span className="font-light text-2xl">Direct Impact</span>
            <p>Your contribution goes directly to those in need</p>
          </div>
        </div>
      </div>
      {/* <Donation /> */}
      <Donation />
    </div>
  );
};

export default Donate;

const Donation = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
      <Form action={handleSubmitDonation} className="flex flex-col space-y-4">
        <legend>Donation Details</legend>
        {/* Donation Amount */}
        <Input type="number" name="amount" placeholder="Enter Amount" />
        {/* Donor Information  */}
        <legend>Donor Information</legend>
        <Input type="text" name="name" placeholder="Your Name" />
        <Input type="email" name="email" placeholder="Your Email" />
        <Input
          type="number"
          name="phone"
          placeholder="Your Phone Number"
          required
        />
        <Textarea name="message" placeholder="Your Message (Optional)" />
        <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Donate Now
        </Button>
      </Form>
    </div>
  );
};
