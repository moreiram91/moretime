import Stripe from "stripe"
import { redirect } from "next/navigation"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export default async function CheckoutPage() {

  // utilisateur test pour Stripe metadata
  const user = { id: "test-user" }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",

    payment_method_types: ["card"],

    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],

    metadata: {
      user_id: user.id
    },

    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  })

  redirect(session.url!)
}