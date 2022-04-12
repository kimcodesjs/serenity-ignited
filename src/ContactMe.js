import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { collection, addDoc } from 'firebase/firestore'
import { db } from './index'

const useStyles = createUseStyles({
    contactContainer: {
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92), transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent), url("/4.png")',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        width: '100%',
        minHeight: '100%',
        
    },
    header: {
        fontFamily: "'Over the Rainbow', cursive",
        marginTop: '0',
        paddingTop: '50px',
        textShadow: '#381111 1px 0px 20px',
    },
    contactContent: {
        width: '80%',
        maxWidth: '960px',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    contactForm: {
        display: 'inline-flex',
        flexDirection: 'column'
    },
    input: {
        width: '200px'
    },
    textArea: {
        width: '300px',
        height: '200px',
        resize: 'none'
    },
    button: {
        marginRight: '25%',
        marginTop: '20px',
        width: '85px',
        textAlign: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        background: 'radial-gradient(ellipse at top, rgba(130, 150, 188, .7), transparent), radial-gradient(ellipse at bottom, rgba(130, 150, 188, .7), transparent)',
        textShadow: '#e5d7d7 1px 0px 5px',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        borderRadius: '10px',
        fontWeight: 'bold'
    },
    img: {
        width: '70%',
        maxWidth: '600px',
        height: 'auto'
    }
})

const ContactMe = () => {

    const classes = useStyles()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    
    const handleSubmit = async () => {
        const name = document.getElementById('name')
        const email = document.getElementById('email')
        const message = document.getElementById('message')
        await addDoc(collection(db, 'ContactSubmissions'), {
            name: name.value,
            email: email.value,
            message: message.value
        }).then(() => {
            console.log('Success! New Contact Submission has been logged in Firestore!')
            setSuccess(true)
            name.value = ''
            email.value = ''
            message.value = ''
        }).catch((error) => {
            console.log(error)
            setError('Something went wrong...')
        })
    }
    return (
        <div className={classes.contactContainer}>
            <div className={classes.contactContent}>
                <h1 className={classes.header}>I am looking forward to hearing from you!</h1>
                <div>
                    <form className={classes.contactForm}>
                        <label htmlFor='name'>Your Name:</label>
                        <input type='text' name='name' id='name' className={classes.input} required/>
                        <br />
                        <label htmlFor='email'>Email:</label>
                        <input type='email' name='email' id='email' className={classes.input}required/>
                        <br />
                        <label htmlFor='message'>What can I help you with?</label>
                        <textarea name='message' id='message' className={classes.textArea} required/>
                        <br />
                        <button className={classes.button} onClick={(e) => {e.preventDefault(); handleSubmit();}}>Submit</button>
                    </form>
                </div>
                <br />
                {success && <h3>Your message has been sent!</h3>}
                {error && <h3>{error}</h3>}
                <img className={classes.img} src='Namaste.png' />
            </div>
        </div>
    )

}

export default ContactMe