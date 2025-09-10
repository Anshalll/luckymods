
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction
} from "@/components/ui/card"
import { EllipsisVertical, X } from 'lucide-react';
import TotalUsers from "@/components/site/TotalUsers"
import React, { useState, useRef, useEffect } from "react";


interface Mod_data {
    id?: number,
    modname: string,
    modurl: string,
    modimage: string,
    moddesc: string,
    rating?: number,
    modgametype: string,
    created_at?: string,
}



export default function AdminCards({setDeleteid , setDeleteState ,  value , setSelectedMod  , setUpdateState}: { value: Mod_data , setSelectedMod : React.Dispatch<React.SetStateAction<Mod_data | null>> , setUpdateState:   React.Dispatch<boolean> , setDeleteState : React.Dispatch<boolean> , setDeleteid: React.Dispatch<number | null> }) {

  
  const optionref = useRef<HTMLDivElement>(null);
  interface MenuTypes {
    id: number | null;
    isOpen: boolean;
  }




  const HandleSelectedMod = (value : Mod_data) => {
      setSelectedMod({ id: value.id , modname: value.modname , moddesc: value.moddesc , modgametype : value.modgametype , modimage: value.modimage , modurl : value.modurl , rating: value.rating , created_at: value.created_at })
      setUpdateState(true)
  }

  const [isOpenMenu, setIsOpenMenu] = useState<MenuTypes>({
    id: null,
    isOpen: false,
  })

  useEffect(() => {
    const windowClickHandle = (e: MouseEvent) => {
      if (optionref.current && !optionref.current.contains(e.target as Node)) {
        setIsOpenMenu({ id: null, isOpen: false })
      }
    }

    document.addEventListener("mousedown", windowClickHandle)

    return () => {
      document.removeEventListener("mousedown", windowClickHandle)
    }
  }, [])
  return (
    <Card className="bg-black  w-full ">

      <CardHeader>
        <CardTitle className="ibm-mono w-full flex"><p>{value.modname}</p></CardTitle>
        <div ref={optionref} className="relative ">
          <>
          {!isOpenMenu.isOpen && <CardAction onClick={() => {
            setIsOpenMenu({ id: value.id ?? 0, isOpen: true })
          }}><EllipsisVertical size={12} /></CardAction>}

          {isOpenMenu.isOpen && <CardAction onClick={() => {
            setIsOpenMenu({ id: null, isOpen: false })
          }}><X size={12} /></CardAction>}
          </>


          {isOpenMenu.isOpen && isOpenMenu.id === value.id && <div className="absolute shadow-xl text-[11px] py-[7px] w-[100px] flex flex-col gap-[10px] right-[20px]  bg-gray-600/90 rounded-lg">
            <button onClick={() => HandleSelectedMod(value)} className="cursor-pointer border-b-2 border-black p-[4px]">Update</button>
            <button onClick={() => {
              setDeleteid(value?.id ?? null)
              setDeleteState(true)
            }} className="cursor-pointer text-[crimson]">Delete</button>
  
          </div>}
        </div>

        <CardDescription className="ibm-mono">{value.moddesc.slice(0, 30)}.. <span className="text-cyan-500">more</span> </CardDescription>
      </CardHeader>

      <CardContent>
        <img className="object-cover w-full h-[100px] lg:h-[140px] rounded-lg" src={value.modimage} alt="" />
      </CardContent>
      <CardFooter className="ibm-mono">
        <TotalUsers users={value.rating} />
      </CardFooter>
    </Card>
  )
}
