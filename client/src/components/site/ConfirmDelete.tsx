import { useMutateFormMutation } from "@/store/Api/Api";
import React, { useState } from "react";
export default function ConfirmDelete({ id, setDeleteid, setDeleteState }: { id: number | null, setDeleteid: React.Dispatch<number | null>, setDeleteState: React.Dispatch<boolean> }) {

    const [DataSend] = useMutateFormMutation()
    const [Error, setError] = useState<string>("")
    const HandleDeleteMod = async (id: number | null) => {
        if (id === null) {
            return;
        }
        const response = await DataSend({ path: "/api/deletemod", method: "DELETE", data: { id } })
        console.log(response)
        if (response.data.data) {
            window.location.reload();
        }
        else {
            setError("An error occured!")
            setTimeout(() => {
                setError("")
            }, 3000)
        }
    }

    return (
        <div className='absolute z-1 lg:w-[300px] w-[90%] flex items-center justify-center h-full'>
            <div className="w-full h-[300px] gap-[20px] flex items-center justify-center bg-black rounded-lg flex-col">

                <p className='text-white text-[12px]'>Are you sure you want to delete this mod?</p>
                {Error && <p className="text-red-500">{Error}</p>}


                <div className='flex w-[90%] flex-col gap-[10px]'>
                    <button onClick={() => HandleDeleteMod(id)} className='bg-red-500 text-white rounded-full p-[10px]'>Delete</button>

                    <button onClick={() => {
                        setDeleteid(null)
                        setDeleteState(false)
                    }} className='bg-transparent border-2 border-white text-white rounded-full p-[10px]'>Cancel</button>

                </div>

            </div>

        </div>
    )
}
