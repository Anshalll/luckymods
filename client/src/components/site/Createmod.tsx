import { useState } from 'react'
import { useMutateFormMutation } from "@/store/Api/Api"
import { X } from 'lucide-react';

import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export default function Createmod({ UploadState, setUploadState, setListMods }: { UploadState: boolean, setUploadState: React.Dispatch<boolean>, setListMods: React.Dispatch<boolean> }) {

    const [Image, setImage] = useState("")
    const [Name, setName] = useState("")
    const [Game, setGame] = useState("Slither.io")
    const [URL, setURL] = useState("")
    const [Desc, setDesc] = useState("")
    const [Data_send] = useMutateFormMutation()
    const [Error, setError] = useState<string | undefined>("");
    const [isLoading, setisLoading] = useState(false)

    function isFetchBaseQueryError(
        error: unknown
    ): error is FetchBaseQueryError {
        return typeof error === "object" && error != null && "data" in error;
    }


    const UploadMod = async () => {

        setisLoading(true)
        const response = await Data_send({ path: "/api/uploadmod", method: "POST", data: { image: Image, name: Name, game: Game, url: URL, desc: Desc } })

        if ('data' in response && response.data) {
            window.location.reload();
        }

        if ('error' in response && isFetchBaseQueryError(response.error)) {
            if (
                response.error.data &&
                typeof response.error.data === "object" &&
                response.error.data !== null &&
                "error" in response.error.data
            ) {
                setError((response.error.data as { error?: string }).error);
                setTimeout(() => {
                    setError("")
                }, 3000)
            } else {
                console.error("Unknown error format:", response.error.data);
            }
        }

        setisLoading(false)
    }

    return (
        <>

            <div className="hidden md:flex items-center h-full justify-center w-full">
                <div className="w-[500px] flex flex-col gap-[10px] bg-black text-white h-max p-[20px]">
                    <p>Create new mod</p>
                    {Error && <p className='text-white bg-[crimson] h-[40px] px-[20px] w-[100%] rounded-lg'>{Error}</p>}

                    <div className="w-full h-[100px]">
                        <img src={Image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb1dzS5RIvHH9f_nuexDRiooZuwYvyurELswu3fW0gWDIGZlEpskDGBkxd6E-AtGd2ktE&usqp=CAU"} className="w-full  rounded-lg h-full object-cover object-center" alt="" />
                    </div>

                    <label className='w-full ibm-mono text-cyan-500' htmlFor="imageurl">Image URL</label>
                    <input onChange={(e) => setImage(e.target.value)} id='imageurl' className="w-full ibm-mono p-[5px] border-2 border-gray-300 rounded-md" value={Image} />

                    <label htmlFor="modname" className='w-full ibm-mono text-cyan-500'>Name</label>
                    <input onChange={(e) => setName(e.target.value)} id='modname' className="w-full ibm-mono p-[5px] border-2 border-gray-300 rounded-md" value={Name} />

                    <select onChange={(e) => setGame(e.target.value)} name="game" id="game" className='w-full ibm-mono p-[5px] border-2 text-yellow-500  border-gray-300 rounded-md' value={Game}>
                        <option value="Slither.io">Slither</option>
                        <option value="Minecraft">Minecraft</option>
                    </select>

                    <label htmlFor="modurl" className='w-full ibm-mono text-cyan-500'>URL</label>
                    <input onChange={(e) => setURL(e.target.value)} id='modurl' className="w-full ibm-mono p-[5px] border-2 border-gray-300 rounded-md" value={URL} />

                    <label htmlFor="moddesc" className='w-full ibm-mono text-cyan-500'>Description</label>
                    <textarea onChange={(e) => setDesc(e.target.value)} id='moddesc' className="w-full ibm-mono p-[5px] border-2 border-gray-300 rounded-md" value={Desc} />

                    {!isLoading ? <button onClick={() => UploadMod()} className='bg-green-500 p-[10px] rounded-lg'>Upload</button> : "Loading..."}
                </div>
            </div>

            {UploadState && <div className="flex items-center h-full justify-center w-[100%]">
                <div className="w-full flex flex-col gap-[10px] bg-black text-white h-max p-[20px]">
                    <div className='flex w-full items-center justify-between'>

                        <p>Create new mod</p>
                        <button onClick={() => {
                            setUploadState(false)
                            setListMods(true)
                        }}><X /></button>
                    </div>
                    {Error && <p className='text-white bg-[crimson] h-[40px] px-[20px] w-[100%] rounded-lg'>{Error}</p>}

                    <div className="w-full h-[100px]">
                        <img src={Image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb1dzS5RIvHH9f_nuexDRiooZuwYvyurELswu3fW0gWDIGZlEpskDGBkxd6E-AtGd2ktE&usqp=CAU"} className="w-full  rounded-lg h-full object-cover object-center" alt="" />
                    </div>

                    <label className='w-full ibm-mono text-cyan-500' htmlFor="imageurl">Image URL</label>
                    <input onChange={(e) => setImage(e.target.value)} id='imageurl' className="w-full ibm-mono p-[5px] border-2 border-gray-300 rounded-md" value={Image} />

                    <label htmlFor="modname" className='w-full ibm-mono text-cyan-500'>Name</label>
                    <input onChange={(e) => setName(e.target.value)} id='modname' className="w-full ibm-mono p-[5px] border-2 border-gray-300 rounded-md" value={Name} />



                    <select onChange={(e) => setGame(e.target.value)} name="game" id="game" className='w-full ibm-mono p-[5px] border-2 text-yellow-500  border-gray-300 rounded-md' value={Game}>
                        <option value="Slither.io">Slither</option>
                        <option value="Minecraft">Minecraft</option>
                    </select>

                    <label htmlFor="modurl" className='w-full ibm-mono text-cyan-500'>URL</label>
                    <input onChange={(e) => setURL(e.target.value)} id='modurl' className="w-full ibm-mono p-[5px] border-2 border-gray-300 rounded-md" value={URL} />

                    <label htmlFor="moddesc" className='w-full ibm-mono text-cyan-500'>Description</label>
                    <textarea onChange={(e) => setDesc(e.target.value)} id='moddesc' className="w-full ibm-mono p-[5px] border-2 border-gray-300 rounded-md" value={Desc} />

                    {!isLoading ? <button onClick={() => UploadMod()} className='bg-green-500 p-[10px] rounded-lg'>Upload</button> : "Loading..."}

                </div>
            </div>}


        </>
    )
}
