'use client'
import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import { useState } from "react";


const Home = () => {
  const {data} = useSession();
  const [loading, setLoading] = useState(false);
  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      setLoading(false);

    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      {data && (
        <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg text-center relative flex flex-col items-center">
          {data.user.image && 
            <div className="relative w-50 h-50 rounded-full border-2 border-white overflow-hidden">
              <Image src={data.user.image} fill alt="UserImage" />
            
            
            </div>}
            <h1 className="text-2xl font-semibold my-4">Welcome, {data.user.name}</h1>
            <button className="w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer" onClick={handleSignOut}>Sign Out</button>
        </div>
        )}
      {!data && (<div className="text-white text-2xl">Loading...</div>)}

    </div>
  )
}

export default Home