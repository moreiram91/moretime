"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function MyMissionsPage(){

  const [missions,setMissions] = useState<any[]>([])

  useEffect(()=>{
    loadMyMissions()
  },[])

  async function loadMyMissions(){

    const { data: userData } = await supabase.auth.getUser()

    const user = userData.user

    if(!user){
      return
    }

    const { data, error } = await supabase
      .from("missions")
      .select("*")
      .eq("helper_id", user.id)

    if(error){
      console.error(error)
      return
    }

    setMissions(data || [])
  }

  return(

    <div style={{padding:40}}>

      <h1>My Missions</h1>

      {missions.length === 0 && (
        <p>No missions accepted yet</p>
      )}

      {missions.map((mission)=>(
        <div key={mission.id} style={{marginTop:20}}>

          <strong>{mission.service_title}</strong>

          <div>
            {mission.amount} €
          </div>

          <div>
            Status: {mission.status}
          </div>

        </div>
      ))}

    </div>
  )
}