import React, { useState } from 'react'
import firebase from "../Firebase";
import { Link, useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'
import logo from "../Images/Logo.png";

const MenuHeader = props => {
    const [Menu, setMenu] = useState('')
    const history = useHistory()
    // const fade = useSpring({
    //     opacity: !error && !success ? 0 : 1
    // })

    const handleMenu = (menu) => {
        setMenu(menu)
    }
    
    const onLogout = () => {
        firebase.auth().signOut()
    }
    
    return (
        <animated.div className={`z-50 absolute right-0 top-0 left-0 overflow-hidden justify-center flex`}>
            <div className={`flex text-center w-3/4 py-4 text-blue-400 bg-gray-200 `}>
                {/* ACTIVE = bg-blue-600 */}
                <Link to="/" onClick={()=> handleMenu('Home')} className="focus:outline-none pl-12"><img className="w-32" src={logo} /></Link>
                <Link to="/kasir" onClick={()=> handleMenu('kasir')} className={`font-bold focus:outline-none flex-1 ${Menu === 'kasir' ? 'text-blue-600' : 'text-blue-400'}`}>Kasir</Link>
                <Link to="/distributor" onClick={()=> handleMenu('distributor')} className={`font-bold focus:outline-none flex-1 ${Menu === 'distributor' ? 'text-blue-600' : 'text-blue-400'}`}>Distributor</Link>
                <Link to="/barang" onClick={()=> handleMenu('barang')} className={`font-bold focus:outline-none flex-1 ${Menu === 'barang' ? 'text-blue-600' : 'text-blue-400'}`}>Barang</Link>
                <Link to="/stok_barang" onClick={()=> handleMenu('stok_barang')} className={`font-bold focus:outline-none flex-1 ${Menu === 'stok_barang' ? 'text-blue-600' : 'text-blue-400'}`}>Stok Barang</Link>
                <Link to="/riwayat" onClick={()=> handleMenu('riwayat')} className={`font-bold focus:outline-none flex-1 ${Menu === 'riwayat' ? 'text-blue-600' : 'text-blue-400'}`}>Riwayat</Link>
                <Link to="#" onClick={onLogout} className={`font-bold focus:outline-none flex-1 'text-blue-400`}>Logout</Link>
            </div>
        </animated.div>
    )
}

export default MenuHeader
