import { useState, useEffect } from "react"
import Loading from "@/components/site/Loading"
import UpdateMod from "@/components/site/UpdateMod"
import Createmod from "@/components/site/Createmod"
import AdminCards from "@/components/site/AdminCards"
import ConfirmDelete from "@/components/site/ConfirmDelete"

export default function Dashboard() {

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

    const [typegame, settypegame] = useState<string | null>("slither")
    const [Game_mods, setGameMods] = useState<Array<Mod_data>>([])
    const [isLoading, setisLoading] = useState<boolean>(false)
    const [SelectedMod, setSelectedMod] = useState<Mod_data | null>(null)
    const [UpdateState, setUpdateState] = useState<boolean>(false)
    const [UploadState, setUploadState] = useState<boolean>(false)
    const [ListMods, setListMods] = useState<boolean>(true)
    const [DeleteState, setDeleteState] = useState<boolean>(false)
    const [Deleteid,  setDeleteid] = useState<number | null>(null)

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


    const HandleDisplay = () => {
        setUploadState(true)
        setListMods(false)
    }



    return (
        <div className="flex w-full  flex-col text-[12px] p-[10px] h-[100vh] text-white lg:p-[20px]">
            {isLoading ?
                <div className="w-full h-full flex items-center justify-center">
                    <Loading />
                </div>
                :
                <>

                    <div className="flex h-[40px] w-full items-center gap-[20px]">
                        <button className="bg-gray-500 p-[3px] rounded-lg px-[20px]" onClick={() => HandleSelectGame("slither")}>Slither</button>
                        <button className="bg-gray-500 p-[3px] rounded-lg px-[20px]" onClick={() => HandleSelectGame("minecraft")}>Minecraft</button>
                        <button className="bg-red-500 lg:hidden rounded-lg w-[100px] " onClick={() => HandleDisplay()}>Upload mod</button>

                    </div>

                    <div className="relative w-full flex items-center justify-center h-[calc(100%-40px)]">

                        {UpdateState && <div className="absolute z-1 h-[100%] flex items-centrer justify-center  w-[100%] bg-black">
                            <UpdateMod setGameMods={setGameMods} SelectedData={SelectedMod} setUpdateState={setUpdateState} setSelectedMod={setSelectedMod} />
                        </div>}

                        {DeleteState && <ConfirmDelete setDeleteid={setDeleteid} setDeleteState={setDeleteState}  id={Deleteid}/> }

                        {!UploadState && ListMods && <div className="lg:w-[40%]  w-full flex flex-col  gap-[10px] h-full ">

                            <div className="Scroller flex w-full h-full items-center gap-[10px] flex-col overflow-y-auto">

                                {Game_mods.map((vals, index) => {
                                    return <div key={index}>
                                        <div className="w-[300px]">
                                            <AdminCards setDeleteid={setDeleteid}  setDeleteState={setDeleteState} setUpdateState={setUpdateState} setSelectedMod={setSelectedMod} value={vals} />
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>}

                        {SelectedMod !== null ? <div className="hidden lg:w-[70%] w-full h-full">
                            {UpdateState &&

                                <div className="w-full h-full hidden  lg:flex items-center justify-center">
                                    <UpdateMod setGameMods={setGameMods} SelectedData={SelectedMod} setUpdateState={setUpdateState} setSelectedMod={setSelectedMod} />

                                </div>
                               }



                        </div> : <Createmod  setListMods={setListMods} UploadState={UploadState} setUploadState={setUploadState} />
                        }
                    </div>

                </>

            }

        </div>
    )
}
