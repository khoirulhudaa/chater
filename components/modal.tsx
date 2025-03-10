import ProviderMain from "@/redux/provider";
import { getRooms } from "@/redux/roomSlice";
import store from "@/redux/store";
import api from "@/services/axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

interface ModalState {
    onClose: () => void;
}

const Modal = ({ onClose }: ModalState) => {

    const [room, setRoom] = useState<string>('')
    const [description, setDesctiption] = useState<string>('')

    const dispatch = useDispatch()

    const handleCreateoom = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const randomNum = Math.random().toString(36).substr(2, 5); // 5 karakter random

        const data = { idRoom: randomNum, name: room, description }

        const result = await api.post('http://localhost:3600/room', data);
        console.log('create room:', result)
        if (result.status === 201) {
            const getRoom = await fetch('http://localhost:3600/room', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const resultGet = await getRoom.json()
            dispatch(getRooms(resultGet.data))

            Swal.fire({
                icon: 'success',
                title: "Berhasil buat group!",
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
            onClose()
            console.log('create room:', result)
        } else {
            Swal.fire({
                icon: 'error',
                title: "Terjadi kesalahan saat buat group!",
                text: result?.data?.message,
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
            console.log('create room error:', result)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-screen h-screen fixed z-[99999999999999] bg-black/80 flex justify-center items-center">
            <div className="relative md:left-[-16px] md:top-0 top-[-20px] w-full md:w-[60vw] h-[80vh] bg-white/20 backdrop-blur-2xl p-4 md:rounded-[24px]">
                <div className="relative w-full md:w-[60vw] h-[80vh] overflow-hidden bg-white p-4 md:p-6 md:rounded-[20px]">
                    <div className='w-full flex items-center justify-between border-b border-b-slate-300 pb-3'>
                        <div className="flex md:flex-1 md:mr-4 items-center gap-2">
                            <h2 className="text-[20px] font-bold text-black">Buat group baru</h2>
                        </div>
                        <div className="mt-0 md:w-max flex items-center gap-2">
                            <div onClick={() => onClose()} className="border border-slate-400 rounded-[6px] px-3 py-1 text-slate-600 font-normal text-[12px] md:text-[10px]">
                                <p>Tutup</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[76%] overflow-y-auto mt-4 md:mt-6">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="Nama group"></label>
                                <input value={room} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)} className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Komunitas belajar MTK" type="text" />
                            </div>
                            <div className="mb-6 h-full">
                                <label htmlFor="Deskripsi group"></label>
                                <textarea value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDesctiption(e.target.value)} rows={8} className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Masukan deskripsi group anda" />
                            </div>
                        </form>
                    </div>

                    <div className='absolute border-t border-slate-300 left-0 bottom-0 w-full px-4 md:px-8 py-4 text-[12px] text-slate-500 flex items-center justify-end'>
                        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleCreateoom(e)} className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700" type="submit">
                            Buat sekarang
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ({ onClose }: ModalState) => (
    <ProviderMain store={store}>
        <Modal onClose={onClose} />
    </ProviderMain>
);

