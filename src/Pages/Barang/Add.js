import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { notification } from '../../Redux/action/notification'
import firebase from '../../Firebase'
import bg from '../../Assets/bg1.png'
const refBarang = firebase.firestore().collection("barang")

const Add = (props) => {
    const history = useHistory()
    const [Values, setValues] = useState({
        nama_barang: '',
        kode_barang: '',
        sisa_stok: '',
        harga_jual: '',
        harga_distributor: '',
        harga_pokok: '',
        ppn: '',
        diskon: '',
    })

    const onChangeValue = (e) => {
        const { name, value } = e.target
        setValues({
            ...Values,
            [name]: value
        })
    }

    const onSubmit = async () => {
        if (!Values.nama_barang || !Values.kode_barang || !Values.harga_jual || !Values.harga_distributor || !Values.harga_pokok) {
            await props.dispatch(notification({ isError: true, msg: 'Form Belum terisi lengkap!' }))
            setTimeout(async () => {
                await props.dispatch(notification({ isError: false, msg: '' }))
            }, 3000);
        } else {
            try {
                if (props.connection.connectionStatus === 'disconnected') {
                    refBarang.doc().set(Values)
                    setValues({
                        nama_barang: '',
                        kode_barang: '',
                        sisa_stok: '',
                        harga_jual: '',
                        harga_pokok: '',
                        harga_distributor: '',
                        ppn: '',
                        diskon: '',
                    })
                    history.push('/barang')
                } else {
                    const res = await refBarang.where('nama_barang', '==', Values.nama_barang).get()
                    if (!res.empty) {
                        await props.dispatch(notification({ isError: true, msg: 'Data sudah ada!' }))
                        setTimeout(async () => {
                            await props.dispatch(notification({ isError: false, msg: '' }))
                        }, 3000);
                    } else {
                        await refBarang.doc().set(Values)
                        setValues({
                            nama_barang: '',
                            kode_barang: '',
                            sisa_stok: '',
                            harga_jual: '',
                            harga_pokok: '',
                            harga_distributor: '',
                            ppn: '',
                            diskon: '',
                        })
                        history.push('/barang')
                    }
                }
                await props.dispatch(notification({ isSuccess: true, msg: 'Data berhasil di input!' }))
                setTimeout(async () => {
                    await props.dispatch(notification({ isSuccess: false, msg: '' }))
                }, 3000);
            } catch (error) {
                await props.dispatch(notification({ isError: true, msg: 'Terjadi Kesalahan!' }))
                setTimeout(async () => {
                    await props.dispatch(notification({ isError: false, msg: '' }))
                }, 3000);
                console.log('/barang/add')
                console.log(error)
            }
        }
    }

    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            height: "100%",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} className="flex flex-col bg-fixed px-20 pt-32">
            <div className="flex h-screen">
                <div className="w-1/3 h-96 flex justify-center items-center">
                    IMAGE HERE
                </div>
                <div className="flex flex-col flex-1 font-bold text-purple-500">
                    <div className="flex">
                        <div className="flex flex-col">
                            <span className="text-2xl">Nama Barang</span>
                            <input name="nama_barang" value={Values.nama_barang} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Nama Barang . . ." />
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="text-2xl">Kode Barang</span>
                            <input name="kode_barang" value={Values.kode_barang} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Kode Barang . . ." />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col">
                            <span className="text-2xl pt-8">Harga Pokok</span>
                            <input type="number" name="harga_pokok" value={Values.harga_pokok} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Harga Pokok . . ." />
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="text-2xl pt-8">Harga Jual</span>
                            <input type="number" name="harga_jual" value={Values.harga_jual} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Harga Jual . . ." />
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex flex-col">
                            <span className="text-2xl pt-8">Harga Distributor</span>
                            <input type="number" name="harga_distributor" value={Values.harga_distributor} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Harga Distributor . . ." />
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="text-2xl pt-8">Diskon</span>
                            <input type="number" name="diskon" value={Values.diskon} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Diskon . . ." />
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex flex-col">
                            <span className="text-2xl pt-8">PPN</span>
                            <input type="number" name="ppn" value={Values.ppn} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="PPN . . ." />
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="text-2xl pt-8">Sisa Stok</span>
                            <input type="number" name="sisa_stok" value={Values.sisa_stok} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Sisa Stok . . ." />
                        </div>
                    </div>

                    <div className="flex text-white mt-8">
                        <button onClick={onSubmit} className="p-2 rounded-l-lg font-bold bg-green-500 focus:outline-none">Simpan</button>
                        <button onClick={() => history.push('/barang')} className="p-2 rounded-r-lg font-bold bg-red-500 focus:outline-none">Batal</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        connection: state.checkConnection,
        notification: state.notification
    }
}


export default compose(connect(mapStateToProps))(Add)