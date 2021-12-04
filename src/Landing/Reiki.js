import React from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    reikiBanner: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '80vh',
        backgroundImage: 'url("cosmos and symbols.jpg")',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        overflow: 'hidden'
    },
    reikiTextBody: {
        width: '75%',
        paddingLeft: '30px',
        paddingRight: '30px',
        margin: 'auto',
        overflow: 'hidden'
    } 
})

const Reiki = () => {

    const classes = useStyles()
    return (
        <div className={classes.reikiContainer}>
            <div className={classes.reikiBanner} />
            <div className={classes.reikiTextBody}>
            <h1>A Deeper Look at Reiki</h1>
            <p>Reiki is a form of energy healing, with its origins in India and the East dating back many thousands of years to the time before Christ and Buddha. The original name, disciplines and techniques of Reiki were lost due to the traditional method of passing knowledge from generation to generation by word of mouth. It was rediscovered in the 19th century by Dr. Mikao Usui, who was a Japanese scholar and monk. It was he who began calling it REIKI.</p>
            <p>Reiki is a two syllable Japanese word meaning ‘universal life force’, and is represented by two Kanji characters - ’Rei’  and ‘Ki’. Although the proper Japanese pronunciation is RYE-KEY, it has been westernized to RAY-KEY.</p>
            <p>REI roughly translates to 'Universe' or 'God', present everywhere at the same time. Esoterically, REI means 'Spiritual Consciousness', the omniscient wisdom from God or the Higher Self.</p>
            <p>KI is the non physical vitality that gives life to all living things. Many cultures understand and recognize the importance of Ki energy and how it impacts our lives and well-being. It is the energy which circulates through all forms of life, and throughout the entire universe.</p>
            <p>Reiki knows no religion, but it does know Spirituality. I truly believe Reiki is healing energy directly from the Divine, much like the gift I believe Jesus had when he turned the tides of his time with his teachings. I haven't fully studied each and every religion, but I've read enough material to see the similarities between them all.</p>
            <p>We are all Divine beings, no matter our culture, and we all have the ability to tap into the healing energies we know today as Reiki. But generations of life circumstances have caused us to forget how. In a way, it's no different than when the knowledge was lost in ancient times. But Reiki will never cease to exist. It will always find its way to be noticed. No matter how much time passes, there will always be someone that brings it back to the forefront.</p>
            <p>I feel blessed to be just one of thousands in my lifetime that have been led to learn its ways. It is my intention to share this gift of healing to all those that want to bring more peace, serenity and joy to their lives.</p>
            <p>Would you like to <Link to='/booking'>book a session</Link>?</p>
            </div>
        </div>
    )
}

export default Reiki