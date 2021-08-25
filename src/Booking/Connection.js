import React from 'react'

const Connection = ({ setConnection, updateView, modality }) => {
    
    const onClick = () => {

    }
    
    return (
        <>
            <h3>Select how you would prefer to connect:</h3>
            {modality === 'Reiki' ?
                <div> 
                    <div>In Person</div> 
                    <div>Remote</div>
                </div>
                : 
                <div>
                    <div>In Person</div>
                </div>}
        </>
    )
}

export default Connection