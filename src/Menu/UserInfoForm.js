import React from 'react'


const UserInfoForm = ({ useStyles, setUserInfo }) => {

    const classes = useStyles()

    const onClick = (e) => {
        e.preventDefault()
        const firstName = document.getElementById('first-name').value
        const lastName = document.getElementById('last-name').value
        const phone = document.getElementById('phone').value

        if (firstName != '' && lastName != '' && phone != '') {
            setUserInfo({
                firstName: firstName,
                lastName: lastName,
                phone: phone
            })
        }
        
    }
    return (
        <form className={classes.form}>
            <div className={classes.formItem}>
                <label className={classes.inputLabel}>First Name</label>
                <input className={classes.input} id='first-name' required></input>
            </div>
            <br />
            <div className={classes.formItem}>
                <label className={classes.inputLabel}>Last Name</label>
                <input className={classes.input} id='last-name' required></input>
            </div>
            <br />
            <div className={classes.formItem}>
                <label className={classes.inputLabel}>Phone Number</label>
                <input className={classes.input} id='phone' required></input>
            </div>
            <br />
            <button className={classes.button} onClick={onClick}>Next</button>
        </form>
    )
}

export default UserInfoForm