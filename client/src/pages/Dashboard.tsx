import { useState, useEffect } from "react"
import Cards from "@/components/site/Cards"
import Loading from "@/components/site/Loading"
import ModSelected from "@/components/site/SelectedMod"

import { Pen, Trash } from 'lucide-react'
import UpdateMod from "@/components/site/UpdateMod"

export default function Dashboard() {

    interface Mod_data {
        id: number,
        modname: string,
        modurl: string,
        modimage: string,
        moddesc: string,
        rating: number,
        modgametype: string,
        created_at: string,
    }

    const [typegame, settypegame] = useState<string | null>("slither")
    const [Game_mods, setGameMods] = useState<Array<Mod_data>>([])
    const [isLoading, setisLoading] = useState<boolean>(false)
    const [SelectedMod, setSelectedMod] = useState<Mod_data | null>(null)
    const [UpdateState, setUpdateState] = useState<boolean>(false)

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




    const HandleSelectGame = (game: string) => {
        if (game.trim() !== "" && game !== typegame) {
            settypegame(game)
            setGameMods([])
        }
    }

    return (
        <div className="flex w-full text-[12px] h-[100vh] text-white p-[20px]">
            {isLoading ?
                <div className="w-full h-full flex items-center justify-center">
                    <Loading />
                </div>
                :
                <>
                    <div className="w-[30%] flex flex-col  gap-[10px] h-full ">
                        <div className="flex w-full items-center gap-[20px]">
                            <button className="bg-gray-500 p-[3px] rounded-lg px-[20px]" onClick={() => HandleSelectGame("slither")}>Slither</button>
                            <button className="bg-gray-500 p-[3px] rounded-lg px-[20px]" onClick={() => HandleSelectGame("minecraft")}>Minecraft</button>

                        </div>
                        <div className="flex w-full h-full items-center flex-col overflow-y-auto">

                            {Game_mods.map((vals, index) => {
                                return <button onClick={() => setSelectedMod(vals)} key={index}>
                                    <div className="w-[300px]">
                                        <Cards value={vals} />
                                    </div>
                                </button>
                            })}
                        </div>
                    </div>

                    <div className="w-[70%] h-full">
                        {SelectedMod !== null ? (UpdateState ?

                            <div className="w-full h-full flex items-center justify-center">
                                <UpdateMod setGameMods={setGameMods} SelectedData={SelectedMod} setUpdateState={setUpdateState} setSelectedMod={setSelectedMod}/>

                            </div>
                            :
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-[500px] h-max">
                                    <div className="flex gap-[20px] items-center">

                                        <button onClick={() => setUpdateState(true)} title="Update" className="cursor-pointer">
                                            <Pen size={20} />
                                        </button>
                                        <button title="delete" className="bg-[crimson] cursor-pointer w-[30px] h-[30px] rounded-full flex items-center justify-center">
                                            <Trash size={20} />
                                        </button>
                                    </div>
                                    <ModSelected vals={SelectedMod} />
                                </div>
                            </div>

                        ) : ""}
                    </div>
                </>

            }

        </div>
    )
}
