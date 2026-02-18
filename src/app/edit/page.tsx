"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";

function Edit() {
  const { data } = useSession();
  const [name, setName] = useState('');
  const [frontendImage, setFrontEndImage] = useState('');
  const [backendImage, setBackendImage] = useState<File>();

//   handle image
const handleImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) return;
    setBackendImage(files[0]);


}

  useEffect(()=>{
    if (data) {
        setName(data?.user.name);
        setFrontEndImage(data?.user.image);
        
    }
  },[data])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Edit Profile
        </h1>
        <form className="space-y-2 flex flex-col w-full items-center">
          <label htmlFor="pic"><div className="w-25 h-25 rounded-full border-2 flex justify-center items-center border-white transition-all hover:border-blue-500 text-white hover:text-blue-500 cursor-pointer overflow-hidden relative ">
            <input type="file" accept="image/*" hidden  id="pic" onChange={handleImage} multiple={false}/>
            {backendImage ? (<Image fill src={URL.createObjectURL(backendImage)} alt=""/>) : (frontendImage ? (
              <Image src={frontendImage} fill alt="ImageUnavailable" />
            ) : (
              <CgProfile size={22} color="white" className="" />
            ))}
            
          </div></label>
          <div className="w-full rounded-2xl">
            <label className="block mb-1 font-medium">Name</label>
            <input
              className="w-full border-b border-white py-2 px-1 bg-black text-white outline-none placeholder-gray-400"
              type="text"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <button className="w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
