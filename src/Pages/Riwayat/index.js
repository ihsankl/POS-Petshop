import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import bg from '../../Assets/bg2.png'
import icon_filter from '../../Assets/Icon_filter.png'
import { connect } from 'react-redux'
import { compose } from 'redux'
import dayjs from 'dayjs'
import firebase from '../../Firebase'
import { confirm } from '../../Redux/action/confirm'
import { notification } from '../../Redux/action/notification'
import { Link, useHistory } from 'react-router-dom'

const refPenjualan = firebase.firestore().collection("penjualan")
const refBarang = firebase.firestore().collection("barang")

const Riwayat = props => {
    const searchRef = useRef()
    const history = useHistory()
    const [FilterBulan, setFilterBulan] = useState(false)
    const [FilterTanggal, setFilterTanggal] = useState(false)
    const [Riwayat, setRiwayat] = useState([])
    const [Value, setValue] = useState({
        startsAt: dayjs(new Date()).format('YYYY-MM-DD'),
    })

    useEffect(() => {
        getRiwayat()
        return () => {
            getRiwayat()

        }
    }, [])

    const getRiwayat = (date = null) => {
        const today = {
            startsAt: dayjs(new Date()).format('YYYY-MM-DD'),
            endsAt: dayjs(new Date()).format('YYYY-MM-DD'),
        }
        const thisDate = date ? date : today

        refPenjualan
            .where('tanggal_penjualan', '>=', thisDate.startsAt)
            .where('tanggal_penjualan', '<=', thisDate.endsAt)
            .onSnapshot(async (snapShots) => {
                const data = []
                snapShots.forEach(docs => {
                    let currentID = docs.id
                    let appObj = { ...docs.data(), ['id']: currentID }
                    data.push(appObj)
                })
                setRiwayat(data)
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

    const ItemsComponent = ({ data }) => {
        const btnRef = useRef()
        return (
            <tr className="text-center">
                <td>{data.id}</td>
                {/* <td>{dayjs(data.tanggal_penjualan.toDate()).format('YYYY-MM-DD').toString()}</td> */}
                <td>{data.tanggal_penjualan}</td>
                <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(data.total_pembelian)}</td>
                <td className="w-52">
                    <div className="relative flex">
                        <div ref={btnRef} className="absolute ml-8 hidden">
                            <button onClick={() => history.push('/riwayat/detail', data)} className="focus:outline-none rounded-l-md bg-green-500 px-1 text-white">Detail</button>
                            <button onClick={() => openDialog(data)} className="focus:outline-none rounded-r-md bg-red-500 px-1 text-white">Hapus</button>
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

    const initSearch = (endsAt) => {
        const date = {
            startsAt: Value.startsAt,
            endsAt
        }
        console.log(date)
        getRiwayat(date)
    }

    const initSearchWithMonth = (month) => {
        const year = dayjs(new Date()).format('YYYY')
        const date = {
            startsAt: `${year}-${month}-01`,
            endsAt: `${year}-${month}-31`
        }
        console.log(date)
        getRiwayat(date)
    }

    const openDialog = async (data) => {
        await props.dispatch(confirm({
            visible: true,
            title: "Hapus Riwayat",
            msg: "Apakah anda yakin akan menghapus riwayat?",
            onConfirm: () => onDelete(data)
        }))
    }

    const onDelete = async (data) => {
        data.data.map(async (v, i) => {
            try {
                refBarang.doc(v.barang).update({
                    sisa_stok: firebase.firestore.FieldValue.increment(v.qty)
                })
            } catch (error) {
                console.log(error)
                await props.dispatch(notification({ isError: true, msg: 'Terjadi kesalahan!' }))
                setTimeout(async () => {
                    await props.dispatch(notification({ isError: false, msg: '' }))
                }, 3000);
            }
        })

        refPenjualan.doc(data.id).delete()
        await props.dispatch(notification({ isSuccess: true, msg: 'Data berhasil di hapus!' }))
        setTimeout(async () => {
            await props.dispatch(notification({ isSuccess: false, msg: '' }))
        }, 3000);
    }

    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
        }} className={`bg-fixed px-20 pt-32 flex ${Riwayat.length < 20 ? 'h-screen' : ''}`}>

            <div className="flex flex-col flex-1">

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
                    <div className="flex-1">
                        <table className="w-full text-purple-500 text-xl">
                            <thead className="border-2 border-purple-500 rounded-lg">
                                <tr>
                                    <th>Nota(ID)</th>
                                    <th>Tanggal</th>
                                    <th>Total Penjualan</th>
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
                    </div>
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