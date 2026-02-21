'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

type userContextType = {
user : userType | null | undefined,
setUser : (user:userType)=>void
}
type userType = {
    name: string,
    email: string,
    id: string,
    image?:string
}

export const userDataContext = createContext<userContextType | undefined>(undefined)

const UserContext = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<userType | null | undefined>();
    const data = {user, setUser}
   
    useEffect(()=>{
        async function getUser(){
            try {
                const result = await axios.get('/api/user');
                setUser(result.data);

                
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    },[])

  return (
    <userDataContext.Provider value={data}>
        {children}
    </userDataContext.Provider>
  )
}

export default UserContext