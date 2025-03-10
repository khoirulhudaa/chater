import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Index = () => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center overflow-hidden'>
            <Image src={'/bg.jpeg'} alt='backgrund' className='opacity-[20%] w-full h-full absolute z-[-1]' width={1000} height={1000} />
            <h1 className='font-bold text-white text-[56px]'>Chater 1.0.0</h1>
            <p className='text-slate-300 leading-loose mt-1'>Aplikasi web untuk berdiskusi dalam group bersama banyak orang secar online</p>
            <Link href={'/auth/login'}> 
                <div className='w-max flex items-center justify-center bg-white text-black border border-slate-300 rounded-full px-5 py-3 mt-4 cursor-pointer active:scale-[0.99] hover:brightness-95 duration-100'>
                    <p>Mulai kirim pesan</p>
                </div>
            </Link>
        </div>
    )
}

export default Index
