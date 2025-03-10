import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import ProviderMain from '@/redux/provider';
import store from '@/redux/store';
import { useSelector } from 'react-redux';

const MainRoom = () => {
    const auth = useSelector((state: any) => state.auth.auth)

    return (
        <div className='w-screen h-screen flex bg-gray-100'>
            <Sidebar />

            <div className='w-[70vw] h-full'>
                <Navbar auth={auth} />

                <div className='relative w-full h-[90vh]'>
                    <div className='w-full h-[100%] flex flex-col items-center justify-center bg-slate-100 p-10 overflow-auto'>
                        <h2 className='mb-2 font-bold text-[24px] text-black'>Selamat datang di Chater!</h2>
                        <p className='text-[14px] w-max text-slate-500'>Berkirim pesan secara r<i>real-time</i> dan <i>online</i> dalam group</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default () => (
    <ProviderMain store={store}>
        <MainRoom />
    </ProviderMain>
);
