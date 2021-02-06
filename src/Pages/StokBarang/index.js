import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import bg from '../../Assets/bg2.png'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import plus from '../../Assets/plus.png'
import dayjs from 'dayjs'
import firebase from '../../Firebase'
import _ from 'underscore'
import { notification } from '../../Redux/action/notification'
import { confirm } from '../../Redux/action/confirm'

const refStokBarang = firebase.firestore().collection("pasok")

const StokBarang = props => {
    const searchRef = useRef()
    const [StokBarang, setStokBarang] = useState([])
    const [Search, setSearch] = useState('')
    const [FilterBulan, setFilterBulan] = useState(false)
    const [FilterTanggal, setFilterTanggal] = useState(false)
    const [Tahun, setTahun] = useState(dayjs(new Date()).format('YYYY'))
    const [Value, setValue] = useState({
        startsAt: dayjs(new Date()).format('YYYY-MM-DD'),
    })

    useEffect(() => {
        getStokBarang()
        return () => {

        }
    }, [])

    const getBarang = (value) => {
        const isExist = _.findWhere(props.barang.data, { id: value })
        if (isExist) {
            return isExist.nama_barang
        }
        return 'Tidak ditemukan'
    }

    const getDistributor = (value) => {
        const isExist = _.findWhere(props.distributor.data, { id: value })
        if (isExist) {
            return isExist.nama_distributor
        }
        return 'Tidak ditemukan'
    }

    const getStokBarang = (date = null) => {
        const today = {
            startsAt: dayjs(new Date()).format('YYYY-MM-DD'),
            endsAt: dayjs(new Date()).format('YYYY-MM-DD'),
        }
        const thisDate = date ? date : today

        refStokBarang
            .orderBy('tanggal_beli', 'desc')
            .where('tanggal_beli', '>=', thisDate.startsAt)
            .where('tanggal_beli', '<=', thisDate.endsAt)
            .onSnapshot(async (snapShots) => {
                const data = []
                snapShots.forEach(docs => {
                    let currentID = docs.id
                    let appObj = { ...docs.data(), ['id']: currentID }
                    data.push(appObj)
                })
                setStokBarang(data)
            })
    }


    const focus = (ref) => {
        ref.current.focus()
    }

    const toggleBtn = (ref) => {
        ref.current.classList.toggle("hidden")
    }

    const handleChangeFilter = (e) => {
        if (e.target.value == "tanggal") {
            setFilterTanggal(true)
            setFilterBulan(false)
        } else if (e.target.value == "bulan") {
            setFilterTanggal(false)
            setFilterBulan(true)
        } else {
            setFilterBulan(false)
            setFilterTanggal(false)
        }
    }

    const renderTahun = () => {
        let tahun = '2000'
        const data = []

        for (let i = 0; i < 100; i++) {
            data.push(<option value={parseInt(tahun) + i}>{parseInt(tahun) + i}</option>)
        }
        return data
    }

    const initSearchWithMonth = (month) => {
        const year = Tahun
        const date = {
            startsAt: `${year}-${month}-01`,
            endsAt: `${year}-${month}-31`
        }
        getStokBarang(date)
    }

    const initSearch = (endsAt) => {
        const date = {
            startsAt: Value.startsAt,
            endsAt
        }
        getStokBarang(date)
    }

    const count = () => {
        return StokBarang.reduce((acc, el) => parseInt(acc) + (parseInt(el.total)), 0)
    }

    const openDialog = async (id) => {
        await props.dispatch(confirm({
            visible: true,
            title: "Hapus Stok Barang",
            msg: "Apakah anda yakin akan menghapus Stok Barang?",
            onConfirm: () => onDelete(id)
        }))
    }

    const onDelete = async (id) => {
        refStokBarang.doc(id).delete()
        await props.dispatch(notification({ isSuccess: true, msg: 'Data berhasil di hapus!' }))
        setTimeout(async () => {
            await props.dispatch(notification({ isSuccess: false, msg: '' }))
        }, 3000);
    }

    const ItemsComponent = ({ data }) => {
        const btnRef = useRef()
        return (
            <tr className="text-center">
                <td>{getBarang(data.barang)}</td>
                <td>{getDistributor(data.distributor)}</td>
                <td>{data.qty}</td>
                <td>{data.tanggal_beli}</td>
                <td>{data.tanggal_expired}</td>
                <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.total)}</td>
                <td className="w-52">
                    <div className="relative flex">
                        <div ref={btnRef} className="absolute ml-8 hidden">
                            <Link to={{ pathname: '/stok_barang/update', state: data }} className="focus:outline-none rounded-l-md bg-green-500 px-1 text-white">Update</Link>
                            <button onClick={() => openDialog(data.id)} className="focus:outline-none rounded-r-md bg-red-500 px-1 text-white">Hapus</button>
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
        }} className={`bg-fixed px-20 pt-32 flex ${StokBarang.length < 20 ? 'h-screen' : ''}`}>
            <div className="flex flex-col flex-1">

                {/* ADD BUTTON */}
                <div className="items-center flex justify-end mt-10">
                    <Link to="/stok_barang/add" className="flex border-2 border-purple-500 rounded-lg p-2 focus:outline-none bg-white">
                        <img src={plus} className="w-8" />
                        <span className="font-bold text-purple-400 text-lg">Tambah Stok Barang</span>
                    </Link>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex mt-8">
                    <div className="flex-1">
                        <table className="w-full text-purple-500 text-xl">
                            <thead className="border-2 border-purple-500 rounded-lg">
                                <tr>
                                    <th>Nama Barang</th>
                                    <th>Distributor</th>
                                    <th>QTY</th>
                                    <th>Tanggal Pembelian</th>
                                    <th>Tanggal Expired</th>
                                    <th>Total Pengeluaran</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="border-2 border-purple-500">
                                {/* LOOP AT TR */}
                                {StokBarang.length > 0 &&
                                    StokBarang.map((data, index) => {
                                        return <ItemsComponent data={data} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col w-52">
                        {/* <button ref={filterBtnRef} onClick={() => { toggleBtn(filterBtnRef); toggleBtn(filterRef) }} className="h-12 ml-2 flex items-center border-2 border-purple-500 rounded-lg p-3 text-purple-500 text-xl font-bold bg-white focus:outline-none">
                            <img src={icon_filter} className="h-8 mr-2" />
                            Filter
                        </button> */}
                        <select onChange={(e) => handleChangeFilter(e)} className="h-15 ml-2 flex items-center border-2 border-purple-500 rounded-lg p-3 text-purple-500 text-xl font-bold bg-white focus:outline-none">
                            <option>Pilih Filter . . .</option>
                            <option value="tanggal">Filter Tanggal</option>
                            <option value="bulan">Filter Bulan</option>
                        </select>
                        <div className={`flex flex-col ${FilterTanggal ? '' : 'hidden'}`}>
                            <span className="text-purple-500 ml-4">Dari</span>
                            <input type="date" onChange={(e) => setValue({ startsAt: dayjs(e.target.value).format('YYYY-MM-DD') })} className="h-12 ml-2 flex items-center border-2 border-purple-500 rounded-lg p-3 text-purple-500 text-xl font-bold bg-white focus:outline-none" />
                            <span className="text-purple-500 ml-4 mt-4">Hingga</span>
                            <input type="date" onChange={(e) => initSearch(dayjs(e.target.value).format('YYYY-MM-DD'))} className=" h-12 ml-2 flex items-center border-2 border-purple-500 rounded-lg p-3 text-purple-500 text-xl font-bold bg-white focus:outline-none" />
                        </div>
                        <select onChange={(e) => setTahun(e.target.value)} className={`${FilterBulan ? '' : 'hidden'} mt-4 h-15 ml-2 flex items-center border-2 border-purple-500 rounded-lg p-3 text-purple-500 text-xl font-bold bg-white focus:outline-none`}>
                            <option>Pilih Tahun . . .</option>
                            {renderTahun()}
                        </select>
                        <select onChange={e => initSearchWithMonth(e.target.value)} className={`${FilterBulan ? '' : 'hidden'} mt-4 h-15 ml-2 flex items-center border-2 border-purple-500 rounded-lg p-3 text-purple-500 text-xl font-bold bg-white focus:outline-none`}>
                            <option>Pilih Bulan . . .</option>
                            <option value={"01"}>Januari</option>
                            <option value={"02"}>Februari</option>
                            <option value={"03"}>Maret</option>
                            <option value={"04"}>April</option>
                            <option value={"05"}>Mei</option>
                            <option value={"06"}>Juni</option>
                            <option value={"07"}>Juli</option>
                            <option value={"08"}>Agustus</option>
                            <option value={"09"}>September</option>
                            <option value={"10"}>Oktober</option>
                            <option value={"11"}>November</option>
                            <option value={"12"}>Desember</option>
                        </select>

                        <div className={`mt-4 flex flex-col`}>
                            <span className="text-purple-500 ml-4">Total</span>
                            <div className="h-15 ml-2 flex items-center border-2 border-purple-500 rounded-lg p-3 text-purple-500 text-xl font-bold bg-white">
                                <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(count())}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

StokBarang.propTypes = {

}

const mapStateToProps = state => {
    return {
        distributor: state.distributor,
        barang: state.barang,
    }
}


export default compose(connect(mapStateToProps))(StokBarang)