import React, { useState, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { Transition } from 'react-transition-group'
import Greeting from './Greeting'
import ViewTracker from './ViewTracker'

const useStyles = createUseStyles({
    header: {
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        zIndex: 3,
        background: 'linear-gradient(to bottom, rgba(56, 17, 17, .72), rgba(60, 23, 89, .0))',
        transition: 'height ease-in-out 1.5s',
        
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        zIndex: '-2',
        transition: 'opacity ease-in-out 2s'
    },
    foreground: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        zIndex: '-1',
        opacity: '.6',
        transition: 'opacity ease-in-out 2s'
    }
})

const BookingHeader = ({ updateView, view, allowNextView }) => {
    const classes = useStyles()
    
    useEffect(() => {
        const header = document.getElementById('header')
        const foreground = document.getElementById('foreground')
        const background = document.getElementById('background')
        if (view !== null) {
            header.style.height = '10vh'
            header.style.flexDirection = 'row'
            foreground.style.opacity = 0
            background.style.opacity = 0
        }
    }, [view])
    
    return (
        <> 
            <div className={classes.header} id='header'>
                <img src='/2.png' className={classes.background} id='background'/>
                <img src='/3.png' className={classes.foreground} id='foreground'/>
                {view === null && <Greeting updateView={updateView} />}
                {view !== null && (
                      <ViewTracker view={view} updateView={updateView} allowNextView={allowNextView}/>
                )}
                
            </div>
        </>
    )
}

export default BookingHeader