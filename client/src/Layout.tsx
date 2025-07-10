import Navbar from './components/site/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className=' h-screen flex justify-center   w-full'>
            <div className='scroller h-full  w-[1800px] overflow-y-auto flex flex-col'>

                <header className='bg-black p-[20px] w-full'>

                    <Navbar />
                </header>
                <main className='flex-grow'>

                   <Outlet/>
                </main>

        
               
                
            </div>
        </div>

    )
}
