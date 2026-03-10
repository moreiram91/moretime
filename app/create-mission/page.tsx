"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { createMission } from "@/app/services/missionServices"

export default function CreateMissionPage() {

  const [services, setServices] = useState<any[]>([])
  const [serviceId, setServiceId] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {

    const { data, error } = await supabase
      .from("services")
      .select("*")

    if (error) {
      console.error(error)
      return
    }

    setServices(data)
  }

  async function handleSubmit(e:any) {

    e.preventDefault()

    const serviceName =
      services.find((s:any)=>s.id===serviceId)?.name

    await createMission(
      serviceName,
      Number(price)
    )

    alert("Mission created")
  }

  return (

    <div style={{padding:40}}>

      <h1>Create Mission</h1>

      <form onSubmit={handleSubmit}>

        <select
          value={serviceId}
          onChange={(e)=>setServiceId(e.target.value)}
        >

          <option value="">Choose service</option>

          {services.map((service:any)=>(
            <option
              key={service.id}
              value={service.id}
            >
              {service.name}
            </option>
          ))}

        </select>

        <br/><br/>

        <input
          placeholder="Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Create Mission
        </button>

      </form>

    </div>

  )

}