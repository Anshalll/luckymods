import SlitherImg from '@/assets/slitherbg.jpg'
import MinecraftImg from '@/assets/minecraftbg.jpg'
import { Link } from "react-router-dom"

export default function Mods() {
  return (
    <>

      <div className="w-full flex h-full flex-col items-center gap-[20px]  justify-center">
        <h1 className="uppercase anton bg-gradient-to-r bg-clip-text text-transparent from-cyan-500 to-yellow-500 tracking-wider text-3xl">Select game</h1>
        <div className="flex items-center flex-col justify-center gap-[20px] w-full">

          <Link to={"/game/slither"} className="flex  w-full items-center justify-center">
            <div className="lg:w-[400px] w-[90%] h-[200px] bg-linear-to-l rounded-lg from-green-500 to-cyan-500 p-[3px]">

              <img src={SlitherImg} className="w-full h-full rounded-lg object-cover" alt="" />
            </div>
          </Link>

          <Link to={"/game/minecraft"} className="flex w-full   items-center justify-center">
            <div className="lg:w-[400px] w-[90%] h-[200px] bg-linear-to-l rounded-lg from-green-500 to-cyan-500 p-[3px]">
              <img src={MinecraftImg} className="w-full h-[200px] rounded-lg object-cover" alt="" />
            </div>
          </Link>
        </div>

      </div>
    </>
  )
}
