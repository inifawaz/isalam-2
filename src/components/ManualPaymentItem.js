import formatToCurreny from '@/functions/formatToCurreny';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { HiPhoto } from 'react-icons/hi2';
import Button from './Button';
import Card from './Card';
import Modal from './Modal';

const ManualPaymentItem = ({ item, mutate }) => {
    const { userMutate } = useAuth();
    const [openHelp, setOpenHelp] = useState(false);
    const { isAdmin } = useAuth();
    const [data, setData] = useState(item);
    const [open, setOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(data.status_code ?? '');
    const [comment, setComment] = useState(data.comment ?? '');
    const [isLoading, setIsLoading] = useState(false);
    const [receiptUrl, setReceiptUrl] = useState(data.receipt_url);
    const [receiptFile, setReceiptFile] = useState(null);
    const convertDate = (value) => {
        const date = new Date(value?.toString());
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        return (day + '/' + (month < 10 ? "0" + month : month) + '/' + year + ' ' + (hour < 10 ? "0" + hour : hour) + ':' + (minute < 10 ? "0" + minute : minute));
    };
    const uploadReceipt = async () => {
        if (receiptFile == null) {
            toast.error('Bukti pembayaran tidak boleh kosong');
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('reference', data.reference);
        formData.append('receipt_file', receiptFile);
        formData.append('_method', 'PUT');
        await axios.post(`/api/manual-payments/upload-receipt`, formData).then(res => {
            toast.success(res.data.message);
        }).catch(err => {
            console.log(err);
            toast.error('Sedang terjadi kesalahan');
            userMutate();

            mutate();
        }).finally(() => {
            setOpen(false);
            setIsLoading(false);
            userMutate();

            mutate();
        });
    };
    const updateStatus = async () => {
        console.log(statusCode);
        setIsLoading(true);
        await axios.put('/api/manual-payments/update-status', {
            reference: data.reference,
            status_code: statusCode,
            comment: comment
        }).then(res => {
            toast.success(res.data.message);
            userMutate();
            mutate();
        }).finally(() => {
            mutate();
            userMutate();
            setOpen(false);
            setIsLoading(false);
        });
    };
    useEffect(() => {
        setData(item);
        setStatusCode(item.status_code);
        setComment(item.comment);
        setReceiptUrl(item.receipt_url);

    }, [item]);
    return (
        <>
            <Modal open={open} setOpen={setOpen} onClose={() => {
                setOpen(false);
            }}>
                <Modal.Title>Bukti Pembayaran</Modal.Title>
                <Modal.Body>
                    <div className='aspect-square relative shadow flex items-center justify-center bg-brand-50  mb-4'>
                        {receiptUrl ? <img src={receiptUrl} alt="" className='object-contain' /> : <HiPhoto className='h-20 w-20 text-gray-400' />}

                    </div>
                    {statusCode == 0 && (
                        <>
                            <input value={''} id='featured_image' className='hidden' onChange={(e) => {
                                let pic = URL.createObjectURL(e.target.files[0]);
                                setReceiptUrl(pic);
                                setReceiptFile(e.target.files[0]);
                            }} type='file' accept='image/*' />
                            <label className='btn-brand-light mr-4 cursor-pointer' htmlFor="featured_image">{receiptUrl ? 'Ganti Foto' : 'Upload Foto'}</label>
                            <Button onClick={() => {
                                setReceiptUrl(null);
                                setReceiptFile(null);
                            }} width='w-fit' btn='btn-danger-light'>Hapus Foto</Button>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <label htmlFor="comment" className='block font-medium text-sm mb-1 text-gray-700'>Status Pembayaran</label>

                            <div className='flex items-center space-x-4 mb-4'>
                                <div className='flex items-center space-x-2'>
                                    <input onChange={(e) => setStatusCode(e.target.value)} className='cursor-pointer' checked={statusCode == 2} type="radio" value={2} name="status_code" id="success" />
                                    <label className='cursor-pointer' htmlFor="success">Berhasil</label>
                                </div>
                                <div className='flex items-center space-x-2 '>
                                    <input onChange={(e) => setStatusCode(e.target.value)} className='cursor-pointer' checked={statusCode == 3} type="radio" value={3} name="status_code" id="rejected" />
                                    <label className='cursor-pointer' htmlFor="rejected">Ditolak</label>
                                </div>
                            </div>

                            <label htmlFor="comment" className='block font-medium text-sm mb-1 text-gray-700'>Catatan</label>
                            <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" className='rounded-md w-full shadow-sm border-gray-300 disabled:bg-dark-200 placeholder:text-dark-300  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className='flex items-center justify-end'>


                    {!isAdmin && (
                        <>
                            {statusCode == 1 || statusCode == 2 || statusCode == 3 ? (
                                <Button onClick={() => setOpen(false)} btn='btn-brand' width='w-fit'>Kembali</Button>

                            ) : (
                                <>
                                    <p onClick={() => setOpen(false)} className='mr-8 cursor-pointer text-dark-500'>Batal</p>
                                    <Button isLoading={isLoading} onClick={uploadReceipt} btn='btn-brand' width='w-fit'>Kirim</Button>
                                </>
                            )}

                        </>
                    )}



                    {isAdmin && (
                        <>
                            <p onClick={() => setOpen(false)} className='mr-8 cursor-pointer text-dark-500'>Batal</p>
                            <Button isLoading={isLoading} onClick={updateStatus} btn='btn-brand' width='w-fit'>Simpan</Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
            <Modal open={openHelp} onClose={() => {
                setOpenHelp(false);
            }}>
                <Modal.Title>Cara Pembayaran</Modal.Title>
                <Modal.Body>
                    <div className="mt-2  mb-4  w-full   rounded-md  ">
                        <p>Silahkan lakukan pembayaran pada salah satu rekening dibawah ini, kemudian upload bukti pembayaran</p>
                        <div className=' my-2'>
                            <h3 className='text-left text-xs font-semibold text-gray-400'>Bank Syariah Indonesia a.n. YAYASAN ISALAM</h3>
                            <ul>
                                <li className='font-semibold text-amber-500'>7770120227</li>
                            </ul>
                        </div>
                        <div className=' my-2'>
                            <h3 className='text-left text-xs font-semibold text-gray-400'>Mandiri a.n. YAYASAN INISIATOR SALAM KARIIM </h3>
                            <ul>
                                <li className='font-semibold text-amber-500'>1520501070219</li>
                            </ul>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className='flex items-center justify-end'>
                    <Button onClick={() => setOpenHelp(false)} btn='btn-brand' width='w-fit'>kembali</Button>
                </Modal.Footer>
            </Modal>
            <Card>
                <div className='text-xs font-semibold'>
                    {convertDate(data.created_at)}
                </div>
                <p className='text-brand-600 line-clamp-2 mb-2 font-semibold' >
                    {data.on_behalf} {data.is_anonim && '(Disembunyikan)'}
                </p>
                <div className='mb-1'>
                    <p className='text-xs text-dark-500 font-semibold'>Referensi </p>
                    <p className='text-xs text-dark-500'>{data.reference}</p>
                </div>
                <div className='mb-1'>
                    <p className='text-xs text-dark-500 font-semibold'>Program Wakaf </p>
                    <p className='text-xs text-dark-500'>{data.campaign}</p>
                </div>
                <div className='mb-1'>
                    <p className='text-xs text-dark-500 font-semibold'>Doa atau Kata Kata Dukungan</p>
                    <p className='text-xs text-dark-500'>{data.wos == '' || data.wos == null ? 'Tidak ada' : data.wos}</p>
                </div>
                <div className='mb-1'>
                    <p className='text-xs text-dark-500 font-semibold'>Nominal Wakaf</p>
                    <p className='text-xs text-dark-500'>{formatToCurreny(data.amount)}</p>
                </div>
                <div className='mb-1'>
                    <p className='text-xs text-dark-500 font-semibold'>Infak Pemeliharaan Sistem</p>
                    <p className='text-xs text-dark-500'>{formatToCurreny(data.maintenance_fee)}</p>
                </div>
                <div className='mb-1'>
                    <p className=' text-dark-500 font-semibold'>Total</p>
                    <p className='text-xl text-dark-500'>{formatToCurreny(data.amount + data.maintenance_fee)}</p>
                </div>

                {statusCode == 1 || statusCode == 2 || statusCode == 3 ? (
                    <Button onClick={() => setOpen(true)} btn='btn-brand-light' className='mt-4' width={'w-full'} >Lihat Bukti Pembayaran</Button>
                ) : !isAdmin && <Button onClick={() => setOpen(true)} className='mt-4' width={'w-full'} >Upload Bukti Pembayaran</Button>}
                {statusCode == 0 && !isAdmin && (
                    <div className='flex justify-center mt-6'>
                        <p onClick={() => setOpenHelp(true)} className='inline cursor-pointer text-dark-400 font-semibold text-sm'>Cara Pembayaran</p>
                    </div>
                )}
            </Card >
        </>
    );
};

export default ManualPaymentItem;
