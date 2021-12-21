import React, { useState, useEffect } from 'react'
import {createUseStyles} from 'react-jss'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const useStyles = createUseStyles({
    
    modal: {
        display: 'block',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1',
        background: '#443356',
        width: '35vw',
        //height: '50vh',
        borderRadius: '.5em',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.69)'
        
    },
    hidden: {
        display: 'none' 
    },
    h4: {
        height: '15%',
        width: '100%',
        margin: 0,
        marginTop: '5px',
        textAlign: 'center',
        fontSize: '2em',
        textShadow: '0 0 3px #FF0000, 0 0 5px #0000FF',
    },
    form: {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    input: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    button: {
        width: '20%'
    }
})

const SignUpModal = ({ display, setDisplay, setUser }) => {

    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passConf, setPassConf] = useState('')
    const [error, setError] = useState(null)

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }
    const updatePassConf = (e) => {
        setPassConf(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const auth = getAuth()
        if (password === passConf) {
            if (error) {
                setError(null)
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setUser(userCredential.user)
                    setEmail('')
                    setPassword('')
                    setDisplay(null)
                    console.log(userCredential.user)
                })
                .catch((error) => {
                    console.log(error.message)
                    formatError(error.message)
                })
            
        } else {
            setError('Passwords must match.')
            setPassword('')
            setPassConf('')
        }
    }

    const formatError = (err) => {
        if (err === 'Firebase: Error (auth/invalid-email).') {
            setError('Please enter a valid email address.')
            setEmail('')
            setPassword('')
            setPassConf('')
        } else if (err === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
            setError('Password should be at least 6 characters.')
            setPassword('')
            setPassConf('')
        }
        
    }
    return (
        <div id='signup-form-container' className={display ? classes.modal : classes.hidden}>
            <form id='signup-form' className={classes.form}>
                <div className={classes.input}>
                    <label htmlFor='email-input'>Email</label>
                    <input type='email' id='email-input' required onChange={updateEmail} value={email}/>
                </div>
                <br />
                <div className={classes.input}>
                    <label htmlFor='password-input'>Password</label>
                    <input type='password' id='password-input' required onChange={updatePassword} value={password}/>
                </div>
                <br />
                <div className={classes.input}>
                    <label htmlFor='password-confirm'>Confirm Password</label>
                    <input type='password' id='password-confirm' required onChange={updatePassConf} value={passConf}/>
                </div>
                {error ? <span>{error}</span> : null}
                <br />
                <button className={classes.button} onClick={handleSubmit}>Sign Up</button>
            </form>
            
        </div>
    )
}

export default SignUpModal