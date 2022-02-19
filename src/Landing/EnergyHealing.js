import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    ehContainer: {
        position: 'relative',
        bottom: '29px',
        //backgroundImage: 'linear-gradient(to top, rgba(25, 23, 89, .92), rgba(60, 23, 89, .0))'
    },
    ehQuote: {
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        height: '500px',
        overflow: 'hidden',
        maskImage: 'linear-gradient(transparent, black 10%, black 90%, transparent)',
    },
    span: {
        fontSize: '28.8px',
        opacity: '1',
        textShadow: '#381111 1px 0px 4px',
        "@media (max-width: 1150px)": {
            fontSize: '22px'
        }
    },
    h2: {
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '30px',
        opacity: '0',
        transitionProperty: 'opacity',
        transitionDuration: '2s',
        "@media (max-width: 1150px)": {
            fontSize: '18px'
        }
    },
    h3: {
        opacity: '0',
        transitionProperty: 'opacity',
        transitionDuration: '2s',
        transitionDelay: '1s',
        "@media (max-width: 1150px)": {
            fontSize: '14px'
        }
    },
    banner: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '600px',
        backgroundImage: 'url("Water-Fire Yin Yang.png")',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        '-webkit-mask-image': 'linear-gradient(transparent, black 5%, black 95%, transparent)',
        maskImage: 'linear-gradient(transparent, black 5%, black 95%, transparent)',
        overflow: 'hidden'
    },
    h1: {
        fontFamily: "'Over the Rainbow', cursive",
        fontSize: '50px',
        textShadow: '#381111 1px 0px 20px',
        "@media (max-width: 1040px)": {
            fontSize: '35px'
        },
        "@media (max-width: 740px)": {
            fontSize: '25px'
        }
    },
    ehText: {
        width: '75%',
        paddingLeft: '30px',
        paddingRight: '30px',
        margin: 'auto',
        fontSize: '20px'
    }    
})

const EnergyHealing = () => {
    const classes = useStyles()
    const animateQuote = () => {
        const quoteText = document.querySelector('h2')
        const quoteAuth = document.querySelector('h3')
        const quoteEmph1 = document.getElementById('emph-1')
        const quoteEmph2 = document.getElementById('emph-2')

        if (window.scrollY > 200) {
            // quoteEmph1.style.opacity = 1
            // quoteEmph2.style.opactiy = 1
        }
        
        if (window.scrollY > 300) {
            quoteText.style.opacity = 1
        }
        if (window.scrollY > 400) {
            quoteAuth.style.opacity = 1
        }
         
    }
    window.addEventListener('scroll', animateQuote, false)
    return (
        <div className={classes.ehContainer}>
            <div className={classes.ehQuote}>
                
                <h2 className={classes.h2}>“A healer's power stems not from any special ability, but from maintaining the courage and awareness to <span id='emph-1' className={classes.span}>embody and express</span> the <span id='emph-2' className={classes.span}>universal healing</span> power that every human being naturally possesses.”</h2>
                <h3 className={classes.h3}>- Eric Micha'el Leventhal</h3>
            </div>
            <div className={classes.banner}>
                
            </div>
            <div className={classes.ehText}>
            <h1 className={classes.h1}>Experience Serenity in Healing</h1>
                <p>Put simply, Energy Healing is the means by which we restore energetic harmony within ourselves, to promote peace and well-being. Whether you are new to this experience or a seasoned recipient, my intention is to serve you in the best way I can to help you ignite your serenity! Just know that you and I are on this journey together. Some may be further along on their healing journey than others, but we all have opportunity every day to heal one more thing or two that will move us even further forward on our own paths.</p>
                <p>There are many modalities in the world of energy healing. As of September, 2021 I offer two options for my clients - Reiki and Access Bars. I am looking to add sound healing therapy to the menu in 2022, and I'm sure I will be made aware of other ways to serve people as I move forward with you on the healing journey.</p>
                <p>For now, I wanted to share a bit about the two options to hopefully help you choose the one that suits you best. Both Reiki and Access Bars move stagnant energies out of the body that no longer serve you. However, they each have a specific way of supporting people with the healing process that sets them apart from each other.</p>
                <p>Reiki works through the chakras clearing energetic blocks and helping the life force energy flow more smoothly in the body which in turn helps people feel better, think more clearly and sometimes remember their own personal worth and value. Sessions can be done in person or remotely. Remote sessions work because we are all connected energetically, and it is the Universal Life Force Energy that is flowing through to help heal what needs attention in each session. It does not need a physical connection to do its work.</p>
                <p>Access Bars works through light touch on 32 specific points located on the head where energetic resemblances of thoughts, ideas, beliefs, conclusions and considerations reside. These can be your own, or ones that you have adopted through other people or situations in your life. Regardless of how you have acquired them, they can hold you back from being the best you possible; especially if they are not yours. It's just like acupressure, but focused on the head rather than the whole body. Because Access Bars requires the light touch of the practitioner to facilitate the energy shifts, these sessions cannot be done remotely.</p>
            </div>
        </div>
    )
}

export default EnergyHealing