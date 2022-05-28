import React from 'react'
import { useTransition, animated } from '@react-spring/web'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    viewTransition: {
        opacity: 0,
    }
})

const ViewTransition = (props) => {
    
    const classes = useStyles()

    const transition = useTransition(props.isMounted, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    return transition(
        (styles, item) => item && 
            <animated.div style={styles} className={classes.viewTransition}>
                {props.children}
            </animated.div>
    )
}

export default ViewTransition