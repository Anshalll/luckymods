import TotalUsers from "@/components/site/TotalUsers"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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

export default function SelectedModComponent() {
  const [Mod_data, setMod_data] = useState<Vals | null>(null);
  const params = useParams()


  useEffect(() => {

    const GetMod = async () => {
      const resp = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/getmodid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: params["modid"] })
      })

      const response = await resp.json()

      setMod_data(response)
    }

    if (params["modid"]) {
      GetMod()

    }
  }, [params])
  return (
    <div className="w-full md:w-[400px] items-center mt-[20px] justify-center flex flex-col gap-[20px] sm:p-[0px] ">
      <div className="w-full flex items-center justify-between">
        <p className="ibm-mono">{Mod_data?.modname}</p>
      </div>

      {Mod_data?.modimage && (
        <img src={Mod_data.modimage} className="w-full h-[250px] object-cover rounded-lg" alt="" />
      )}

      <div className="ibm-mono text-sm flex items-center justify-between p-[20px] sm:p-[0px] w-full">
        <p className="flex items-center gap-[10px]">
          <span className="text-yellow-500">Created on</span> {Mod_data?.created_at}
        </p>
        <div className="w-max">
          <TotalUsers users={Mod_data?.rating || 0} />
        </div>
      </div>

      <p className="text-sm text-gray-300 ibm-mono text-center w-full">{Mod_data?.moddesc}</p>
      {Mod_data?.modurl && (
        <a href={Mod_data.modurl} target="_blank" className="w-full p-[10px] rounded-lg text-white ibm-mono flex items-center justify-center tracking-wider bg-gradient-to-l from-cyan-500 to-green-500">
          Link
        </a>
      )}
    </div>
  )
}
