"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function DonationButton() {
  const status = useFormStatus();
  return (
    <Button type="submit" disabled={status.pending}>
      {status.pending ? "Processing..." : "Donate Now"}
    </Button>
  );
}
