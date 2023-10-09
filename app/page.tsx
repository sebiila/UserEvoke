"use client"
import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
<main className='overflow-hidden'>
<div className="min-h-screen flex items-center justify-center bg-white md:px-16">
    <div className="flex flex-col md:flex-row p-8 rounded ">
      <div className="md:w-1/2 md:mr-4">
        <h1 className="text-3xl font-semibold mb-4 text-purple-800">Welcome to UserEvoke</h1>
        <p className="text-gray-600 w-5/6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus fringilla lacus, sit amet dictum lorem fringilla vel.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi consequatur facilis error. Quae atque, sequi natus earum, aliquid adipisci blanditiis ipsa ipsam sapiente animi cumque rem quos expedita, ex explicabo?
        </p>
        <Link href="/login">
        
      <button className="w-1/2 bg-purple-500 text-white py-3 my-4 rounded-lg hover:bg-purple-700">Login</button>  
      </Link>
        <Link href="/register">
        <h5 className='text-purple-800 '>Not a member ? Sign Up here..</h5> 
        </Link>
      </div>
      <div className="md:w-1/2 mt-4 md:mt-0">
        <Image src="/home.png" width={650} height={650} alt="" />
      </div>
    </div>
  </div>
</main>

  )
}
