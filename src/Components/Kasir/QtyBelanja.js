import React, { useState } from 'react'
import plus from '../../Images/plus.png'
import minus from '../../Images/minus.png'
import PropTypes from 'prop-types'

const QtyBelanja = props => {
    const [Qty, setQty] = useState(0)
    const { max } = props
    
    const handleChange = (e = null, operator) => {
        if (operator === "+" && Qty < max) {
            setQty(prevCount => parseInt(prevCount) + 1)
        } else if(operator === "-" && Qty > 0){
            setQty(prevCount => parseInt(prevCount) - 1)
        }

        if (e) {
            const {value} = e.target
            if (value > max) {
                setQty(max)
            } else {
                setQty(value)
            }
        }
        
    }
    
    return (
        <div className="flex">
            <button onClick={() => handleChange(null,"+")} className="focus:outline-none"> <img src={plus} className="w-8" /> </button>
            <input onChange={(e) => handleChange(e, null)} name="qty" value={Qty} type="number" className="w-10 focus:outline-none mx-4" />
            <button onClick={() => handleChange(null, "-")} className="focus:outline-none"> <img src={minus} className="w-8" /> </button>
        </div>
    )
}

QtyBelanja.propTypes = {
    max: PropTypes.number.isRequired,
}


export default QtyBelanja
