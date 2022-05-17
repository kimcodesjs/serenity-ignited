import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { Transition } from 'react-transition-group'

const useStyles = createUseStyles({
    viewTracker: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent)',
        width: '100%',
        height: '15vh',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        zIndex: 5,
        transition: 'top ease-in-out 1s',
        overflow: 'hidden'
    },
    viewTitle: {
        filter: 'drop-shadow(2px 2px 1px #443356)',
        paddingLeft: '15px',
        paddingRight: '15px',
        fontSize: '42px',
        '@media (max-width: 920px)': {
            fontSize: '32px'
        }
    }
    
})

const arrowStyles = {
    filter: 'drop-shadow(2px 2px 1px #443356)',
    fontSize: '36px', 
    cursor: 'pointer',
    'WebkitUserSelect' : 'none', /* Safari */        
    'MozUserSelect': 'none', /* Firefox */
    'msUserSelect': 'none', /* IE10+/Edge */
    userSelect: 'none', /* Standard */
    transition: 'color ease-in-out .5s'
}

const disabledArrowStyles = {
    filter: 'drop-shadow(2px 2px 1px #443356)',
    fontSize: '36px', 
    'WebkitUserSelect' : 'none', /* Safari */        
    'MozUserSelect': 'none', /* Firefox */
    'msUserSelect': 'none', /* IE10+/Edge */
    userSelect: 'none', /* Standard */
    color: 'gray',
    transition: 'color ease-in .5s'
}

const ViewTracker = ({ view, updateView, allowNextView }) => {
    const classes = useStyles()

    const onArrowClick = (e) => {
        
        if (e.target.id === 'previous-view' && view !== 1) {
            updateView(view - 1)
        } else if (e.target.id === 'next-view' && allowNextView) {
            updateView(view + 1)
        }
    }

    const transitionStyles = {
        entering: { top: '-15vh' },
        entered: { top: 0 },
        exiting: { top: '-15vh' },
        exited: { top: '-15vh' }
    }
    
    return (
        <Transition in={view === null ? false : true} timeout={1000} appear={true} >
            {state => (
                <div className={classes.viewTracker} style={{...transitionStyles[state]}}>
                    <span className="material-symbols-outlined" style={view === 1 ? disabledArrowStyles : arrowStyles} id='previous-view' onClick={onArrowClick}>arrow_circle_left</span>
                        {view === 1 && <h1 className={classes.viewTitle}>Session</h1>}
                        {view === 2 && <h1 className={classes.viewTitle}>Connection</h1>}
                        {view === 3 && <h1 className={classes.viewTitle}>Schedule</h1>}
                        {view === 4 && <h1 className={classes.viewTitle}>Confirm</h1>}
                    <span className="material-symbols-outlined" style={allowNextView ? arrowStyles : disabledArrowStyles} id='next-view' onClick={onArrowClick}>arrow_circle_right</span>
                </div>
            )}
        
        </Transition>
    )
}

export default ViewTracker