import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    ehContainer: {
        position: 'relative',
        bottom: '29px',
        //backgroundImage: 'linear-gradient(to top, rgba(25, 23, 89, .92), rgba(60, 23, 89, .0))'
    },
    quoteBlock: {
        // display: 'inline-flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        height: '35vh',
        overflow: 'hidden'
    },
    ehTitle: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50vh',
        backgroundImage: 'url("Water-Fire Yin Yang.png")',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        //textAlign: 'center'
        overflow: 'hidden'
    },
    h1: {
        fontSize: '50px',
        color: 'white',
        textShadow: '#46af4f 1px 0px 20px'
    },
    ehText: {
        paddingLeft: '30px',
        paddingRight: '30px'
    }    
})

const EnergyHealing = () => {
    const classes = useStyles()

    return (
        <div className={classes.ehContainer}>
            <div className={classes.quoteBlock}>
                <h2>“A healer's power stems not from any special ability, but from maintaining the courage and awareness to embody and express the universal healing power that every human being naturally possesses.”</h2>
                <h3>- Eric Micha'el Leventhal</h3>
            </div>
            <div className={classes.ehTitle}>
                <h1 className={classes.h1}>Energy Healing</h1>
            </div>
            <div className={classes.ehText}>
                <p>Whether you are new to energy healing or a seasoned recipient, my intention is to serve you in the best way I can to help you ignite your serenity! Just know that you and I are on this journey together. Some may be further along on their healing journey than others, but we all have opportunity every day to heal one more thing or two that will move us even further forward on our own paths.</p>
                <p>I would like to start by saying there are many modalities in the world of energy healing. As of September, 2021 I offer two options for my clients - Reiki and Access Bars. I am looking to add sound healing therapy to the menu in 2022, and I'm sure I will be made aware of other ways to serve people as I move forward with you on the healing journey.</p>
                <p>For now, I wanted to share a bit about the two options to hopefully help you chose the one that suits you best. Both Reiki and Access Bars move stagnant energies out of the body that no longer serve you. However, they each have a specific way of supporting people with the healing process that sets them apart from each other.</p>
                <p>Reiki works through the chakras of the body by clearing energetic blocks and helping the life force energy flow more smoothly in the body which in turn helps people feel better, think more clearly and sometimes remember their own personal worth and value. Sessions can be done in person or remotely. Remote sessions work because we are all connected energetically, and it is the Universal Life Force Energy that is flowing through to help heal what needs attention in each session. It does not need a physical connection to do its work.</p>
                <p>Access Bars works through light touch on 32 specific points located on the head where energetic resemblances of thoughts, ideas, beliefs, conclusions and considerations reside. These can be your own, or ones that you have adopted through other people or situations in your life. Regardless of how you have acquired them, they can hold you back from being the best you possible; especially if they are not yours. It's just like acupressure, but focused on the head rather than the whole body. Because Access Bars requires the light touch of the practitioner to facilitate the energy shifts, these sessions cannot be done remotely.</p>
            </div>
        </div>
    )
}

export default EnergyHealing