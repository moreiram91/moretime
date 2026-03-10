"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function login(){

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      alert(error.message)
      return
    }

    window.location.href = "/missions"
  }

  async function signup(){

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if(error){
      alert(error.message)
      return
    }

    alert("Account created")
  }

  return(

    <div style={{padding:40}}>

      <h1>Login</h1>

      <input
        placeholder="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={login}>
        Login
      </button>

      <br/><br/>

      <button onClick={signup}>
        Create account
      </button>

    </div>

  )
}