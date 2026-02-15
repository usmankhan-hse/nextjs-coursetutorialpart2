'use client'
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const session = useSession();

    // declare handle signin
    const handleSignIn = async(e:React.SubmitEvent) => {
      e.preventDefault();
      try {
            
           await signIn('credentials',{
              email, password, redirect : false
            },)
            router.push('/')

      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg bg-gray-900">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form className="space-y-6" onSubmit={handleSignIn}>
          
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="Email"
              className="w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400"
              type="text"
              placeholder="Enter Email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              name="Password"
              className="w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400"
              type="password"
              placeholder="Enter Password"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
            />
          </div>
          <p className="text-center text-white" onClick={()=>router.push('/register')}>
            Want to create an account ?{" "}
            <span className="text-blue-400 cursor-pointer hover:text-blue-50 transition-colors">
              Sign Up
            </span>
          </p>

          <button type="submit" className="w-full bg-white text-black font-semibold rounded-xl py-2 px-4 cursor-pointer hover:bg-gray-200 transition-colors" >
            Login
          </button>
        </form>
        <div className="w-full flex items-center justify-center">
          <hr className="grow border-gray-500" />
          <span className="text-gray-500 mx-1 my-2">Or</span>
          <hr className="grow border-gray-500" />
        </div>
        <button className="w-full bg-white text-black font-semibold rounded-xl py-2 px-4 cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center" onClick={async() => {
          await signIn('google',{
            callbackUrl : '/'
          });
        }}>
            <FcGoogle className="text-3xl mx-3" /><span>Login With Google</span>
          </button>
      </div>
    </div>
  );
};

export default Login;
