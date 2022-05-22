import React, { useState } from 'react'
import OptionCard from './OptionCard'
import { createUseStyles } from 'react-jss'
import { Transition } from 'react-transition-group'


const useStyles = createUseStyles({
    viewContainer: {
        height: '89vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflowX: 'hidden',
        transition: 'opacity ease-in-out 1s'
    },
    viewPrompt: {
        marginLeft: '10px',
        marginRight: '10px',
        '@media (max-width: 920px)': {
            fontSize: '24px',
            marginLeft: '20px',
            marginRight: '20px'
        }
    },
    modalitySelection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent)',
        filter: 'drop-shadow(2px 2px 1px #443356)',
        '& label': {
            fontSize: '18px',
            textAlign: 'center',
            width: '110px',
            'WebkitUserSelect' : 'none', /* Safari */        
            'MozUserSelect': 'none', /* Firefox */
            'msUserSelect': 'none', /* IE10+/Edge */
            userSelect: 'none', /* Standard */
            cursor: 'pointer',
            borderRadius: '10px',
        }
    },
    modalityInput: {
        display: 'none',
    },
    modalitySelected: {
        background: 'radial-gradient(rgba(56, 17, 17, .92), transparent)',
        color: 'white',
    },
    optionContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
        maxWidth: '900px',
        borderRadius: '10px',
    },
    options: {
        
    },
    selected: {
        fontStyle: 'italic'
    }
})


const Session = ({ setSession, session }) => {

    const classes = useStyles()
    
    const [activeModality, setActiveModality] = useState('Reiki')
    
    // Session Objects
    const options = [
        {
            id: 'Sample Session',
            modality: 'Reiki',
            description: 'A short sample session for those who are interested in testing the waters without committing to a full price session.',
            duration: { hours: 0, minutes: 15 },
            price: 20,
            inPersonOnly: false
        },
        {
            id: 'General Healing',
            modality: 'Reiki',
            description: 'A general cleansing of the 7 major Chakras, plus one area of focus.',
            duration: { hours: 0, minutes: 30},
            price: 40,
            inPersonOnly: false
        },
        {
            id: 'In-Depth Healing',
            modality: 'Reiki',
            description: 'An extensive healing session targeting specific areas of improvement.',
            duration: { hours: 1, minutes: 0 },
            price: 65,
            inPersonOnly: false
        },
        {
            id: 'Access Bars',
            modality: 'Access Consciousness',
            description: 'A full-length Access Bars session to clear energy blockages in the subconscious mind.',
            duration: { hours: 1, minutes: 30 },
            price: 150,
            inPersonOnly: true
        },
        {
            id: 'Partial Access Bars',
            modality: 'Access Consciousness',
            description: 'A shorter Access Bars session.',
            duration: { hours: 0, minutes: 45 },
            price: 75,
            inPersonOnly: true
        },
        {
            id: 'Reiki + Access Bars',
            modality: 'Package Session',
            description: 'A powerful combination session of Reiki and Access Bars healing.',
            duration: { hours: 0, minutes: 45 },
            price: 75,
            inPersonOnly: true
        }
    ]
    
    return (
        <div className={classes.viewContainer}>       
            <h1 className={classes.viewPrompt}>Choose your healing session:</h1>
            
            <div className={classes.modalitySelection}>
                <input type='radio' name='modality-selection' value='Reiki' id='reiki' className={classes.modalityInput} onChange={(e) => setActiveModality(e.target.value)}/>
                    <label htmlFor='reiki' className={activeModality === 'Reiki' ? classes.modalitySelected : null}>Reiki</label>
                <input type='radio' name='modality-selection' value='Access Consciousness' id='access-consciousness' className={classes.modalityInput} onChange={(e) => setActiveModality(e.target.value)}/>
                    <label htmlFor='access-consciousness' className={activeModality === 'Access Consciousness' ? classes.modalitySelected : null}>Access</label>
                <input type='radio' name='modality-selection' value='Package Session' id='packages' className={classes.modalityInput} onChange={(e) => setActiveModality(e.target.value)}/>
                    <label htmlFor='packages' className={activeModality === 'Package Session' ? classes.modalitySelected : null}>Packages</label>
            </div>
            <div className={classes.optionContainer}>
                {options.filter(option => option.modality === activeModality).map(option => (
                        <OptionCard key={option.id} option={option} setActive={setSession} active={session && session.id === option.id ? true : false} />
                    )
                )}
            </div>
        </div>
    )
}

export default Session