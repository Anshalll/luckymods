import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutateFormMutation } from '../store/Api/Api'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'


export default function Admin() {


  function isFetchBaseQueryError(
    error: unknown
  ): error is FetchBaseQueryError {
    return typeof error === "object" && error != null && "data" in error;
  }
 
  const [DataSend] = useMutateFormMutation()
  const [id, setid] = useState<string>("")
  const [password, setpassword] = useState<string>("")
  const [Error, setError] = useState<string | undefined>("");

  const handleLogin = async () => {
  const response = await DataSend({
    path: `${import.meta.env.VITE_APP_SERVER_URL}/api/login`,
    data: { id, password },
    method: "POST"
  });


  if ('data' in response && response.data) {
        window.location.reload();
  }

  // If there is an error, handle it
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
      } , 3000)
    } else {
      console.error("Unknown error format:", response.error.data);
    }
  }
  };

  return (
    <div className="text-white w-full h-[100vh] flex  items-center justify-center gap-[20px]">

      <div className="flex flex-col gap-[20px] w-[90%] lg:w-[500px] h-[250px] bg-black p-[20px] rounded-lg">
        <p>Login to admin panel</p>
        {Error && <p className='text-white bg-[crimson] h-[40px] px-[20px] w-[100%] rounded-lg'>{Error}</p> }
        <Input onChange={(e) => setid(e.target.value)} value={id} required type="text" placeholder="Your id" />
        <Input onChange={(e) => setpassword(e.target.value)} value={password} required type="password" placeholder="Your password" />
        <Button onClick={() => handleLogin()} size={"lg"} className="text-black">Login</Button>
      </div>

    </div>
  )
}
