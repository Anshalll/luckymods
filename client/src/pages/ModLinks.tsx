import Layout from "@/Layout"
import SlitherBG from "@/assets/slitherbg.jpg"
import MinecraftBG from "@/assets/minecraftbg.jpg"
import SelectedMod from "../components/site/SelectedMod"
import Loading from "@/components/site/Loading"
import Cards from "@/components/site/Cards"
import { X } from 'lucide-react'
import { useEffect, useState } from "react"

export default function ModLinks({ typegame }: { typegame: string }) {

    interface Mod_data {
        id: number,
        modname: string,
        modurl: string,
        modimage: string,
        moddesc: string,
        rating: number,
        modtype: string,
        modgametype: string,
        created_at: string,
    }
interface SelectedModdata {
  id: number | null,
  game: string,
  type: string
}
    const [Game_mods, setGameMods] = useState<Array<Mod_data>>([])
    const [isLoading, setisLoading] = useState<boolean>(false)
    const [SelectedModid, setSelectedModid] = useState<SelectedModdata >({id: null, game: "", type: ""})

    useEffect(() => {
        if (Game_mods.length === 0) {
            setisLoading(true)
            fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/getmods`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },

                body: JSON.stringify({
                    gametype: typegame
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    setGameMods(data?.data)
                    setisLoading(false)
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setisLoading(false)
                });

        }



    }, [Game_mods, isLoading, typegame])

    const CloseMod = () => {
        setSelectedModid({id: null, game: "", type: ""})
    }

    return (

        <Layout>
            {isLoading ? <div className="w-full h-full flex items-center justify-center">
                <Loading />
            </div> :
                <div className="flex flex-col gap-[20px] w-full h-full items-center justify-center ">
                    {SelectedModid.id ? <div>
                        {Game_mods.filter((e) => e.id === SelectedModid.id).map((vals, key) => {

                            return <div key={key} className="w-full relative h-full ">
                                <button className="absolute right-0 rounded-full w-[30px] h-[30px] border border-white flex items-center justify-center" onClick={() => CloseMod()}><X /></button>
                                <SelectedMod setSelectedModid={setSelectedModid} vals={vals} />
                            </div>
                        })}
                    </div> : <>
                        <img src={typegame === "minecraft" ? MinecraftBG : SlitherBG} className="rounded-lg w-full h-[300px] object-cover" alt="" />
                        <div className="w-full flex text-sm items-center  justify-center gap-[20px] flex-wrap">

                            {Game_mods.map((value, index) => (
                                <button onClick={() => setSelectedModid({id: value.id  , game: typegame , type: value.modtype})} key={index} className="bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 rounded-xl p-1 from-green-500 to-cyan-500 w-full lg:w-[350px] ">

                                    <Cards value={value} />
                                </button>
                            ))}

                        </div>
                    </>}
                </div>}

        </Layout>
    )
}
