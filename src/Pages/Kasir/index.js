import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { editInvoice } from '../../Redux/action/invoice'
import _ from 'underscore'
import bg from '../../Images/bg1.png'
import List from './List'

const Kasir = (props) => {
    const kodeBarangRef = useRef()
    const searchRef = useRef()
    const [kodeBarang, setKodebarang] = useState('')
    const [Search, setSearch] = useState('')

    useEffect(() => {
        kodeBarangRef.current.focus()
        return () => {

        }
    }, [])

    const getBarangWithCode = async(e) => {
        const list = [...props.invoice.data]

        const {value} = e.target
        setKodebarang(value)
        if (value.length > 12) {
            // TODO : tampilkan data
            const isExist = _.findWhere(props.dataBarang.barang, { kode_barang: value })
            const toProcess = {
                ...isExist,
                qty:1
            }
            if (isExist) {
                const isExistOnInvoice = _.findWhere(list, { kode_barang: value })
                if (!isExistOnInvoice) {
                    list.push(toProcess)
                    await props.dispatch(editInvoice(list))
                }
            }
            setKodebarang('')
        } 

        if (e.keyCode === 13) { //ketika menekan enter
            // TODO : tampilkan data

        }
    }

    const onFocus = (ref) => {
        ref.current.focus()
    }

    const pushToInvoice = async (data) => {
        const list = [...props.invoice.data]

        // check if data is exist 
        const isExist = _.findWhere(list, { nama_barang: data.nama_barang })
        if (!isExist) { // if data is not exist, add new item
            if (data.sisa_stok > 0) {
                const toProcess = {
                    ...data,
                    qty: 1
                }
                list.push(toProcess)
                // to redux
                await props.dispatch(editInvoice(list))
            }
        } else {
            const index = _.indexOf(list, isExist)
            if (list[index].qty < data.sisa_stok) {
                list[index].qty++
                await props.dispatch(editInvoice(list))
            }
        }
    }

    const ItemsComponent = ({data}) => {
        return (
            <button onClick={() => pushToInvoice(data)} className="mr-4 mb-4 rounded-md border-2 border-purple-500 w-44 bg-white flex flex-col p-2">
                <div className="self-end flex">
                    <button onClick={() => null} className="relative focus:outline-none">
                        <svg width="6" height="20" viewBox="0 0 6 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3 5C4.375 5 5.5 3.875 5.5 2.5C5.5 1.125 4.375 0 3 0C1.625 0 0.5 1.125 0.5 2.5C0.5 3.875 1.625 5 3 5ZM3 7.5C1.625 7.5 0.5 8.625 0.5 10C0.5 11.375 1.625 12.5 3 12.5C4.375 12.5 5.5 11.375 5.5 10C5.5 8.625 4.375 7.5 3 7.5ZM0.5 17.5C0.5 16.125 1.625 15 3 15C4.375 15 5.5 16.125 5.5 17.5C5.5 18.875 4.375 20 3 20C1.625 20 0.5 18.875 0.5 17.5Z" fill="#7579E7" />
                        </svg>
                    </button>
                    <div ref={null} hidden className="absolute rounded-lg text-white mt-4">
                        <button onClick={() => null} className="p-1 rounded-l-lg font-bold bg-green-500 focus:outline-none">Edit</button>
                        <button onClick={() => null} className="p-1 rounded-r-lg font-bold bg-red-500 focus:outline-none">Delete</button>
                    </div>
                </div>
                <div className="w-full h-24 flex justify-center items-center">
                    {/* TODO: SHOW IMAGE */}
                    <span className="">IMAGE HERE</span>
                </div>
                <div className="flex flex-col text-sm text-purple-500 justify-start">
                    <span className="py-1 font-bold">{data.nama_barang}</span>
                    <span className="py-1">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.harga_jual)}</span>
                    <span className="py-1">Stok Tersisa {data.sisa_stok}</span>
                </div>
            </button>
        )
    }

    const Items = props.dataBarang.barang.filter((data) => {
        if (Search == '')
            return data
        else if (data.nama_barang.toLowerCase().includes(Search.toLowerCase()) || data.kode_barang.toLowerCase().includes(Search.toLowerCase())) {
            return data
        }
    }).map(data => {
        return <ItemsComponent key={data.id} data={data} /> 
    })

    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            // height:Items.length > 15 ? "":"100vh",
            backgroundPosition: 'center',
        }} className="bg-fixed px-20 pt-32 flex">

            {/* BAGIAN BARANG */}
            <div className={`flex w-3/5 flex-col ${Items.length > 15 ? "":"h-screen"}`}>
                <div className="flex text-purple-500">
                    <div onClick={() => null} className="items-center flex relative">
                        <input onChange={(e) => setSearch(e.target.value)} value={Search} ref={searchRef} className={`focus:outline-none pl-10 pr-14 rounded-lg py-2 border-2 border-purple-500`} type="text" name="search" placeholder="Cari barang . . ." />
                        <button className="absolute right-7 focus:outline-none">
                            <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.9649 14.255H15.7549L20.7449 19.255L19.2549 20.745L14.2549 15.755V14.965L13.9849 14.685C12.8449 15.665 11.3649 16.255 9.75488 16.255C6.16488 16.255 3.25488 13.345 3.25488 9.755C3.25488 6.165 6.16488 3.255 9.75488 3.255C13.3449 3.255 16.2549 6.165 16.2549 9.755C16.2549 11.365 15.6649 12.845 14.6849 13.985L14.9649 14.255ZM5.25488 9.755C5.25488 12.245 7.26488 14.255 9.75488 14.255C12.2449 14.255 14.2549 12.245 14.2549 9.755C14.2549 7.26501 12.2449 5.255 9.75488 5.255C7.26488 5.255 5.25488 7.26501 5.25488 9.755Z" fill="#9B9EEB" />
                            </svg>
                        </button>
                    </div>

                </div>

                {/* TODO: tampilkan barang (redux) */}
                <div className="flex flex-wrap mt-8">
                    {props.dataBarang.barang.length > 0 && Items}
                </div>
            </div>

            {/* BAGIAN KASIR */}
            <div className="flex-1 flex flex-col p-3 border-4 border-purple-500 rounded-lg text-purple-500 h-full">
            <span>APP LAMBAT WTF!!!</span>

                <div className="flex justify-between">
                    <span className="text-3xl font-bold">Invoice</span>

                    {/* KODE BARANG */}
                    <div onClick={() => onFocus(kodeBarangRef)} className="items-center flex relative">
                        <input onChange={(e) => getBarangWithCode(e)} value={kodeBarang} ref={kodeBarangRef} className={`focus:outline-none pl-10 pr-14 rounded-lg py-2 border-2 border-purple-500`} type="text" name="search" placeholder="Kode barang . . ." />
                        <button className="absolute right-7 focus:outline-none">
                            <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.9649 14.255H15.7549L20.7449 19.255L19.2549 20.745L14.2549 15.755V14.965L13.9849 14.685C12.8449 15.665 11.3649 16.255 9.75488 16.255C6.16488 16.255 3.25488 13.345 3.25488 9.755C3.25488 6.165 6.16488 3.255 9.75488 3.255C13.3449 3.255 16.2549 6.165 16.2549 9.755C16.2549 11.365 15.6649 12.845 14.6849 13.985L14.9649 14.255ZM5.25488 9.755C5.25488 12.245 7.26488 14.255 9.75488 14.255C12.2449 14.255 14.2549 12.245 14.2549 9.755C14.2549 7.26501 12.2449 5.255 9.75488 5.255C7.26488 5.255 5.25488 7.26501 5.25488 9.755Z" fill="#9B9EEB" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* LIST BARANG AKAN DIBELI */}
                <List items={props.invoice.data} />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        connection: state.checkConnection,
        notification: state.notification,
        dataBarang: state.dataBarang,
        invoice: state.invoice,
    }
}


export default compose(
    connect(mapStateToProps),
)(Kasir)