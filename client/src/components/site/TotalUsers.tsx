import {  Users } from 'lucide-react';

export default function TotalUsers({  users } : {users: number}) {
  return (
    <span  className='flex  items-center w-full gap-[5px]'><Users size={18}/>{users}</span>
  )
}
