import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import bg from '../../Assets/bg2.png'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import firebase from '../../Firebase'
import { notification } from '../../Redux/action/notification'

const refDistributor = firebase.firestore().collection("distributor")

const UpdateDistributor = props => {
    const history = useHistory()
    const location = useLocation()
    const [Values, setValues] = useState({
        id: '',
        nama_distributor: '',
        alamat: '',
        telepon: '',
    })

    useEffect(() => {
        checkData()
        return () => {

        }
    }, [])

    const checkData = () => {
        if (!location.state) {
            history.push('/distributor')
        } else {
            setValues({
                id: location.state.id,
                nama_distributor: location.state.nama_distributor,
                alamat: location.state.alamat,
                telepon: location.state.telepon,
            })
        }
    }

    const onChangeValue = (e) => {
        const { name, value } = e.target
        setValues({
            ...Values,
            [name]: value
        })
    }

    const onSubmit = async () => {
        if (!Values.nama_distributor || !Values.alamat || !Values.telepon) {
            await props.dispatch(notification({ isError: true, msg: 'Form Belum terisi lengkap!' }))
            setTimeout(async () => {
                await props.dispatch(notification({ isError: false, msg: '' }))
            }, 3000);
        } else {
            try {
                if (props.connection.connectionStatus === 'disconnected') {
                    refDistributor.doc(Values.id).set(Values)
                    setValues({
                        nama_distributor: '',
                        alamat: '',
                        telepon: '',
                    })
                    history.push('/distributor')
                } else {

                    await refDistributor.doc(Values.id).set(Values)
                    setValues({
                        nama_distributor: '',
                        alamat: '',
                        telepon: '',
                    })
                    history.push('/distributor')
                }

                await props.dispatch(notification({ isSuccess: true, msg: 'Data berhasil di Update!' }))
                setTimeout(async () => {
                    await props.dispatch(notification({ isSuccess: false, msg: '' }))
                }, 3000);
            } catch (error) {
                console.log(error)
                await props.dispatch(notification({ isError: true, msg: 'Terjadi Kesalahan!' }))
                setTimeout(async () => {
                    await props.dispatch(notification({ isError: false, msg: '' }))
                }, 3000);
            }

        }
    }

    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
        }} className={`flex flex-col bg-fixed px-20 pt-32 h-screen`}>
            <div className="flex h-screen">
                <div className="w-1/3 h-96 flex justify-center items-center">
                    IMAGE HERE
                </div>
                <div className="flex flex-col flex-1 font-bold text-purple-500">
                    <div className="flex">
                        <div className="flex flex-col">
                            <span className="text-2xl">Nama Distributor</span>
                            <input name="nama_distributor" value={Values.nama_distributor} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Nama Distributor . . ." />
                        </div>
                        <div className="flex flex-col ml-4">
                            <span className="text-2xl">Alamat</span>
                            <input name="alamat" value={Values.alamat} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Alamat . . ." />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col">
                            <span className="text-2xl pt-8">Telepon</span>
                            <input type="telepon" name="telepon" value={Values.telepon} onChange={onChangeValue} className="w-96 p-2 focus:outline-none text-3xl text-purple-500 font-bold border-2 border-purple-500 rounded-lg" placeholder="Telepon . . ." />
                        </div>
                    </div>
                    <div className="flex text-white mt-8">
                        <button onClick={onSubmit} className="p-2 rounded-l-lg font-bold bg-green-500 focus:outline-none">Simpan</button>
                        <button onClick={() => history.push('/distributor')} className="p-2 rounded-r-lg font-bold bg-red-500 focus:outline-none">Batal</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

UpdateDistributor.propTypes = {

}

const mapStateToProps = state => {
    return {
        connection: state.checkConnection,
        confirm: state.confirm,
        dataDistributor: state.dataDistributor,
    }
}


export default compose(connect(mapStateToProps))(UpdateDistributor)