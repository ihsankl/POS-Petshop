import React, { useEffect, useState } from 'react'
import bg from '../../Assets/bg2.png'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import { notification } from '../../Redux/action/notification'
import firebase from '../../Firebase'
import { confirm } from '../../Redux/action/confirm'
import { connect } from 'react-redux'
import { compose } from 'redux'

const refPenjualan = firebase.firestore().collection("penjualan")
const refBarang = firebase.firestore().collection("barang")

const DetailPenjualan = props => {
    const location = useLocation()
    const history = useHistory()
    const [Detail, setDetail] = useState({
        data: []
    })

    useEffect(() => {
        checkData()
        return () => {

        }
    }, [])

    const checkData = () => {
        if (!location.state) {
            history.push('/riwayat')
        } else {
            setDetail(location.state)
        }
    }

    const ItemsComponent = ({ data }) => {
        return (
            <tr className="text-center">
                <td>{data.nama_barang}</td>
                <td>{data.qty}</td>
            </tr>)
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
        history.push('/riwayat')
    }

    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
        }} className={`bg-fixed px-20 pt-32 flex ${Detail.data && Detail.data.length < 20 ? 'h-screen' : ''}`}>
            <div className="flex flex-col flex-1">
                <div className="flex text-purple-500">
                    <div className="w-1/2 flex">
                        <span className="flex-1 text-3xl font-bold">Nota(ID)</span>
                        <span className="flex-1 text-2xl">{Detail.id}</span>
                    </div>
                    <div className="flex justify-end flex-1">
                        <button onClick={() => history.push('/riwayat')} className="p-2 focus:outline-none text-white bg-green-500 rounded-l-md text-2xl">Kembali</button>
                        <button onClick={() => openDialog(Detail)} className="p-2 focus:outline-none text-white bg-red-500 rounded-r-md text-2xl">Hapus</button>
                    </div>
                </div>
                <div className="flex text-purple-500 w-1/2 mt-8">
                    <span className="flex-1 text-3xl font-bold">Tanggal</span>
                    <span className="flex-1 text-2xl">{Detail.tanggal_penjualan}</span>
                </div>
                <div className="flex text-purple-500 w-full mt-8">
                    <div className="flex flex-col flex-1">

                        {/* TABEL DETAIL */}
                        {Detail.data &&
                            <>
                                <span className="flex-1 text-3xl font-bold">Jumlah Barang</span>
                                <table className="w-full text-purple-500 text-xl mt-8">
                                    <thead className="border-2 border-purple-500 rounded-lg">
                                        <tr>
                                            <th>Nama Barang</th>
                                            <th>Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-2 border-purple-500">
                                        {/* LOOP AT TR */}
                                        {Detail.data.length > 0 &&
                                            Detail.data.map((data, index) => {
                                                return <ItemsComponent key={index} data={data} />
                                            })
                                        }
                                    </tbody>
                                </table>
                            </>
                        }

                    </div>

                    {/* TOTAL */}
                    <div className="flex flex-col flex-1 items-end">
                        <span className="flex-1 text-3xl font-bold">Total</span>
                        <div className="border-2 border-purple-500 rounded-lg p-3">
                            <span className="flex-1 text-3xl font-bold">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Detail.total_pembelian)}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

DetailPenjualan.propTypes = {

}

const mapStateToProps = state => {
    return {
        penjualan: state.penjualan
    }
}


export default compose(connect(mapStateToProps))(DetailPenjualan)