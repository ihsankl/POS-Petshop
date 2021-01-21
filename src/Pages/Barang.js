import React, { useEffect, useState } from 'react'
import { compose } from "redux";
import { connect } from 'react-redux';
import firebase from '../Firebase'
const refBarang = firebase.firestore().collection("barang")

const Barang = (props) => {
    const [Barang, setBarang] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setisEdit] = useState(false)
    const [Search, setSearch] = useState('')
    const [Values, setValues] = useState({
        nama_barang: '',
        kode_barang: '',
        sisa_stok: '',
        harga_jual: '',
        harga_pokok: '',
        ppn: '',
        diskon: ''
    })
    const [Detail, setDetail] = useState({
        id: '',
        nama_barang: '',
        kode_barang: '',
        sisa_stok: '',
        harga_jual: '',
        harga_pokok: '',
        ppn: '',
        diskon: ''
    })

    useEffect(() => {
        unsubscribe()
        return () => {
            unsubscribe()
        }
    }, [])

    const unsubscribe = () => {
        refBarang.onSnapshot(snapShots => {
            const data = []
            snapShots.forEach(docs => {
                let currentID = docs.id
                let appObj = { ...docs.data(), ['id']: currentID }
                data.push(appObj)

            })
            setBarang(data)
        })
    }

    const onChangeValue = (e) => {
        const { name, value } = e.target
        setValues({
            ...Values,
            [name]: value
        })
        setDetail({
            ...Detail,
            [name]: value
        })
    }

    const handleOnSubmit = (e, id = undefined) => {
        e.preventDefault()
        if (id) {
            refBarang.doc(id).set(Detail)
            setDetail({
                id: '',
                nama_barang: '',
                kode_barang: '',
                sisa_stok: '',
                harga_jual: '',
                harga_pokok: '',
                ppn: '',
                diskon: ''
            })
            setisEdit(false)
        } else {
            refBarang.doc().set(Values)
            setValues({
                nama_barang: '',
                kode_barang: '',
                sisa_stok: '',
                harga_jual: '',
                harga_pokok: '',
                ppn: '',
                diskon: ''
            })
            setIsAdd(false)
        }

    }

    const getDetail = (data) => {
        setDetail(data)
        setisEdit(true)
    }

    const onDelete = (id) => {
        refBarang.doc(id).delete()
    }

    // ON PROGRESS
    // const onSearch = (e) => {
    //     const oldData =[...Barang]
    //     const data = [...Barang]
    //     setSearch(e.target.value)
    //     const filtered = data.filter((x)=> x.nama_barang.toLowerCase().includes(e.target.value.toLowerCase()))
    //     console.log(filtered)
    // }
    
    return (
        <div>
            {!isAdd && !isEdit &&
                <>
                    <button onClick={() => setIsAdd(true)}>Tambah</button>
                    <label>Cari: </label>
                    <input name="search" value={Search} onChange={null} />
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                {/* <th>Id</th> */}
                                <th>Nama barang</th>
                                <th>Kode barang</th>
                                <th>Stok</th>
                                <th>Harga Pokok</th>
                                <th>Harga Jual</th>
                                <th>PPN</th>
                                <th>Diskon</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Barang.length > 0 &&
                                Barang.map((v, i) => (
                                    <tr key={v.id}>
                                        <td>{i + 1}</td>
                                        {/* <td>{v.id}</td> */}
                                        <td>{v.nama_barang}</td>
                                        <td>{v.kode_barang}</td>
                                        <td>{v.sisa_stok}</td>
                                        <td>{v.harga_pokok}</td>
                                        <td>{v.harga_jual}</td>
                                        <td>{v.ppn}</td>
                                        <td>{v.diskon}</td>
                                        <td>
                                            <button onClick={() => getDetail({
                                                id: v.id,
                                                nama_barang: v.nama_barang,
                                                kode_barang: v.kode_barang,
                                                sisa_stok: v.sisa_stok,
                                                harga_jual: v.harga_pokok,
                                                harga_pokok: v.harga_jual,
                                                ppn: v.ppn,
                                                diskon: v.diskon
                                            })}>Edit</button>
                                            <button onClick={() => onDelete(v.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </>
            }
            {isAdd &&
                <>
                    <button onClick={() => setIsAdd(false)}>Back</button>
                    <form onSubmit={handleOnSubmit}>
                        <label>Nama barang: </label>
                        <input name="nama_barang" value={Values.nama_barang} onChange={onChangeValue} /><br />
                        <label>Kode barang: </label>
                        <input name="kode_barang" value={Values.kode_barang} onChange={onChangeValue} /><br />
                        <label>Sisa Stok: </label>
                        <input name="sisa_stok" value={Values.sisa_stok} onChange={onChangeValue} /><br />
                        <label>Harga Jual: </label>
                        <input name="harga_jual" value={Values.harga_jual} onChange={onChangeValue} /><br />
                        <label>Harga Pokok: </label>
                        <input name="harga_pokok" value={Values.harga_pokok} onChange={onChangeValue} /><br />
                        <label>PPN: </label>
                        <input name="ppn" value={Values.ppn} onChange={onChangeValue} /><br />
                        <label>Diskon: </label>
                        <input name="diskon" value={Values.diskon} onChange={onChangeValue} /><br />
                        <button>Submit</button>
                    </form>
                </>
            }
            {isEdit &&
                <>
                    <button onClick={() => setisEdit(false)}>Back</button>
                    <form onSubmit={(e) => handleOnSubmit(e, Detail.id)}>
                        <label>Nama barang: </label>
                        <input name="nama_barang" value={Detail.nama_barang} onChange={onChangeValue} /><br />
                        <label>Kode barang: </label>
                        <input name="kode_barang" value={Detail.kode_barang} onChange={onChangeValue} /><br />
                        <label>Sisa Stok: </label>
                        <input name="sisa_stok" value={Detail.sisa_stok} onChange={onChangeValue} /><br />
                        <label>Harga Jual: </label>
                        <input name="harga_jual" value={Detail.harga_jual} onChange={onChangeValue} /><br />
                        <label>Harga Pokok: </label>
                        <input name="harga_pokok" value={Detail.harga_pokok} onChange={onChangeValue} /><br />
                        <label>PPN: </label>
                        <input name="ppn" value={Detail.ppn} onChange={onChangeValue} /><br />
                        <label>Diskon: </label>
                        <input name="diskon" value={Detail.diskon} onChange={onChangeValue} /><br />
                        <button>Submit</button>
                    </form>
                </>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        login: state.login,
        connection: state.checkConnection,
    }
}


export default compose(connect(mapStateToProps))(Barang)