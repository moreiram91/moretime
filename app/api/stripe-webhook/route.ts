import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-25.clover",
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {

  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

  } catch (err) {

    console.log("Webhook error:", err)
    return new Response("Webhook error", { status: 400 })

  }

  if (event.type === "checkout.session.completed") {

    const session = event.data.object as Stripe.Checkout.Session

    const userId = "11111111-1111-1111-1111-111111111111"
    const subscriptionId = session.subscription

    console.log("userId:", userId)
    console.log("subscriptionId:", subscriptionId)

    if (userId && subscriptionId) {

      console.log("INSERT START")

      const subscription = await stripe.subscriptions.retrieve(
        subscriptionId as string
      )

      const { data, error } = await supabase
        .from("subscriptions")
        .insert({
          user_id: userId,
          stripe_customer_id: subscription.customer,
          stripe_subscription_id: subscription.id,
          status: subscription.status,
        })

      console.log("SUPABASE DATA:", data)
      console.log("SUPABASE ERROR:", error)

    }

  }

  return new Response("ok", { status: 200 })

}