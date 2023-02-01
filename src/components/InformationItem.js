import React, { useEffect, useState } from 'react'
import Card from './Card'
import dynamic from 'next/dynamic'
import Button from './Button';
import axios from '@/lib/axios';
import { toast } from 'react-hot-toast';
import Modal from './Modal';

const Editor = dynamic(() => import("@/components/Editor"), {
    ssr: false,
});

const InformationItem = ({ data, mutate }) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [titleInfo, setTitleInfo] = useState('')
    const [contentInfo, setContentInfo] = useState('')
    const handleUpdateInformation = async () => {
        setIsLoading(true)
        await axios.put(`/api/information/${data.id}`, {
            title: titleInfo,
            content: contentInfo,
            campaign_id: data.campaign_id,
        }).then(res => {
            toast.success(res.data.message)
        }).catch(err => {
            console.log(err)
            toast.error('Sedang terjadi error')

        }).finally(() => {
            mutate()
            setIsLoading(false)
        })
    }
    const handleDelete = async () => {
        setIsLoading(true)
        await axios.delete(`/api/information/${data.id}`).then(res => {
            toast.success(res.data.message)
            mutate()
        }).catch(err => {
            console.log(err)
            toast.error('Sedang terjadi kesalahan')
        }).finally(() => {
            setOpen(false)
            setIsLoading(false)
        })
    }
    useEffect(() => {
        setTitleInfo(data.title)
        setContentInfo(data.content)
    }, [data])
    return (
        <>
            <Modal open={open} setOpen={setOpen} onClose={() => {

                setOpen(false)
            }}>
                <Modal.Title>Menghapus Informasi</Modal.Title>
                <Modal.Body>Apakah anda yakin ingin menghapus informasi ini? penghapusan ini akan bersifat permanen dan tidak dapat dikembalikan</Modal.Body>
                <Modal.Footer className='flex items-center justify-end'>
                    <p onClick={() => setOpen(false)} className='mr-8 cursor-pointer text-dark-500'>Batal</p>
                    <Button isLoading={isLoading} onClick={handleDelete} btn='btn-danger' width='w-fit'>Ya, saya yakin</Button>
                </Modal.Footer>
            </Modal>
            <Card className={'max-w-xl'}>
                <label htmlFor="comment" className='block font-medium text-sm mb-1 text-gray-700'>Judul</label>
                <input type='text' className='rounded-md w-full  shadow-sm mb-4 border-gray-300 disabled:bg-dark-200 placeholder:text-dark-300  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' value={titleInfo} onChange={(e) => setTitleInfo(e.target.value)} />
                <label className='block font-medium text-sm mb-1 text-gray-700' htmlFor="">Content</label>
                <Editor data={contentInfo} onChange={(data) => {
                    setContentInfo(data)
                }} />
                <Button isLoading={isLoading} width='w-full' onClick={handleUpdateInformation} className='mt-4'>Simpan Perubahan</Button>
                <Button onClick={() => setOpen(true)} btn='btn-danger-light' width='w-full' className={'mt-6'}>Hapus</Button>
            </Card>
        </>
    )
}

export default InformationItem
