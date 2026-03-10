"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function MissionsPage() {

  const [missions, setMissions] = useState<any[]>([])

  useEffect(() => {
    loadMissions()
  }, [])

  async function loadMissions() {

    const { data, error } = await supabase
      .from("missions")
      .select("*")

    if (error) {
      console.error("Error loading missions:", error)
      return
    }

    setMissions(data || [])
  }

  async function acceptMission(id: string) {

    const { data: userData } = await supabase.auth.getUser()

    const user = userData.user

    if (!user) {
      alert("You must be logged in")
      return
    }

    const { error } = await supabase
      .from("missions")
      .update({
        helper_id: user.id,
        status: "assigned"
      })
      .eq("id", id)

    if (error) {
      console.error("Error accepting mission:", error)
      return
    }

    loadMissions()
  }

  return (

    <div style={{ padding: 40 }}>

      <h1>Available Missions</h1>

      {missions.length === 0 && (
        <p>No missions yet</p>
      )}

      {missions.map((mission) => (

        <div key={mission.id} style={{ marginTop: 20 }}>

          <strong>{mission.service_title}</strong>

          <div>
            {mission.amount} €
          </div>

          <div>
            Status: {mission.status}
          </div>

          {mission.status === "pending" && (

            <button
              onClick={() => acceptMission(mission.id)}
              style={{ marginTop: 10 }}
            >
              Accept Mission
            </button>

          )}

        </div>

      ))}

    </div>
  )
}