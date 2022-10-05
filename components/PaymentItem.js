import Link from "next/link";
import formatToCurreny from "../utils/formatToCurreny";

export default function Paymentdata({ data }) {
    return (
        <div className='p-6 bg-white shadow-md border '>
            <time className='text-sm text-gray-400'>{data.created_at}</time>

            <Link href={`/projects/${data.project_id}`}>
                <h2 className='text-primary-600 mb-2 cursor-pointer text-xl'>
                    {data.name}
                </h2>
            </Link>
            <div className='flex space-x-8'>
                <div>
                    <p className='text-sm text-gray-400'>Tagihan</p>
                    <p className='text-secondary-500 font-semibold'>
                        {formatToCurreny(data.total_amount)}
                    </p>
                </div>
                {data.status_code === "00" && (
                    <div>
                        <p className='text-sm text-gray-400'>Status</p>
                        <p className=' text-secondary-500 font-semibold'>
                            Pembayaran Berhasil
                        </p>
                    </div>
                )}
                {data.status_code === "00" && (
                    <div>
                        <p className='text-sm text-gray-400'>Dibayarkan Pada</p>
                        <p className=' text-secondary-500 font-semibold'>
                            {data.paid_at}
                        </p>
                    </div>
                )}
                {data.status_code === "01" && (
                    <div>
                        <p className='text-sm text-gray-400'>Status</p>
                        <p className=' text-gray-400 font-semibold'>
                            Pembayaran Gagal
                        </p>
                    </div>
                )}
                {data.status && (
                    <>
                        {data.status.statusCode === "01" && (
                            <div>
                                <p className='text-sm text-gray-400'>Status</p>
                                <p className=' text-warning-500 font-semibold'>
                                    Menunggu Pembayaran
                                </p>
                            </div>
                        )}
                        {data.status.statusCode === "02" && (
                            <div>
                                <p className='text-sm text-gray-400'>Status</p>
                                <p className=' text-gray-400 font-semibold'>
                                    Pembayaran Gagal
                                </p>
                            </div>
                        )}
                        {data.status.statusCode === "00" && (
                            <div>
                                <p className='text-sm text-gray-400'>Status</p>
                                <p className=' text-secondary-500 font-semibold'>
                                    Pembayaran Berhasil
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
            {data.status && (
                <>
                    {data.status.statusCode === "01" && (
                        <Link href={`/me/payments/${data.merchant_order_id}`}>
                            <button className='py-2 tracking-wider mt-2 rounded-md w-full block text-center bg-secondary-500 text-white'>
                                Detail Pembayaran
                            </button>
                        </Link>
                    )}
                </>
            )}
        </div>
    );
}
