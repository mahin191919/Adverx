"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function WishlistButton({ productId }: { productId: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <Button
      variant="secondary"
      size="lg"
      className="mt-3 w-full"
      onClick={() => {
        const next = !saved;
        setSaved(next);
        localStorage.setItem(`wishlist:${productId}`, String(next));
        toast.success(next ? "Added to wishlist" : "Removed from wishlist");
      }}
    >
      <Heart className={saved ? "h-4 w-4 fill-current text-fuchsia-300" : "h-4 w-4"} /> {saved ? "Wishlisted" : "Add to wishlist"}
    </Button>
  );
}
