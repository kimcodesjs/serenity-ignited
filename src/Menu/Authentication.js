import React, { useState, useEffect } from 'react'
import {createUseStyles} from 'react-jss'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import UserInfoForm from './UserInfoForm'

const useStyles = createUseStyles({
    
    authContainer: {
        marginTop: '100px',
        display: 'inline-flex',
        height: '600px',
        opacity: '0',
        overflow: 'hidden',
        transition: 'opacity 1s'
        
    },
    form: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    formItem: {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        
    },
    inputLabel: {
        textShadow: '#e5d7d7 1px 0px 5px',
        
    },
    input: {
        backgroundColor: 'transparent',
        borderColor: '#381111',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        borderRadius: '10px',
        paddingLeft: '10px',
        outline: 'none',
        fontFamily: 'inherit',
        color: 'white'
    },
    button: {
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        backgroundColor: 'transparent',
        border: 'none',
        //borderRadius: '10px',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        cursor: 'pointer',
        fontFamily: 'inherit'
    },
    error: {
        marginLeft: '10px'
    }
})

const Authentication = ({ display, setDisplay, setUser }) => {

    const classes = useStyles()
    const [authFlow, setAuthFlow] = useState(display)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passConf, setPassConf] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        animateAuthView()
    }, [display])

    const animateAuthView = () => {
        const container = document.getElementById('authentication-form-container')
        if (display === 'sign-up' || display === 'log-in') {
            container.style.opacity = '1'
        } else {
            container.style.opacity = '0'
        }
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }
    const updatePassConf = (e) => {
        setPassConf(e.target.value)
    }
    const handleSignUp = (e) => {
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
                    setDisplay('nav-menu')
                    console.log(userCredential.user)
                }).then(() => {
                    updateProfile(auth.currentUser, {
                        displayName: `${firstName} ${lastName}`, phoneNumber: phone
                    })
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
    const handleLogIn = (e) => {
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
                setDisplay('auth-change')
                console.log(userCredential.user)
            })
            .catch((error) => {
                console.log(error.message)
                formatError(error.message)
            })
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
        } else if (err === 'Firebase: Error (auth/user-not-found).') {
            setError('we couldn\'nt find an account for that email address...')
            setEmail('')
            setPassword('')
        } else if (err === 'Firebase: Error (auth/wrong-password).') {
            setError('ope... wrong password. type slower this time. :P')
            setPassword('')
        } else {
            setError('an unknown error occured...')
        }
        
    }
    
    
    return (
        <div id='authentication-form-container' className={classes.authContainer}>
            {authFlow === 'sign-up' ? <UserInfoForm setFirstName={setFirstName} setLastName={setLastName} setPhone={setPhone} useStyles={useStyles} setAuthFlow={setAuthFlow} setDisplay={setDisplay}/> : (
            <form id='signup-form' className={classes.form}>
                <div className={classes.formItem}>
                    <label className={classes.inputLabel} htmlFor='email-input'>Email</label>
                    <input className={classes.input} type='email' id='email-input' required onChange={updateEmail} value={email}/>
                </div>
                <br />
                <div className={classes.formItem}>
                    <label className={classes.inputLabel} htmlFor='password-input'>Password</label>
                    <input className={classes.input} type='password' id='password-input' required onChange={updatePassword} value={password}/>
                </div>
                <br />
                {display === 'sign-up' && (
                <div className={classes.formItem}>
                    <label className={classes.inputLabel} htmlFor='password-confirm'>Confirm Password</label>
                    <input className={classes.input} type='password' id='password-confirm' required onChange={updatePassConf} value={passConf}/>
                </div>)}
                
                {error ? <span className={classes.error}>{error}</span> : null}
                <br />
                <button className={classes.button} onClick={display === 'sign-up' ? handleSignUp : handleLogIn}>Submit</button>
                <button className={classes.button} onClick={(e) => {
                    e.preventDefault()
                    setDisplay('nav-menu')
                }}>Return to Menu</button>
            </form>
            )}
        </div>
    )
}

export default Authentication