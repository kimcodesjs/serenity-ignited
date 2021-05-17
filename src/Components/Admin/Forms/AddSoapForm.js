import React from 'react'

const AddSoapForm = ({ setShowAdd }) => {

    const clickClose = () => {
        setShowAdd(false)
    }
    return (
        <div>
            <input placeholder='Name'></input>
            <input placeholder='Category'></input>
            <input placeholder='Product ID'></input>
            <button>Submit New Soap</button>
            <p onClick={clickClose}>Close</p>
        </div>
    )
}

export default AddSoapForm