import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Transition } from 'react-transition-group'

const useStyles = createUseStyles({
    
    h1: {
        margin: 0,
        fontFamily: "'Over the Rainbow', cursive",
        fontSize: '3rem',
        color: 'white',
        textShadow: '#381111 10px 10px 5px',
        textAlign: 'center',
        //filter: 'drop-shadow(10px 10px 1px #443356)',
        padding: '30px',
        opacity: 0,
        transition: 'opacity ease-in-out 1s',
        '@media (max-width: 920px)': {
            fontSize: '2.5rem',
            padding: '20px'
        }
    },
    greetingText: {
        width: '80%',
        maxWidth: '960px',
        fontSize: '1.5rem',
        color: 'white',
        textShadow: '#381111 10px 10px 5px',
        opacity: 0,
        transition: 'opacity ease-in-out 1s',
        '@media (max-width: 920px)': {
            width: '85%',
            fontSize: '1.25rem'
        }
    },
    button: {
        height: '60px',
        width: '170px',
        fontSize: '24px',
        opacity: 0,
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent)',
        borderRadius: '10px',
        border: 'none',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        cursor: 'pointer',
        transition: 'opacity ease-in-out 1s'
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
        <Transition in={inProp} timeout={1000} appear={true} onExited={exitComponent}>
            {state => (
                    <>    
                        <h1 className={classes.h1} id='greeting' style={{...textTransitionStyles[state]}}>Let's create your healing session!</h1>
                        <div className={classes.greetingText} id='text' style={{...textTransitionStyles[state]}}>        
                            <p >If you are new to energy healing, take a look at more information on Reiki and Access Consciousness. Please note that remote options are not available for Access Consciousness sessions. This energy healing modality requires light physical touch. There is more information on this on Access Bars page.</p>
                        </div>
                        <button onClick={onClick} className={classes.button} id='button' style={{...textTransitionStyles[state]}}>Get Started</button>
                    </>       
                )
            }
        </Transition>
    )
}

export default Greeting