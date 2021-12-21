import React, { useState, useEffect } from 'react'
import {createUseStyles} from 'react-jss'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

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
        height: '40vh',
        borderRadius: '.5em',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.69)'
        
    },
    hidden: {
        display: 'none' 
    },
    headerLogo: {
        filter: 'drop-shadow(5px 5px 1px #443356)',
        width: '280px',
        height: 'auto',
        marginTop: '25px',
        right: '5px'
        
    },
    h4: {
        height: '15%',
        width: '100%',
        margin: 0,
        marginTop: '5px',
        marginBottom: '10px',
        textAlign: 'center',
        fontSize: '2em',
        textShadow: '0 0 3px #FF0000, 0 0 5px #0000FF',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        marginLeft: '50px',
        marginRight: '50px'
    },
    button: {
        width: '20%'
    }
})

const SignInModal = ({ display, setDisplay, setUser }) => {

    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const auth = getAuth()
        if (error) {
            setError(null)
        }
        signInWithEmailAndPassword(auth, email, password)
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
            
        
    }

    const formatError = (err) => {
        if (err === 'Firebase: Error (auth/wrong-password).') {
            setError('ope... wrong password. type slower this time. :P')
            setPassword('')
        } else if (err === 'Firebase: Error (auth/user-not-found).') {
            setError('we couldn\'nt find an account for that email address...')
            setEmail('')
            setPassword('')
        }
        
    }
    return (
        <div id='sign-in-form-container' className={display ? classes.modal : classes.hidden}>
            <img src='/serenity-ignited-logo.png' className={classes.headerLogo} id='header-logo'/>
            <h4 className={classes.h4}>welcome back!</h4>
            <form id='sign-in-form' className={classes.form}>
                <div className={classes.input}>
                    <label htmlFor='email-input'>Email</label>
                    <br />
                    <input type='email' id='email-input' required onChange={updateEmail} value={email}/>
                </div>
                <br />
                <div className={classes.input}>
                    <label htmlFor='password-input'>Password</label>
                    <br />
                    <input type='password' id='password-input' required onChange={updatePassword} value={password}/>
                </div>
                <br />
                {error ? <span className={classes.error}>{error}</span> : null}
                <br />
                <button className={classes.button} onClick={handleSubmit}>log In</button>
            </form>
            
        </div>
    )
}

export default SignInModal