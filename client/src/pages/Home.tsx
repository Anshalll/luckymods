import Layout from "@/Layout"
import Carousel from "@/components/site/Carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Cards from "@/components/site/Cards"
import { useEffect, useState } from "react"
import SelectedMod from "../components/site/SelectedMod"
import Loading from "@/components/site/Loading"
import {X} from 'lucide-react'

export default function Home() {

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

  interface SelectedMod {

    game: string,
    type: string,
    id: number | null

  }




  const [PopularSlitherMods, setPopularSlitherMods] = useState<Array<Mod_data>>([])
  const [PopularMinecraftMods, setPopularMinecraftMods] = useState<Array<Mod_data>>([])
  const [SelectedModid, setSelectedModid] = useState<SelectedMod>({ game: "", type: "", id: null })
  const [NewSlitherMods, setNewSlitherMods] = useState<Array<Mod_data>>([])
  const [NewMinecraftMods, setNewMinecraftMods] = useState<Array<Mod_data>>([])
  const [isLoading, setisLoading] = useState<boolean>(false)

  useEffect(() => {
    if (PopularMinecraftMods.length === 0 && PopularSlitherMods.length === 0) {
      setisLoading(true)

      fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/get_popular_mods`).then((response) => response.json()).then((data) => {
        setPopularMinecraftMods(data?.data?.minecraft)
        setPopularSlitherMods(data?.data?.slither)
        setisLoading(false)
      }).catch((error) => {
        console.log(error)
        setisLoading(false)
      })

    }


    if (NewSlitherMods.length === 0 && NewMinecraftMods.length === 0) {
      setisLoading(true)

      fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/get_new_mods`).then((response) => response.json()).then((data) => {
        setNewMinecraftMods(data.data?.minecraft)
        setNewSlitherMods(data.data?.slither)
        setisLoading(false)
      }).catch((error) => {
        console.log(error)
        setisLoading(false)
      })

    }


  }, [NewSlitherMods, NewMinecraftMods, PopularMinecraftMods, PopularSlitherMods])



  return (
    <Layout>
     {isLoading ? <div className="flex items-center justify-center w-full h-full">
        <Loading/>
     </div> :  <>
        {SelectedModid.id !== null ? (

          (() => {
            let selectedData: Mod_data | undefined;

            if (SelectedModid?.game === "slither" && SelectedModid.type === "popular") {
              selectedData = PopularSlitherMods.find(mod => mod.id === SelectedModid.id);
            } else if (SelectedModid?.game === "slither" && SelectedModid.type === "new") {
              selectedData = NewSlitherMods.find(mod => mod.id === SelectedModid.id);
            } else if (SelectedModid?.game === "minecraft" && SelectedModid.type === "popular") {
              selectedData = PopularMinecraftMods.find(mod => mod.id === SelectedModid.id);
            } else if (SelectedModid?.game === "minecraft" && SelectedModid.type === "new") {
              selectedData = NewMinecraftMods.find(mod => mod.id === SelectedModid.id);
            }
            if (selectedData) {

              return <div className="flex flex-col  gap-[20px] w-full h-full items-center justify-center ">
                <div className="md:w-[400px] flex-col flex w-[90%] relative md:h-[500px]">

                <button onClick={() => setSelectedModid({ id: null, game: "" , type: "" })} className="absolute w-max top-[25px] right-[0px] md:right-0"><X/></button>
                <SelectedMod  />
                </div>
              </div>

            

            }


          })()

        ) : (<div className="flex w-full h-[100%]  flex-col gap-[30px]">

          <Carousel />


          <div className='w-full  flex-col gap-[40px] items-center justify-center flex '>
            <h1 className="uppercase anton bg-gradient-to-r bg-clip-text text-transparent from-cyan-500 to-yellow-500 tracking-wider text-3xl">Slither.io mods</h1>
            <div className="flex  text-white space-x-4 text-sm w-full items-center">
              <Tabs defaultValue="New" className="w-full  flex flex-col gap-[20px] items-center justify-center">
                <TabsList className="bg-black ">
                  <TabsTrigger className="w-[200px]" value="New">New</TabsTrigger>
                  <TabsTrigger className="w-[200px]" value="Popular">Popular</TabsTrigger>
                </TabsList>
                <TabsContent value="New" className="flex gap-[20px] md:flex-row flex-col items-center w-full justify-center ">
                  {NewSlitherMods?.map((value, index) => (
                    <button onClick={() => setSelectedModid({ type: "new", game: "slither", id: value.id })} key={index} className="bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 rounded-xl p-1 from-green-500 to-cyan-500 w-[90%] md:w-[350px] ">

                      <Cards value={value} />
                    </button>
                  ))}


                </TabsContent>
                <TabsContent value="Popular" className="flex gap-[20px] w-full lg:flex-row flex-col items-center">
                  {PopularSlitherMods.map((value, index) => (
                    <button onClick={() => setSelectedModid({ type: "popular", game: "slither", id: value.id })} key={index} className="bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 rounded-xl p-1 from-green-500 to-cyan-500 w-[90%] lg:w-[350px] ">

                      <Cards value={value} />
                    </button>
                  ))}

                </TabsContent>
              </Tabs>


            </div>

          </div>


          <div className='w-full  flex-col gap-[40px] items-center justify-center flex '>
            <h1 className="uppercase anton bg-gradient-to-r bg-clip-text text-transparent from-cyan-500 to-yellow-500 tracking-wider text-3xl">minecrft mods</h1>
            <div className="flex  text-white items-center space-x-4 text-sm">
              <Tabs defaultValue="New" className="w-full  flex flex-col gap-[20px] items-center justify-center">
                <TabsList className="bg-black ">
                  <TabsTrigger className="w-[200px]" value="New">New</TabsTrigger>
                  <TabsTrigger className="w-[200px]" value="Popular">Popular</TabsTrigger>
                </TabsList>
                <TabsContent value="New" className="flex w-full flex-col lg:flex-row gap-[20px] items-center">
                  {NewMinecraftMods.map((value, index) => (
                    <button onClick={() => setSelectedModid({ type: "new", game: "minecraft", id: value.id })} key={index} className="bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 rounded-xl p-1 from-green-500 to-cyan-500 w-[90%] lg:w-[350px] ">

                      <Cards value={value} />
                    </button>
                  ))}


                </TabsContent>
                <TabsContent value="Popular" className="flex w-full flex-col lg:flex-row gap-[20px] items-center">
                  {PopularMinecraftMods.map((value, index) => (
                    <button onClick={() => setSelectedModid({ type: "popular", game: "slither", id: value.id })} key={index} className="bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 rounded-xl p-1 from-green-500 to-cyan-500 w-[90%] lg:w-[350px] ">

                      <Cards value={value} />
                    </button>
                  ))}

                </TabsContent>
              </Tabs>


            </div>

          </div>


          <section id="about" className="py-16 bg-gradient-to-b  flex justify-center items-center from-gray-900 to-black w-full">
            <div className="container w-[90%] md:w-full">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl bg-linear-to-l bg-clip-text text-transparent anton uppercase md:text-4xl font-bold mb-6 from-yellow-500 to-cyan-500 ">
                  About <span className="bg-linear-to-l bg-clip-text text-transparent from-red-500 to-cyan-500">Lucky Mods</span>
                </h2>
                <p className="text-gray-300 mb-8 ibm-mono">
                  Lucky Mods is a community-driven platform dedicated to enhancing your gaming experience through
                  high-quality mods for Slither.io and Minecraft. Our team of passionate gamers and developers work
                  tirelessly to bring you the best modifications, ensuring they're safe, optimized, and regularly updated.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gray-800/50 p-6  rounded-lg">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2 anton tracking-wider">Safe & Secure</h3>
                    <p className="text-gray-300 ibm-mono">All mods are thoroughly tested and verified to be malware-free</p>
                  </div>
                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2 anton tracking-wider">Regular Updates</h3>
                    <p className="text-gray-300 ibm-mono">We keep our mods updated with the latest game versions</p>
                  </div>
                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2 anton tracking-wider">Community Support</h3>
                    <p className="text-gray-300 ibm-mono">Join our Discord for installation help and mod discussions</p>
                  </div>
                </div>
                <div className="flex flex-row gap-4 justify-center w-full  items-center">
                  <a href="https://discord.gg/JpSWMuU9" className="bg-linear-to-r from-sky-500 hover:from-sky-600 hover:to-indigo-600 to-indigo-500 w-[150px] py-[7px] rounded-lg" >Join discord</a>
                  <a href="https://www.youtube.com/@Lucky_62388" className="bg-linear-to-r from-red-500 to-red-700  py-[7px] w-[150px] rounded-lg">Youtube channel</a>
                </div>
              </div>
            </div>
          </section>


        </div>)}
      </>}

    </Layout>
  )
}
