import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { editInvoice } from '../../Redux/action/invoice'
import _ from 'underscore'
import bg from '../../Assets/bg1.png'
import List from '../../Components/Kasir/List'
import ItemsComponent from '../../Components/Kasir/ItemsComponent'
import Total from '../../Components/Kasir/Total'

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

    const getBarangWithCode = (e) => {
        const list = [...props.invoice.data]

        const { value } = e.target
        setKodebarang(value)
        if (value.length > 12) {
            initFindCode(value, list)
        }

        if (e.keyCode === 13) { //ketika menekan enter
            initFindCode(value, list)
        }
    }

    const onFocus = (ref) => {
        ref.current.focus()
    }

    const initFindCode = async (value, list) => {
        const isExist = _.findWhere(props.dataBarang.barang, { kode_barang: value })
        const toProcess = {
            ...isExist,
            qty: 1
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
        // TODO: MASUKKAN SEARCH KE REDUX
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} className="bg-fixed px-20 pt-32 flex">

            {/* BAGIAN BARANG */}
            <div className={`flex w-3/5 flex-col ${Items.length > 15 ? "" : "h-screen"}`}>
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

                <div className="flex flex-wrap mt-8">
                    {props.dataBarang.barang.length > 0 && Items}
                </div>
            </div>

            {/* BAGIAN KASIR */}
            <div className="flex-1 flex flex-col p-3 border-4 border-purple-500 rounded-lg text-purple-500 h-full">
                <div className="flex justify-between">
                    <span className="text-3xl font-bold">Invoice</span>

                    {/* KODE BARANG */}
                    <div onClick={() => onFocus(kodeBarangRef)} className="items-center flex relative">
                        <input onChange={(e) => getBarangWithCode(e)} onKeyDown={e => getBarangWithCode(e)} value={kodeBarang} ref={kodeBarangRef} className={`focus:outline-none pl-10 pr-14 rounded-lg py-2 border-2 border-purple-500`} type="text" name="search" placeholder="Kode barang . . ." />
                        <button className="absolute right-7 focus:outline-none">
                            <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.9649 14.255H15.7549L20.7449 19.255L19.2549 20.745L14.2549 15.755V14.965L13.9849 14.685C12.8449 15.665 11.3649 16.255 9.75488 16.255C6.16488 16.255 3.25488 13.345 3.25488 9.755C3.25488 6.165 6.16488 3.255 9.75488 3.255C13.3449 3.255 16.2549 6.165 16.2549 9.755C16.2549 11.365 15.6649 12.845 14.6849 13.985L14.9649 14.255ZM5.25488 9.755C5.25488 12.245 7.26488 14.255 9.75488 14.255C12.2449 14.255 14.2549 12.245 14.2549 9.755C14.2549 7.26501 12.2449 5.255 9.75488 5.255C7.26488 5.255 5.25488 7.26501 5.25488 9.755Z" fill="#9B9EEB" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* LIST BARANG AKAN DIBELI */}
                <List items={props.invoice.data} />

                {/* TOTAL BELANJA */}
                {props.invoice.data.length > 0 &&
                    <Total/>
                }
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