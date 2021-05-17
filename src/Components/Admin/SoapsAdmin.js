import React, {useState} from 'react'
import AddSoapForm from './Forms/AddSoapForm'

const SoapsAdmin = () => {
    const [showAddSoap, setShowAdd] = useState(false)

    const onAddSoap = () => {
        setShowAdd(true)
    }
    return (
        <div>
            <h2>Soaps Admin</h2>
            <p onClick={onAddSoap}>Add New Soap</p>
            {showAddSoap ? <AddSoapForm setShowAdd={setShowAdd} /> : null}
            <p>View/Manage Inventory</p>
        </div>
    )
}

export default SoapsAdmin