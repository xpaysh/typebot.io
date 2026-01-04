import { z } from "zod";

export const checkoutResponseSchema = z.object({
  checkout_id: z.string(),
  checkout_url: z.string(),
  webhook_secret: z.string().optional(),
});

export type CheckoutResponse = z.infer<typeof checkoutResponseSchema>;
