import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import bg from '../../Assets/bg2.png'
import { Link, useHistory } from 'react-router-dom'
import plus from '../../Assets/plus.png'
import firebase from '../../Firebase'
import { confirm } from '../../Redux/action/confirm'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { notification } from '../../Redux/action/notification'

const refDistributor = firebase.firestore().collection("distributor")

const Distributor = props => {
    const history = useHistory()
    const searchRef = useRef()
    const [Search, setSearch] = useState('')
    const [Distributor, setDistributor] = useState([])

    useEffect(() => {
        getDistributor()
        return () => {

        }
    }, [])

    const focus = (ref) => {
        ref.current.focus()
    }

    const getDistributor = () => {
        refDistributor
            .orderBy('nama_distributor').onSnapshot(async (snapShots) => {
                const data = []
                snapShots.forEach(docs => {
                    let currentID = docs.id
                    let appObj = { ...docs.data(), ['id']: currentID }
                    data.push(appObj)
                })
                setDistributor(data)
            })
    }

    const openDialog = async (id) => {
        await props.dispatch(confirm({
            visible: true,
            title: "Hapus Distributor",
            msg: "Apakah anda yakin akan menghapus Distributor?",
            onConfirm: () => onDelete(id)
        }))
    }

    const onDelete = async (id) => {
        refDistributor.doc(id).delete()
        await props.dispatch(notification({ isSuccess: true, msg: 'Data berhasil di hapus!' }))
        setTimeout(async () => {
            await props.dispatch(notification({ isSuccess: false, msg: '' }))
        }, 3000);
    }

    const ItemsComponent = ({ data }) => {
        const itemRef = useRef()
        const detail = {
            id: data.id,
            alamat: data.alamat,
            nama_distributor: data.nama_distributor,
            telepon: data.telepon,
        }

        return (
            <div className="ml-4 mb-4 rounded-md border-2 border-purple-500 w-96 bg-white flex p-2">
                
                <div className="p-4 h-24 flex justify-center items-center">
                    {/* TODO: SHOW IMAGE */}
                    <span className="">IMAGE HERE</span>
                </div>
                <div className="flex flex-col text-sm text-purple-500 justify-around">
                    <span className="py-1 font-bold text-2xl">{data.nama_distributor}</span>
                    <span className="py-1 text-xl">{data.alamat}</span>
                </div>
                <div className="pr-4 flex flex-1 justify-end ">
                    <button onClick={() => toggleItem(itemRef.current)} className="relative focus:outline-none">
                        <svg width="6" height="20" viewBox="0 0 6 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3 5C4.375 5 5.5 3.875 5.5 2.5C5.5 1.125 4.375 0 3 0C1.625 0 0.5 1.125 0.5 2.5C0.5 3.875 1.625 5 3 5ZM3 7.5C1.625 7.5 0.5 8.625 0.5 10C0.5 11.375 1.625 12.5 3 12.5C4.375 12.5 5.5 11.375 5.5 10C5.5 8.625 4.375 7.5 3 7.5ZM0.5 17.5C0.5 16.125 1.625 15 3 15C4.375 15 5.5 16.125 5.5 17.5C5.5 18.875 4.375 20 3 20C1.625 20 0.5 18.875 0.5 17.5Z" fill="#7579E7" />
                        </svg>
                    </button>
                    <div ref={itemRef} hidden className="absolute rounded-lg text-white">
                        <button onClick={() => history.push('/distributor/update', detail)} className="p-1 rounded-l-lg font-bold bg-green-500 focus:outline-none">Edit</button>
                        <button onClick={() => openDialog(data.id)} className="p-1 rounded-r-lg font-bold bg-red-500 focus:outline-none">Delete</button>
                    </div>
                </div>
            </div>
        )
    }

    const Items = Distributor.filter((data) => {
        if (Search == '')
            return data
        else if (data.nama_barang.toLowerCase().includes(Search.toLowerCase()) || data.kode_barang.toLowerCase().includes(Search.toLowerCase())) {
            return data
        }
    }).map(data => {
        return <ItemsComponent key={data.id} data={data} />
    })

    const toggleItem = (ref) => {
        ref.toggleAttribute('hidden')
    }

    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
        }} className={`flex flex-col bg-fixed px-20 pt-32 ${Distributor.length > 20 ? '':'h-screen'}`}>
            <div className="flex justify-end">

                {/* SEARCH BAR */}
                <div onClick={() => focus(searchRef)} className="items-center flex relative">
                    <input onChange={(e) => setSearch(e.target.value)} value={Search} ref={searchRef} className={`focus:outline-none pl-10 pr-14 rounded-lg py-2 border-2 border-purple-500`} type="text" name="search" placeholder="Cari . . ." />
                    <button className="absolute right-7 focus:outline-none">
                        <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.9649 14.255H15.7549L20.7449 19.255L19.2549 20.745L14.2549 15.755V14.965L13.9849 14.685C12.8449 15.665 11.3649 16.255 9.75488 16.255C6.16488 16.255 3.25488 13.345 3.25488 9.755C3.25488 6.165 6.16488 3.255 9.75488 3.255C13.3449 3.255 16.2549 6.165 16.2549 9.755C16.2549 11.365 15.6649 12.845 14.6849 13.985L14.9649 14.255ZM5.25488 9.755C5.25488 12.245 7.26488 14.255 9.75488 14.255C12.2449 14.255 14.2549 12.245 14.2549 9.755C14.2549 7.26501 12.2449 5.255 9.75488 5.255C7.26488 5.255 5.25488 7.26501 5.25488 9.755Z" fill="#9B9EEB" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ADD BUTTON */}
            <div className="items-center flex justify-end mt-10">
                <Link to="/distributor/add" className="flex border-2 border-purple-500 rounded-lg p-2 focus:outline-none bg-white">
                    <img src={plus} className="w-8" />
                    <span className="font-bold text-purple-400 text-lg">Tambah Distributor</span>
                </Link>
            </div>

            {/* CONTENTS */}
            <div className="flex flex-wrap mt-8 justify-end">
                {Distributor.length > 0 && Items}
            </div>
        </div>
    )
}

Distributor.propTypes = {

}

const mapStateToProps = state => {
    return {
        connection: state.checkConnection,
        confirm: state.confirm,
        dataDistributor: state.dataDistributor,
    }
}


export default compose(connect(mapStateToProps))(Distributor)