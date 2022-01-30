import React from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    container: {
        padding: '40px',
        paddingLeft: '50px',
        position: 'absolute',
        width: '50%',
        '@media (max-width: 600px)': {
            width: '75%'
        }
    },
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
        backgroundPosition: 'center',
        '@media (max-width: 600px)': {
            backgroundSize: 'fill'
        }
    },
    h1: {
        marginTop: '0',
        textShadow: '#e5d7d7 1px 0px 5px',
    },
    p: {
        textShadow: '#e5d7d7 1px 0px 5px', 
    },
    h2: {
        textShadow: '#e5d7d7 1px 0px 5px',
    }
})

const AboutMe = () => {

    let classes = useStyles()

    return (
        <>
        <div className={classes.background}></div>
        <div className={classes.container}>
            
            <h1 className={classes.h1}>Hello! And Welcome!!</h1>
            <p className={classes.p}>My name is Becky, and I'm so glad you found your way here! Please...make yourself at home and comfortable. I have so much I would love to share with you all, but I don't want to keep you for too long. I may add a blog page for this type of thing, so check back for that if you'd like. For now, I'll keep it as short and simple as I can.</p>
            <p className={classes.p}>In 2001 I started making Melt & Pour soaps, which is the clear soap you sometimes see around that most people refer to as Glycerin soap. I had woken up one morning with this idea, and I never did figure out where it came from. I suppose one could say it was a calling of sorts. Six years later I researched and read everything I could find on how to make soap from scratch. This is the type I like to call the "olden days" soap, where lye and oils are mixed together and it becomes soap. But trust me when I say it is 100% safe to use.</p>
            <p className={classes.p}>Then in 2019, I was looking for a podcast on Mindfulness. This ended up leading to another podcast which led to an astrologer that does birth chart readings. Before I even really thought about what I was doing I had bought one (weird...I know). I received it New Year's Eve morning. In hindsight, this was another chain of events one could classify as a calling, because that reading brought my awareness to Reiki energy healing. A few months later I began studying and took two classes to become Level 2 certified. So, it has been quite the journey for sure. But I wouldn't trade any of it for anything.</p>
            <p className={classes.p}>Well, I won't keep you any longer. But before you go, may I suggest browsing the <Link to='/serenity-in-soap'>Soaps</Link> page? I go into more detail about how they're made there. Or perhaps you're interested in learning a little more about energy healing over on the <Link to='/serenity-in-healing'>Reiki Healing</Link> pages. Learn what it is, and whether it's right for you.</p>
            <p className={classes.p}>Whether you select a soap or a session, it would be an honor to help you get your Serenity Ignited! And should you have any questions, please feel free to send me a note. I would love to hear from you!</p>

            <h2 className={classes.h2}>Becky Kappell</h2>

        </div>
        </>
    )

}

export default AboutMe