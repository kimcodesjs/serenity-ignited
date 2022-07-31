import React, { useEffect } from 'react'
import { createUseStyles, withTheme } from 'react-jss'

const useStyles = createUseStyles({

    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '700px',
        width: '100%',
        backgroundImage: 'linear-gradient(to bottom, rgba(56, 17, 17, .72), rgba(60, 23, 89, .0))',
        zIndex: 3,
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '110%',
        width: '100%',
        objectFit: 'cover',
        zIndex: '-2'
    },
    foreground: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '110%',
        width: '100%',
        objectFit: 'cover',
        zIndex: '-1',
        opacity: '.6',
        
    },
    greeting: {
        fontFamily: "'Annie Use Your Telescope', cursive",
        //fontStyle: 'italic',
        fontSize: '50px',
        //fontWeight: 'bold',
        color: 'white',
        textShadow: '#381111 5px 0px 5px',
        textAlign: 'center',
        width: '50%',
        margin: 0,
        paddingBottom: '100px',
        filter: 'drop-shadow(10px 10px 1px #443356)',
        zIndex: 0,
        "@media (max-width: 900px)": {
            width: '75%'
        },
        "@media (max-width: 750px)": {
            fontSize: '35px'
        },
        "@media (max-width: 400px)": {
            fontSize: '25px',
            paddingBottom: '100px'
        }
    },
    logo: {
        width: '80%',
        maxWidth: '730px',
        height: 'auto',
        paddingRight: '50px',
        filter: 'drop-shadow(10px 10px 1px #443356)',
        zIndex: 0,
        "@media (max-width: 400px)": {
            width: '90%',
            height: 'auto',
            paddingRight: 0
        }
    },
    contentContainer: {
        background: 'white',
        maskImage: 'linear-gradient(transparent, black 10%, black 90%, white)',
        paddingTop: '150px'
    },
    moduleContainer: {
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexFlow: 'column nowrap',
        "@media (max-width: 400px)": {
            flexFlow: 'column nowrap'
        }
    },
    moduleTitle: {
        width: '100%',
        marginBottom: '0px',
        fontFamily: "'Euphoria Script', cursive",
        fontSize: '50px',
    },
    moduleText: {
        width: '100%',
        textAlign: 'justify',
        flexGrow: 2,
        "@media (max-width: 400px)": {
            width: '100%'
        }
    },
    button: {
        width: '140px',
        height: '60px',
        fontFamily: "'Clicker Script', cursive",
        fontSize: '30px',
        textShadow: '#e5d7d7 1px 0px 5px',
        color: 'white',
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
    },
    moduleImg: {
        display: 'block',
        width: '40%',
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        "@media (max-width: 400px)": {
            width: '80%'
        }
    },
    sectionTitle: {
        marginBottom: '0px',
        fontFamily: "'Euphoria Script', cursive",
        fontSize: '65px',
        textAlign: 'center'
    }
})

const Landing = () => {
    const classes = useStyles()

    useEffect(() => {
        window.addEventListener('scroll', scrollStyleUpdates)
        return () => {
            window.removeEventListener('scroll', scrollStyleUpdates)
        }
    }, [])

    const scrollStyleUpdates = () => {
        const foreground = document.getElementById('foreground')
            const background = document.getElementById('background')
            const logo = document.getElementById('logo')
            const greeting = document.getElementById('greeting')
            let value = window.scrollY
    
            background.style.top = value * .25 + 'px'
            foreground.style.top = value * .5 + 'px'
            logo.style.filter = `drop-shadow(10px ${10 - (value*.03)}px 1px #443356)`
            greeting.style.filter = `drop-shadow(10px ${10 - value*.03}px 1px #443356)`
    }
    return (
        <>
            <div className={classes.header}>
                <img src='/4.png' className={classes.background} id='background'/>
                <img src='/1.png' className={classes.foreground} id='foreground'/>
                <img src='serenity-ignited-logo.png' width='50%' height='auto' className={classes.logo} id='logo'/>
                <p className={classes.greeting} id='greeting'>
                    Let us walk with you on your journey to find peace, happiness, and serenity.
                </p>
            </div>
            <div className={classes.contentContainer}>
                <div className={classes.moduleContainer}>
                    <h1 className={classes.moduleTitle}>Our Mission</h1>
                    <h3 className={classes.moduleText}>Serenity Ignited, LLC is committed to helping people ignite the fire within themselves to move forward from past traumas and bring serenity to their lives. We empower people to stand in their own sovereignty, allowing them to embrace their true Self. We offer healing to help people access what they hold inside, meditations to help shape awareness of the world around us, a safe space to talk about it while they build their foundation, and tools that sustain them on their journey forward.</h3>
                    <div className={classes.buttonContainer}>
                        <button className={classes.button}>Read More</button>
                    </div>
                </div>
                <img src='Chakra Mandala.png' className={classes.moduleImg}/>
                <h1 className={classes.sectionTitle}>What We Do</h1>
                <div className={classes.moduleContainer}>
                    <h1 className={classes.moduleTitle}>Meditation Circles!</h1>
                    <div className={classes.moduleText}>
                        <h3>Thursday nights are all about coming together to support each other in the physical realm while we venture within to receive individual guidance in the energetic realm.<br/>
                        <br/>Anything from guided sessions to solely instrumental music will be offered. Some sessions will focus on specific topics, like overcoming stress  and anxiety, while others will be purely to provide some peace and relaxation.<br/>
                        <br/>Whether you are a beginner, or have been meditating for decades, you are welcome! Serenity Ignited is a safe, judgement-free space for everyone to ignite the serenity within.<br/>
                        <br/>We currently have room for only 7, so click over to the Booking page to reserve your spot!</h3>
                    </div>
                    <div className={classes.buttonContainer}>
                        <button className={classes.button}>RSVP</button>
                    </div>
                </div>
            </div>
            <div className={classes.moduleContainer}>
                <h1 className={classes.moduleTitle}>Energy Healing</h1>
                <h3 className={classes.moduleText}>Put simply, Energy Healing is the means by which we restore energetic harmony within ourselves, to promote peace and well-being. It is a holistic approach to healing the mind and body, predicated upon the understanding that they are connected energetically in a powerful way. This connection is intricate and dynamic, yet fragile in that an imbalance of the energies within us will manifest physical and mental ailments. Energy Healing practitioners work to restore balance to the energetic body, alleviating the symptoms we experience by treating the root cause.</h3>
                <h2>Reiki</h2>
                <h3 className={classes.moduleText}>A large part of the benefits people see from receiving Reiki sessions stems from the cleansing of the Chakras. When they are clear of blocks and negative energy, the body may be able to defend itself against many issues.</h3>
                <h2>Access Bars</h2>
                <h3 className={classes.moduleText}>This healing modality helps to clear the subconscious by releasing beliefs, thought patterns, and emotions that no longer serve us using gentle pressure applied to specific areas of the cranium.</h3>

            </div>
        </>
    )

}

export default Landing