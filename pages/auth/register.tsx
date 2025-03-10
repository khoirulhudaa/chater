import ProviderMain from "@/redux/provider";
import store from "@/redux/store";
import api from "@/services/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Register = () => {

    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const Router = useRouter()

    const handleRegisterNormal = async (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault()

        const randomNum = Math.random().toString(36).substr(2, 5); // 5 karakter random

        const data = { idUser: `CHT-${randomNum}`.toUpperCase(), email, username }
        const auth = await api.post('auth/register', data);
        if (auth?.data?.status === 201) {
            Swal.fire({
                icon: 'success',
                title: "Berhasil daftar",
                showCancelButton: false,
                showConfirmButton: false,
                customClass: {
                    popup: "!rounded-[12px] !bg-white !w-[30rem] !py-[2rem] !overflow-hidden",
                    icon: "!mt-0",
                    title: "!pt-[5px] !text-size-md font-700",
                    htmlContainer: "!pt-[5px] !pb-[1rem] !my-0",
                    timerProgressBar: "!bg-Neutrals-300",
                },
                timer: 2000,
                timerProgressBar: true,
            });
            Router.push('/auth/login')
            console.log('auth:', auth?.data)
        } else {
            Swal.fire({
                icon: 'error',
                text: auth?.data?.message,
                showCancelButton: false,
                showConfirmButton: false,
                customClass: {
                    popup: "!rounded-[12px] !bg-white !w-[30rem] !py-[2rem] !overflow-hidden",
                    icon: "!mt-0",
                    title: "!pt-[5px] !text-size-md font-700",
                    htmlContainer: "!pt-[5px] !pb-[1rem] !my-0",
                    timerProgressBar: "!bg-Neutrals-300",
                },
                timer: 2000,
                timerProgressBar: true,
            });
            console.log('auth error:', auth?.data?.message)
        }
    }

    const handleLogin = () => {
        window.location.href = 'https://api-chater.vercel.app/auth/google';
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-[40vw]">
                <h2 className="text-black text-2xl font-bold mb-2 w-max">
                    <b className="mr-2">
                        Daftar -
                    </b>
                    komunikasi di Chater
                </h2>
                <p className="text-gray-600 mb-6">
                    Pilih salah satu cara daftar
                </p>
                <form>
                    <div className="mb-4">
                        <label htmlFor="Nama pengguna"></label>
                        <input value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Muhammad Khoirulhuda" type="text" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="Akun email"></label>
                        <input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="xxxxxxx@gmail.com" type="email" />
                    </div>
                    <div className="text-center text-gray-600 mb-4">
                        atau dengan
                    </div>
                    <div className="flex justify-center space-x-4 mb-6">
                        <button onClick={() => handleLogin()} className="active:scale-[0.99] duration-100 hover:brightness-95 bg-white w-full text-center justify-center text-black flex items-center gap-3 p-3 border border-gray-300 rounded-lg" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            <p>Google</p>
                        </button>
                    </div>
                    <p className="text-gray-600 text-[14px] mb-4">
                        Sudah punya akun? <Link className="text-blue-500" href={'/auth/login'}>masuk</Link>
                    </p>
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleRegisterNormal(e)} className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700" type="submit">
                        Daftar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default () => (
    <ProviderMain store={store}>
        <Register />
    </ProviderMain>
);

