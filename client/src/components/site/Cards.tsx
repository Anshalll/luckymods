
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  
} from "@/components/ui/card"
import TotalUsers from "@/components/site/TotalUsers"



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




export default function Cards({ value }: { value: Mod_data }) {




  return (
    <Card className="bg-black  w-full ">

      <CardHeader>
        <CardTitle className="ibm-mono w-full flex"><p>{value.modname}</p></CardTitle>
   

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
