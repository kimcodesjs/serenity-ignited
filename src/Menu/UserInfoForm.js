import React from 'react'


const UserInfoForm = ({ setFirstName, setLastName, setPhone, useStyles, setAuthFlow }) => {
    const classes = useStyles()
    const onClick = (e) => {
        e.preventDefault()
        setFirstName(document.getElementById('first-name').value)
        setLastName(document.getElementById('last-name').value)
        setPhone(document.getElementById('phone').value)
        setAuthFlow('next')
    }
    return (
        <form className={classes.form}>
            <div className={classes.formItem}>
                <label className={classes.inputLabel}>First Name</label>
                <input className={classes.input} id='first-name'></input>
            </div>
            <br />
            <div className={classes.formItem}>
                <label className={classes.inputLabel}>Last Name</label>
                <input className={classes.input} id='last-name'></input>
            </div>
            <br />
            <div className={classes.formItem}>
                <label className={classes.inputLabel}>Phone Number</label>
                <input className={classes.input} id='phone'></input>
            </div>
            <br />
            <button className={classes.button} onClick={onClick}>Next</button>
            <button className={classes.button} onClick={(e) => {
                    e.preventDefault()
                    setDisplay('nav-menu')
                }}>Return to Menu</button>
        </form>
    )
}

export default UserInfoForm