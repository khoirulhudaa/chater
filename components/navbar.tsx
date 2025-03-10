import { Logout02Icon } from 'hugeicons-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const Navbar = ({ auth }: { auth: any }) => {

    const params = useParams(); // Ambil slug dari URL
    const slug = params?.slug as string | undefined; // Type assertion dengan pengecekan
    const decodedSlug = slug ? decodeURIComponent(slug) : "";

    const Router = useRouter()

    const handleLogout = () => {
        Swal.fire({
            icon: 'question',
            title: "Yakin ingin keluar?",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Keluar',
            cancelButtonText: 'Batalkan',
            confirmButtonColor: 'red',
            customClass: {
                popup: "!rounded-[12px] !bg-white !w-[30rem] !py-[2rem] !overflow-hidden",
                icon: "!mt-0",
                title: "!pt-[5px] !text-size-md font-700",
                htmlContainer: "!pt-[5px] !pb-[1rem] !my-0",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Router.replace('/auth/login')
            }
        });
    }

    return (
        <div className='w-full h-[10vh] bg-white border-b border-slate-300 px-6 flex items-center justify-between'>
            <div className='w-max text-black'>
                <h2 className='font-bold'>{decodedSlug}</h2>
            </div>

            <div className='flex gap-4 items-center w-max'>
                <p className='text-black text-[16px] font-bold'>{auth?.username}</p>
                <Logout02Icon onClick={() => handleLogout()} className='active:scale-[0.99] text-red-500 cursor-pointer hover:brightness-95' />
            </div>
        </div>
    )
}

export default Navbar
