import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import bg from '../../Assets/bg2.png'
import icon_filter from '../../Assets/Icon_filter.png'
import { connect } from 'react-redux'
import { compose } from 'redux'

const Riwayat = props => {
    const searchRef = useRef()
    const [Search, setSearch] = useState('')
    const [Riwayat, setRiwayat] = useState([])

    useEffect(() => {
        getRiwayat()
        return () => {

        }
    }, [props.penjualan])

    const getRiwayat = () => {
        setRiwayat(props.penjualan.dataPenjualan ? props.penjualan.dataPenjualan : [])
        console.log(props.penjualan)
    }

    const focus = (ref) => {
        ref.current.focus()
    }

    const toggleBtn = (ref) => {
        ref.current.classList.toggle("hidden")
    }

    const ItemsComponent = ({ data }) => {
        const btnRef = useRef()
        return (
            <tr className="text-center">
                <td>{data.id}</td>
                <td>{data.tanggal_penjualan}</td>
                <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.total_pembelian)}</td>
                <td className="w-52">
                    <div className="relative flex">
                        <div ref={btnRef} className="absolute ml-8 hidden">
                            <button className="focus:outline-none rounded-l-md bg-green-500 px-1 text-white">Detail</button>
                            <button className="focus:outline-none rounded-r-md bg-red-500 px-1 text-white">Hapus</button>
                        </div>
                        <button onClick={() => toggleBtn(btnRef)} className="focus:outline-none">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15 10C16.375 10 17.5 8.875 17.5 7.5C17.5 6.125 16.375 5 15 5C13.625 5 12.5 6.125 12.5 7.5C12.5 8.875 13.625 10 15 10ZM15 12.5C13.625 12.5 12.5 13.625 12.5 15C12.5 16.375 13.625 17.5 15 17.5C16.375 17.5 17.5 16.375 17.5 15C17.5 13.625 16.375 12.5 15 12.5ZM12.5 22.5C12.5 21.125 13.625 20 15 20C16.375 20 17.5 21.125 17.5 22.5C17.5 23.875 16.375 25 15 25C13.625 25 12.5 23.875 12.5 22.5Z" fill="#7579E7" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>)
    }

    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
        }} className="bg-fixed px-20 pt-32 flex">

            <div className="flex flex-col flex-1">

                {/* SEARCH BAR */}
                <span className="self-end">gatau search apa</span>
                <div onClick={() => focus(searchRef)} className="items-center flex relative self-end">
                    <input disabled onChange={(e) => setSearch(e.target.value)} value={Search} ref={searchRef} className={`focus:outline-none pl-10 pr-14 rounded-lg py-2 border-2 border-purple-500 disabled:`} type="text" name="search" placeholder="Cari . . ." />
                    <button className="absolute right-7 focus:outline-none">
                        <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.9649 14.255H15.7549L20.7449 19.255L19.2549 20.745L14.2549 15.755V14.965L13.9849 14.685C12.8449 15.665 11.3649 16.255 9.75488 16.255C6.16488 16.255 3.25488 13.345 3.25488 9.755C3.25488 6.165 6.16488 3.255 9.75488 3.255C13.3449 3.255 16.2549 6.165 16.2549 9.755C16.2549 11.365 15.6649 12.845 14.6849 13.985L14.9649 14.255ZM5.25488 9.755C5.25488 12.245 7.26488 14.255 9.75488 14.255C12.2449 14.255 14.2549 12.245 14.2549 9.755C14.2549 7.26501 12.2449 5.255 9.75488 5.255C7.26488 5.255 5.25488 7.26501 5.25488 9.755Z" fill="#9B9EEB" />
                        </svg>
                    </button>
                </div>

                {/* SEMACAM HEADER? */}
                <div className="flex justify-between mt-4">
                    <div className="flex flex-col">
                        <span className="font-bold text-purple-500 text-2xl">Total Pemasukan Tahunan</span>
                        <span className="font-bold text-green-400 text-2xl">Rp. 900.000.000</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-purple-500 text-2xl">Total Pemasukan Tahunan</span>
                        <span className="font-bold text-red-400 text-2xl">Rp. 900.000.000</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-purple-500 text-2xl">Total Pemasukan Tahunan</span>
                        <span className="font-bold text-green-400 text-2xl">Rp. 900.000.000</span>
                    </div>
                    <button className="flex items-center border-2 border-purple-500 rounded-lg p-3 text-purple-500 text-xl font-bold bg-white focus:outline-none">
                        <svg className="mr-2" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M33.334 4.99997H31.6673V1.66664H28.334V4.99997H11.6673V1.66664H8.33398V4.99997H6.66732C4.83398 4.99997 3.33398 6.49997 3.33398 8.33331V35C3.33398 36.8333 4.83398 38.3333 6.66732 38.3333H33.334C35.1673 38.3333 36.6673 36.8333 36.6673 35V8.33331C36.6673 6.49997 35.1673 4.99997 33.334 4.99997ZM33.3341 35H6.66741V16.6666H33.3341V35ZM6.66741 13.3333H33.3341V8.33329H6.66741V13.3333Z" fill="#7579E7" />
                        </svg>
                        Riwayat tahunan
                    </button>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex mt-8">
                    <table className="flex-1 text-purple-500 text-xl">
                        <thead className="border-2 border-purple-500 rounded-lg">
                            <tr>
                                <th>Nota(ID)</th>
                                <th>Tanggal</th>
                                <th>Total Pembelian</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="border-2 border-purple-500">
                            {/* LOOP AT TR */}
                            {Riwayat.length > 0 &&
                                Riwayat.map((data, index) => {
                                    return <ItemsComponent key={data.id} data={data} />
                                })
                            }
                        </tbody>
                    </table>
                    <button className="h-12 ml-2 flex items-center border-2 border-purple-500 rounded-lg p-3 text-purple-500 text-xl font-bold bg-white focus:outline-none">
                        <img src={icon_filter} className="h-8 mr-2" />
                        Filter
                    </button>
                </div>
            </div>
        </div>
    )
}

Riwayat.propTypes = {

}

const mapStateToProps = state => {
    return {
        penjualan: state.penjualan
    }
}


export default compose(connect(mapStateToProps))(Riwayat)