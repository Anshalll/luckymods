import TotalUsers from "@/components/site/TotalUsers"
import React from "react"
import { X } from 'lucide-react';


interface Vals {
  id: number,
  modname: string,
  modurl: string,
  modimage: string,
  moddesc: string,
  rating: number,
  modgametype: string,
  created_at: string,
}

interface SelectedMod {
  id: number | null,
  game: string,
  type: string
}


export default function SelectedMod({ vals, setSelectedModid }: { vals: Vals, setSelectedModid: React.Dispatch<React.SetStateAction<SelectedMod>> }) {

  const SetSelectedModid = () => {
    setSelectedModid({ id: null, game: "", type: "" })
  }

  return (


    <div className="w-[90%] md:w-[400px] items-center mt-[20px] justify-center flex flex-col gap-[20px] sm:p-[0px] ">

      <div className="w-full flex items-center justify-between">

        <p className=" ibm-mono  ">{vals.modname}</p>
        <button onClick={() => SetSelectedModid()}><X /></button>
      </div>
      <img src={vals.modimage} className="w-full h-[250px] object-cover rounded-lg" alt="" />
      <div className="ibm-mono text-sm flex items-center justify-between p-[20px] sm:p-[0px] w-full">

        <p className=" flex items-center gap-[10px]"><span className="text-yellow-500 ">Created on</span> {vals.created_at}</p>
        <div className="w-max">

          <TotalUsers users={vals.rating} />
        </div>
      </div>

      <p className="text-sm text-gray-300 ibm-mono text-center w-full">{vals.moddesc}</p>
      <a href={vals.modurl} target="__blank" className="w-full p-[10px] rounded-lg text-white ibm-mono flex items-center justify-center tracking-wider bg-gradient-to-l from-cyan-500 to-green-500">
        Link
      </a>
    </div>

  )
}
