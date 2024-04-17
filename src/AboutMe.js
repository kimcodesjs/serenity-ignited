import React from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    
    background: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        '-webkit-mask-image': 'linear-gradient(black 75%, transparent)',
        maskImage: 'linear-gradient(black 75%, transparent)',
        backgroundImage: 'linear-gradient(to bottom, rgba(57, 65, 96, .5), rgba(60, 23, 89, .0)),url("angel wings chakras 1.jpg")',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 35% bottom 45%',
        '@media (max-width: 600px)': {
            backgroundSize: 'fill'
        }
    },
    container: {
        
        position: 'absolute',
        width: '50%',
        '@media (max-width: 600px)': {
            width: '100%'
        },
        background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent)',
    },
    content: {
        padding: '40px',
        paddingLeft: '50px',
    },
    h1: {
        marginTop: '0',
        textShadow: '#e5d7d7 1px 0px 5px',
        fontFamily: "'Over the Rainbow', cursive",
    },
    p: {
        textShadow: '#e5d7d7 1px 0px 5px',
        fontSize: '1.3em'
    },
    h2: {
        textShadow: '#e5d7d7 1px 0px 5px',
    }
})

const AboutMe = () => {

    let classes = useStyles()

    return (
        <>
        <meta name="description" content="My name is Becky, and I am a trained practitioner in Reiki, Access Consciousness, and Sound Healing. I'm excited to join you on your journey!" />
        <div className={classes.background}></div>
        <div className={classes.container}>
            <div className={classes.content}>
                <h1 className={classes.h1}>Hello! And Welcome!!</h1>
                <p className={classes.p}>My name is Becky, and I'm so glad you found your way here! I hope you have found what you are looking for here, but if not, please let me know if there is anything I can help you find. Meanwhile, a little about me:</p>
                <p className={classes.p}>It’s hard to even know where to start. Just like many people, my life took several twists and turns throughout my adult life. I have studied Accounting with hopes of obtaining CPA credentials, worked for many different employers doing customer service, shipping, bookkeeping, and even just simply making sure production paperwork gets to the right people. Each and every experience brought me lessons that helped me grow as a person, but none felt like “my purpose”. I sought it out to the point of wondering if I even have a purpose.</p>
                <p className={classes.p}>What I guess I am trying to portray is, if you have not yet found your own path, it may not have presented itself just yet. I spent almost 3 decades investigating and searching, keeping my mind open and aware of whatever might be the next thing to try, before my path laid itself out in front of me. Meanwhile I raised 3 children and dealt with several relationships that failed. I’ve experienced narcissist after narcissist…some seemed to only be that because of me…until I finally declared out loud that I was worth more than what I had been allowing myself to have.</p>
                <p className={classes.p}>So I’m here to tell you – DON’T GIVE UP!</p>
                <p className={classes.p}>Whatever you do, keep going. Keep on keeping on, as they say. Allow life to happen FOR you. Take in as many lessons as you can. And when you start feeling stuck, ask questions. In fact, question everything to understand who you are. The TRUE you…not the You everyone says you *should* be. The You that you KNOW you are!</p>
                <p className={classes.p}>If you are struggling with that, know you are not alone. I hear you. I feel you. I am here if you would like support. All you need to do is reach out. Contact me or Book a session and we will get through it all together.</p>
                <h2 className={classes.h2}>Becky Kappell</h2>
            </div>
        </div>
        </>
    )

}

export default AboutMe