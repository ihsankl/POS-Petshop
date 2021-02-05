import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { editInvoice, sumInvoice } from '../../Redux/action/invoice'
import { notification } from '../../Redux/action/notification'
import firebase from '../../Firebase'
import dayjs from 'dayjs'

const refPenjualan = firebase.firestore().collection("penjualan")
const refBarang = firebase.firestore().collection("barang")

const Total = (props) => {
    const [Bayar, setBayar] = useState(0)
    // const [user, loading, error] = useAuthState(firebase.auth());


    const queryToDb = async () => {
        const list = [...props.invoice.data]
        const data1 = []
        let data2 = {}
        try {
            list.map((v, i) => {
                const stok = parseInt(v.sisa_stok) - parseInt(v.qty)
                const dataToBarang = {
                    diskon: list[i].diskon,
                    harga_jual: list[i].harga_jual,
                    harga_distributor: list[i].harga_distributor,
                    harga_pokok: list[i].harga_pokok,
                    // kategori: list[i].kategori,
                    kode_barang: list[i].kode_barang,
                    nama_barang: list[i].nama_barang,
                    ppn: list[i].ppn,
                    sisa_stok: stok
                }

                const dataToPenjualan = {
                    barang: v.id,
                    qty: v.qty,
                    nama_barang: v.nama_barang
                }
                data1.push(dataToPenjualan)

                refBarang.doc(v.id).set(dataToBarang)
            })
            data2 = {
                // id: uuidv4(),
                data: data1,
                tanggal_penjualan: dayjs(new Date()).format('YYYY-MM-DD'),
                total_pembelian: props.invoice.sum,
                kasir: props.user.userData.user.email,
                total_bayar: parseInt(Bayar),
                kembalian: (parseInt(Bayar) - parseInt(props.invoice.sum))
            }
            refPenjualan.doc().set(data2)
            await props.dispatch(editInvoice([]))
            await props.dispatch(sumInvoice(0))
            await props.dispatch(notification({ isSuccess: true, msg: 'Data berhasil di Submit!' }))
            setTimeout(async () => {
                await props.dispatch(notification({ isSuccess: false, msg: '' }))
            }, 3000);
            console.log(data2)
        } catch (error) {
            await props.dispatch(notification({ isError: true, msg: 'Terjadi Kesalahan!' }))
            setTimeout(async () => {
                await props.dispatch(notification({ isError: false, msg: '' }))
            }, 3000);
            console.log(error)
        }

    }

    return (
        <>
            <div className="flex flex-col border-2 border-purple-500 rounded-md text-xl bg-white py-4 px-10">
                <div className="font-bold text-3xl flex justify-between">
                    <span>Total</span>
                    <span className="">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.invoice.sum)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="flex-1">Bayar</span>
                    <div className="flex relative">
                        <span className="text-2xl absolute">Rp</span>
                        <input value={Bayar} onChange={e => setBayar(e.target.value)} type="number" name="bayar" placeholder="00.00" className="focus:outline-none w-52 text-right pl-10" />
                    </div>
                </div>
                <div className="flex justify-between">
                    <span>Kembali</span>
                    <span className="text-2xl">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format((parseInt(Bayar) - parseInt(props.invoice.sum)))}</span>

                </div>
            </div>

            <div className="flex justify-center mt-8">
                <button onClick={queryToDb} className="focus:outline-none hover:bg-purple-600 text-white py-2 px-10 bg-purple-500 font-bold text-2xl rounded-lg">Simpan</button>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        invoice: state.invoice,
        user: state.user
    }
}


export default compose(
    connect(mapStateToProps),
)(Total)