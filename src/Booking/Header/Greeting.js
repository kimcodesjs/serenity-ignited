import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Transition } from 'react-transition-group'

const useStyles = createUseStyles({
    greetingContainer: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '@media (max-width: 800px)': {
            //justifyContent: 'normal'
        }
    },
    logo: {
        width: '75%',
        maxWidth: '500px',
        height: 'auto',
        filter: 'drop-shadow(0px 0px 3px #443356)',
        transition: 'opacity ease-in-out 1s',
        '@media (max-width: 1200px)': {
            maxWidth: '300px',
        },
        '@media (max-width: 720px)': {
            maxWidth: '300px',
        }
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    h1: {
        margin: 0,
        fontFamily: "'Clicker Script', cursive",
        fontSize: '62px',
        //color: 'white',
        textShadow: '#381111 2px 2px 5px',
        textAlign: 'center',
        padding: '30px',
        paddingTop: '0px',
        paddingBottom: '30px',
        opacity: 0,
        transition: 'opacity ease-in-out 1s',
        zIndex: 8,
        '@media (max-width: 1200px)': {
            fontSize: '54px',
            maxWidth: '600px',
        },
        '@media (max-width: 720px)': {
            fontSize: '48px',
            maxWidth: '500px',
            paddingBottom: '10px'
        },
        '@media (max-width: 300px)': {
            fontSize: '38px',
            maxWidth: '500px'
        }
    },
    greetingText: {
        width: '80%',
        maxWidth: '700px',
        fontSize: '20px',
        //color: 'white',
        textShadow: '#381111 2px 2px 5px',
        textAlign: 'center',
        opacity: 0,
        transition: 'opacity ease-in-out 1s',
        zIndex: 8,
        '@media (max-width:720px)': {
            fontSize: '18px',
            maxWidth: '500px',
            '& p': {
                marginTop: '10px',
                marginBottom: '10px'
            }
            
        },
        '@media (max-width: 300px)': {
            fontSize: '14px',
            maxWidth: '500px'
        }
    },
    button: {
        // position: 'absolute',
        // bottom: '100px',
        height: '60px',
        width: '170px',
        marginTop: '30px',
        fontFamily: "'Clicker Script', cursive",
        fontSize: '32px',
        textShadow: '#e5d7d7 1px 0px 5px',
        color: 'white',
        opacity: 0,
        background: 'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
        borderRadius: '30px',
        border: 'none',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        cursor: 'pointer',
        transition: 'opacity ease-in-out 1s',
        '@media (max-width: 720px)': {
            fontSize: '28px',
            width: '140px',
            height: '60px',
            marginTop: '15px'
        },
        '@media (max-width: 300px)': {
            fontSize: '20px',
            width: '110px',
            height: '40px',
            marginTop: '15px'
        },
    }
})

const Greeting = ({ updateView }) => {

    const classes = useStyles()

    const [inProp, setInProp] = useState(true)

    const onClick = () => {
        setInProp(false)
    }
    
    const exitComponent = () => {
        updateView(1)
    }

    const textTransitionStyles = {
        entering: { opacity: 0 },
        entered:  { opacity: 1},
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 }
    }
    return (
        <Transition in={inProp} timeout={1000} appear={true} onExited={exitComponent} >
            {state => (
                    <div className={classes.greetingContainer}>  
                        
                            <img src='serenity-ignited-logo.png' className={classes.logo} style={{...textTransitionStyles[state]}}/>
                        
                        <div className={classes.textContainer}> 
                            <h1 className={classes.h1} id='greeting' style={{...textTransitionStyles[state]}}>Let's create your healing session!</h1>
                            <div className={classes.greetingText} id='text' style={{...textTransitionStyles[state]}}>        
                                <p >If you are new to energy healing, you may want to check out an in-depth explanation of each modality before you book a session.</p>
                                <p>Please get in touch with me if you would like to discuss what healing session might be best for you!</p>
                            </div>
                            <button onClick={onClick} className={classes.button} id='button' style={{...textTransitionStyles[state]}}>Get Started</button>
                        </div>
                    </div>       
                )
            }
        </Transition>
    )
}

export default Greeting