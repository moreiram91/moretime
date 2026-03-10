import { supabase } from "@/lib/supabase"

export async function createMission(
  serviceTitle: string,
  amount: number
) {

  const { data, error } = await supabase
    .from("missions")
    .insert([
      {
        service_title: serviceTitle,
        amount: amount,
        status: "pending"
      }
    ])

  if (error) {
    console.error("Create mission error:", error)
    throw error
  }

  return data

}