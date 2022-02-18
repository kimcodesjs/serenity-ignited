import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    contactContainer: {
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92), transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent), url("/angel wings chakras 1.jpg")',
        backgroundAttachment: 'fixed',
        padding: '50px',
        width: '100%',
        minHeight: '100%',
        fontFamily: "'Over the Rainbow', cursive",
    }
})

const ContactMe = () => {

    const classes = useStyles()
    return (
        <div className={classes.contactContainer}>
            <h1>How would you prefer to get in touch?</h1>
            <p>contact info here...</p>
        </div>
    )

}

export default ContactMe