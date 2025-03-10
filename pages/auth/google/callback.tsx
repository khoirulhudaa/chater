import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { authSignIn, saveToken } from '@/redux/authSlice';
import ProviderMain from '@/redux/provider';
import store from '@/redux/store';
import { Loading01Icon } from 'hugeicons-react';

const Callback = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        // Ambil data pengguna dari query string URL
        const { userData } = router.query;

        if (userData) {
            // Parse data JSON yang diterima dari URL
            const parsedData = JSON.parse(decodeURIComponent(userData as string));

            // Simpan data pengguna dan token di Redux
            dispatch(authSignIn(parsedData));
            dispatch(saveToken(parsedData.token));

            // Redirect pengguna ke halaman utama atau halaman yang sesuai
            router.replace('/main/room');
        }
    }, [router.query, dispatch]);

    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center bg-white text-black'>
            <Loading01Icon className='mb-2' width={50} height={50} />
            <h2 className='font-bold text-[46px]'>Tunggu sebentar, yak...</h2>
        </div>
    );
};

export default () => (
    <ProviderMain store={store}>
        <Callback />
    </ProviderMain>
);
