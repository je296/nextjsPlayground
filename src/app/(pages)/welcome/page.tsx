"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";

function Welcome() {
  const { data: session, status, update } = useSession();
  const [newname, setNewName] = useState("");
  return (
      <div className="container bg-[#18181b] min-h-screen mx-auto">
        <h3 className="text-3xl text-white ">Welcome {session?.user?.name}</h3>
        <label className="text-white" htmlFor="">Update Name</label>
        <input className="mx-3"
          onChange={(e: any) => {
            setNewName(e.target.value);
          }}
          type="text"
          value={newname}
        />
        <hr className="my-3" />
        <p className="text-white"> 
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto
          quo temporibus, obcaecati similique adipisci est, ipsa iste commodi
          saepe eaque vero aliquid quidem porro nisi suscipit. Ipsam enim
          repellendus quisquam.
        </p>
      </div>
  );
}

export default Welcome;
