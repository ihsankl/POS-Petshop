import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import bg from '../../Assets/bg2.png'
import { notification } from '../../Redux/action/notification'
import firebase from '../../Firebase'

const refBarang = firebase.firestore().collection("barang")
const refDistributor = firebase.firestore().collection("distributor")
const refStokBarang = firebase.firestore().collection("pasok")

const UpdateStokBarang = props => {
    const history = useHistory()
    const location = useLocation()
    const [Values, setValues] = useState({
        id: '',
        barang: '',
        distributor: '',
        qty: '',
        tanggal_beli: '',
        tanggal_expired: '',
        total: '',
        oldQty: ''
    })

    useEffect(() => {
        getStokBarang()
        return () => {

        }
    }, [])

    const getStokBarang = () => {
        if (!location.state) {
            history.push('/stok_barang')
        } else {
            setValues({
                id: location.state.id,
                barang: location.state.barang,
                distributor: location.state.distributor,
                qty: location.state.qty,
                oldQty: location.state.qty,
                tanggal_beli: location.state.tanggal_beli,
                tanggal_expired: location.state.tanggal_expired,
                total: location.state.total,
            })
        }
    }

    const onSubmit = async () => {
        if (!Values.barang || !Values.distributor || !Values.qty || !Values.tanggal_beli || !Values.tanggal_expired || !Values.total) {
            await props.dispatch(notification({ isError: true, msg: 'Form Belum terisi lengkap!' }))
            setTimeout(async () => {
                await props.dispatch(notification({ isError: false, msg: '' }))
            }, 3000);

        } else {
            try {

                if (props.connection.connectionStatus === 'disconnected') {
                    // TODO: CHECK DATA LIKE CONNECTED STATUS
                    refStokBarang.doc().set(Values)
                    setValues({
                        id: '',
                        barang: '',
                        distributor: '',
                        qty: '',
                        tanggal_beli: '',
                        tanggal_expired: '',
                        total: '',
                    })
                    history.push('/stok_barang')
                } else {
                    const queryBarang = await refBarang.doc(Values.barang).get()
                    const querydistributor = await refDistributor.doc(Values.distributor).get()
                    if (queryBarang.empty || querydistributor.empty) {
                        await props.dispatch(notification({ isError: true, msg: 'Data Barang/Distributor tidak ditemukan!' }))
                        setTimeout(async () => {
                            await props.dispatch(notification({ isError: false, msg: '' }))
                        }, 3000);
                    } else {
                        await refStokBarang.doc(Values.id).set(Values)
                        if (Values.oldQty !== Values.qty) {
                            if (Values.qty > Values.oldQty) {
                                await refBarang.doc(Values.barang).update({ sisa_stok: firebase.firestore.FieldValue.increment(parseInt(Values.qty) - parseInt(Values.oldQty)) })
                            }

                            if (Values.qty < Values.oldQty) {
                                await refBarang.doc(Values.barang).update({ sisa_stok: firebase.firestore.FieldValue.increment(-(parseInt(Values.oldQty) - parseInt(Values.qty))) })
                            }
                        }
                        setValues({
                            id: '',
                            barang: '',
                            distributor: '',
                            qty: '',
                            tanggal_beli: '',
                            tanggal_expired: '',
                            total: '',
                        })
                        await props.dispatch(notification({ isSuccess: true, msg: 'Data berhasil di Tambah!' }))
                        setTimeout(async () => {
                            await props.dispatch(notification({ isSuccess: false, msg: '' }))
                        }, 3000);
                        history.push('/stok_barang')
                    }
                }
            } catch (error) {
                console.log('/stok_barang/update')
                console.log(error)
                await props.dispatch(notification({ isError: true, msg: 'Terjadi Kesalahan!' }))
                setTimeout(async () => {
                    await props.dispatch(notification({ isError: false, msg: '' }))
                }, 3000);
            }
        }
    }

    const renderBarang = () => {
        const { data } = props.barang
        const list = []
        data.map((v, i) => {
            list.push(<option key={v.id} value={v.id}>{v.nama_barang}</option>)
        })
        return list
    }

    const renderDistributor = () => {
        const { data } = props.distributor
        const list = []
        data.map((v, i) => {
            list.push(<option key={v.id} value={v.id}>{v.nama_distributor}</option>)
        })
        return list
    }

    const onChangeValue = (e) => {
        const { name, value } = e.target
        setValues({
            ...Values,
            [name]: value
        })
    }

    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            height: "100%",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} className="flex flex-col bg-fixed px-20 pt-32 h-screen">

            <div className="flex h-screen">
                <div className="w-1/3 h-96 flex justify-center items-center">
                    IMAGE HERE
                </div>
                <div className="flex flex-col flex-1 font-bold text-purple-500">
                    <div className="flex">
                        <div className="flex flex-col">
                            <span className="text-2xl">Barang</span>
                            <input type="text" onChange={onChangeValue} value={Values.barang} list="barang" name="barang" className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" />
                            <datalist id="barang" name="barang">
                                {renderBarang()}
                            </datalist>
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="text-2xl">Distributor</span>
                            <input type="text" list="distributor" onChange={onChangeValue} value={Values.distributor} name="distributor" className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" />
                            <datalist id="distributor" >
                                {renderDistributor()}
                            </datalist>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col">
                            <span className="text-2xl pt-8">QTY</span>
                            <input type="number" name="qty" min={0} value={Values.qty} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="QTY . . ." />
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="text-2xl pt-8">Tanggal Beli</span>
                            <input type="date" name="tanggal_beli" value={Values.tanggal_beli} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Tanggal Beli . . ." />
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex flex-col">
                            <span className="text-2xl pt-8">Tanggal Expired</span>
                            <input type="date" name="tanggal_expired" value={Values.tanggal_expired} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Tanggal Expired . . ." />
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="text-2xl pt-8">Total Pembelian</span>
                            <input type="number" name="total" value={Values.total} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Total Pembelian . . ." />
                        </div>
                    </div>

                    <div className="flex text-white mt-8">
                        <button onClick={onSubmit} className="p-2 rounded-l-lg font-bold bg-green-500 focus:outline-none">Simpan</button>
                        <button onClick={() => history.push('/stok_barang')} className="p-2 rounded-r-lg font-bold bg-red-500 focus:outline-none">Batal</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

UpdateStokBarang.propTypes = {

}

const mapStateToProps = state => {
    return {
        distributor: state.distributor,
        connection: state.checkConnection,
        barang: state.barang,
    }
}


export default compose(connect(mapStateToProps))(UpdateStokBarang)