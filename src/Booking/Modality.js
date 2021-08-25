import React, { useState } from 'react'

const Modality = ({ setModality, updateView }) => {
    
    const [active, setActive] = useState(null)
    const onClick = (e) => {
        setActive(e.target.innerHTML)
    }
    const onConfirm = () => {
        setModality(active)
        updateView(2)
    }
    return (
        <>
            <h3>Choose your healing modality:</h3>
            <div onClick={onClick}>Reiki</div>
            <div onClick={onClick}>Access Bars</div>
            <button onClick={onConfirm}>continue</button>
        </>
    )
}

export default Modality