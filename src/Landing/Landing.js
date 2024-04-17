import React, { useEffect, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { EventContext } from '../Context/EventContext';
import EventCard from '../Events/EventCard';

const useStyles = createUseStyles({
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minHeight: '700px',
    width: '100%',
    backgroundImage:
      'linear-gradient(to bottom, rgba(56, 17, 17, .72), rgba(60, 23, 89, .0))',
    zIndex: 3,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '150%',
    width: '100%',
    objectFit: 'cover',
    zIndex: '-2',
    maskImage: 'linear-gradient(black 10%, transparent)',
  },
  foreground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '150%',
    width: '100%',
    objectFit: 'cover',
    zIndex: '-1',
    opacity: '.6',
    maskImage: 'linear-gradient(black 10%, transparent)',
  },
  background2: {
    position: 'absolute',
    maskImage:
      'linear-gradient(transparent, black 10%, black 90%, transparent)',
    top: 300,
    left: 0,
    height: '150%',
    width: '100%',
    objectFit: 'cover',
    zIndex: '-3',
    opacity: 1,
    transitionProperty: 'opacity',
  },
  foreground2: {
    position: 'absolute',
    maskImage: 'linear-gradient(transparent, black 10%)',
    top: 0,
    left: 0,
    height: '150%',
    width: '100%',
    objectFit: 'cover',
    zIndex: '-3',
    opacity: 0,
    transitionProperty: 'opacity',
  },
  greeting: {
    fontFamily: "'Annie Use Your Telescope', cursive",
    fontSize: '50px',
    color: 'white',
    textShadow: '#381111 5px 0px 5px',
    textAlign: 'center',
    width: '50%',
    margin: 0,
    paddingBottom: '100px',
    filter: 'drop-shadow(10px 10px 1px #443356)',
    zIndex: 0,
    '@media (max-width: 900px)': {
      width: '75%',
    },
    '@media (max-height: 600px)': {
      width: '75%',
      fontSize: '35px',
    },
    '@media (max-width: 750px)': {
      fontSize: '35px',
    },
    '@media (max-width: 400px)': {
      fontSize: '25px',
      paddingBottom: '100px',
    },
  },
  logo: {
    width: '80%',
    maxWidth: '730px',
    height: 'auto',
    paddingRight: '50px',
    filter: 'drop-shadow(10px 10px 1px #443356)',
    zIndex: 0,
    '@media (max-height: 900px)': {
      width: '50%',
      height: 'auto',
    },
    '@media (max-width: 450px)': {
      width: '90%',
      height: 'auto',
      paddingRight: 0,
    },
  },
  contentContainer: {
    position: 'relative',
    paddingTop: '175px',
    padding: '15px',
    '@media (max-height: 900px)': {
      paddingTop: '15px',
    },
  },
  ehQuote: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    //color: 'white',
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    // background: 'white',
    // maskImage: 'linear-gradient(transparent, black 10%, black 90%, white)',
  },
  quoteText: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30px',
    paddingTop: '20px',
    fontSize: '28px',
    opacity: '0',
    transitionProperty: 'opacity',
    transitionDuration: '2s',
    '@media (max-width: 1150px)': {
      fontSize: '18px',
      width: '80%',
    },
  },
  span: {
    fontSize: '34px',
    opacity: '1',
    textShadow: 'white 1px 0px 4px',
    '@media (max-width: 1150px)': {
      fontSize: '22px',
    },
  },
  quoteAuth: {
    fontSize: '24px',
    opacity: '0',
    transitionProperty: 'opacity',
    transitionDuration: '2s',
    transitionDelay: '1s',
    '@media (max-width: 1150px)': {
      fontSize: '14px',
    },
  },
  sectionTitle: {
    width: '350px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '0px',
    borderRadius: '20px',
    fontFamily: "'Euphoria Script', cursive",
    fontSize: '65px',
    textAlign: 'center',
    textShadow: '#381111 1px 0px 20px',
    //background: 'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent)',
    filter: 'drop-shadow(2px 2px 1px #4045b2)',
    '@media (max-width: 450px)': {
      fontSize: '45px',
    },
  },
  moduleContainer: {
    width: '70%',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '20px',
    borderRadius: '30px',
    //background:
    //  'radial-gradient(ellipse at top, rgba(232, 232, 185, 0) 1%, rgba(207, 194, 213, .4)), radial-gradient(ellipse at bottom, rgba(185, 221, 232, .92), transparent)',
    //color: 'white',
    textShadow: '#e5d7d7 1px 0px 5px',
    //textAlign: 'start',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    '@media (max-width: 450px)': {
      width: '80%',
      flexFlow: 'column nowrap',
      alignItems: 'center',
    },
  },
  moduleTitle: {
    width: '100%',
    marginTop: '0px',
    marginBottom: '0px',
    fontFamily: "'Euphoria Script', cursive",
    textAlign: 'center',
    fontSize: '50px',
    '@media (max-width: 450px)': {
      fontSize: '30px',
      textAlign: 'center',
    },
  },
  moduleSubtitle: {
    marginBottom: '0',
  },
  moduleText: {
    width: '100%',
    textAlign: 'justify',
    flexGrow: 2,
    fontSize: '18px',
    margin: 0,
    '@media (max-width: 450px)': {
      width: '100%',
      fontSize: '15px',
    },
  },
  cardContainer: {
    display: 'flex',
    flexFlow: 'row',
    overflowX: 'auto',
  },
  button: {
    //width: '150px',
    height: '60px',
    marginTop: '15px',
    fontFamily: "'Clicker Script', cursive",
    fontSize: '30px',
    fontWeight: 'bold',
    textShadow: '#e5d7d7 1px 0px 5px',
    textDecoration: 'none',
    color: 'white',
    // /padding: '10px',
    background:
      'radial-gradient(ellipse at top, rgba(64, 69, 178, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
    borderRadius: '30px',
    border: 'none',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    cursor: 'pointer',
    transition: 'opacity ease-in-out 1s',
    '@media (max-width: 720px)': {
      fontSize: '28px',
      //width: '140px',
      height: '60px',
      marginTop: '15px',
    },
    '@media (max-width: 450px)': {
      fontSize: '20px',
      //width: '110px',
      height: '40px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  buttonSpacer: {
    fontSize: '16px',
    fontFamily: "'Euphoria Script', cursive",
    margin: '15px',
    fontWeight: 'bold',
  },
  moduleImg: {
    display: 'block',
    width: '40%',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media (max-width: 450px)': {
      width: '80%',
    },
  },

  backgroundImg: {
    position: 'absolute',
    width: '100%',
    height: 'auto',
    zIndex: '-10',
  },
});

const Landing = () => {
  const classes = useStyles();

  const { meditations } = useContext(EventContext);

  useEffect(() => {
    window.addEventListener('scroll', animateBackground);
    window.addEventListener('scroll', animateQuote, true);
    return () => {
      window.removeEventListener('scroll', animateBackground);
      window.removeEventListener('scroll', animateQuote, true);
    };
  }, []);

  const animateBackground = () => {
    const starsFront = document.getElementById('stars-front');
    const starsBack = document.getElementById('stars-back');
    const clouds1 = document.getElementById('clouds-1');
    const clouds2 = document.getElementById('clouds-2');
    const landscape = document.getElementById('landscape');
    const logo = document.getElementById('logo');
    const greeting = document.getElementById('greeting');

    let value1 = window.scrollY;
    let value2 = window.scrollY + 3000;
    let value3 = window.scrollY + 5000;
    let value4 = window.scrollY + 4000;
    if (window.screen.availWidth === 1024) {
      value2 = window.scrollY + 3250;
    }

    if (window.scrollY === 0) {
      clouds2.style.opacity = 0;
      landscape.style.opacity = 0;
    } else {
      clouds2.style.opacity = 0.6;
      landscape.style.opacity = 0.6;
    }

    if (window.screen.availWidth === 1024) {
      starsBack.style.top = value1 * 0.25 + 'px';
      starsFront.style.top = value1 * 0.5 + 'px';
      clouds1.style.top = value2 * 0.15 + 'px';
      clouds2.style.top = value3 * 0.24 + 'px';
      landscape.style.top = value4 * 0.4 + 'px';
    } else {
      starsBack.style.top = value1 * 0.25 + 'px';
      starsFront.style.top = value1 * 0.5 + 'px';
      clouds1.style.top = value2 * 0.15 + 'px';
      clouds2.style.top = value3 * 0.25 + 'px';
      landscape.style.top = value4 * 0.43 + 'px';
    }

    logo.style.filter = `drop-shadow(10px ${10 - value1 * 0.03}px 1px #443356)`;
    greeting.style.filter = `drop-shadow(10px ${
      10 - value1 * 0.03
    }px 1px #443356)`;
  };

  const animateQuote = () => {
    const quoteText = document.querySelector('h2');
    const quoteAuth = document.querySelector('h3');
    const quoteEmph1 = document.getElementById('emph-1');
    const quoteEmph2 = document.getElementById('emph-2');

    if (window.scrollY > 200) {
      // quoteEmph1.style.opacity = 1
      // quoteEmph2.style.opactiy = 1
    }

    if (window.scrollY > 400) {
      quoteText.style.opacity = 1;
    }
    if (window.scrollY > 500) {
      quoteAuth.style.opacity = 1;
    }
  };

  return (
    <>
      <meta name="description" content="Using energy healing modalities such as Reiki, Access Consciousness, and Sound Healing, we strive to empower people to stand in their own sovereignty. Our group meditations provide a safe space for all."/>
      <div className={classes.header}>
        <img src="/4.png" className={classes.background} id="stars-back" />
        <img src="/2.png" className={classes.foreground} id="stars-front" />
        <img
          src="serenity-ignited-logo.png"
          width="50%"
          height="auto"
          className={classes.logo}
          id="logo"
        />
        <p
          className={classes.greeting}
          data-testid="landing-greeting"
          id="greeting"
        >
          Let us walk with you on your journey to find peace, happiness, and
          serenity.
        </p>
      </div>
      <img src="clouds 3.jpg" className={classes.background2} id="clouds-2" />
      <img src="clouds 4.jpg" className={classes.background2} id="clouds-1" />
      <img src="horizon 2.jpg" className={classes.foreground2} id="landscape" />
      <div className={classes.contentContainer}>
        <div className={classes.ehQuote}>
          <h2 className={classes.quoteText}>
            “A healer's power stems not from any special ability, but from
            maintaining the courage and awareness to{' '}
            <span id="emph-1" className={classes.span}>
              embody and express
            </span>{' '}
            the{' '}
            <span id="emph-2" className={classes.span}>
              universal healing
            </span>{' '}
            power that every human being naturally possesses.”
          </h2>
          <h3 className={classes.quoteAuth}>- Eric Micha'el Leventhal</h3>
        </div>

        <img src="Chakra Mandala.png" className={classes.moduleImg} />
        <h1 className={classes.sectionTitle}>What We Do</h1>
        <div className={classes.moduleContainer}>
          <h1 className={classes.moduleTitle}>Meditation Circles!</h1>
          <div>
            <p className={classes.moduleText}>
              Thursday nights are all about coming together to support each
              other in the physical realm while we venture within to receive
              individual guidance in the energetic realm.
              <br />
              <br />
              Anything from guided sessions to solely instrumental music will be
              offered. Some sessions will focus on specific topics, like
              overcoming stress and anxiety, while others will be purely to
              provide some peace and relaxation.
              <br />
              <br />
              Whether you are a beginner, or have been meditating for decades,
              you are welcome! Serenity Ignited is a safe, judgement-free space
              for everyone to ignite the serenity within.
              <br />
              <br />
              We currently have room for only 7, so be sure to reserve your spot
              in advance!
            </p>
          </div>
          <h2>Upcoming Meditations</h2>
          <div className={classes.cardContainer}>
            {meditations && meditations.length !== 0 ? (
              meditations.map((event) => {
                return <EventCard event={event} key={event._id} />;
              })
            ) : (
              <p className={classes.moduleText}>
                Looks like we don't have any meditation events coming up -
                please check back soon for updates!
              </p>
            )}
          </div>
        </div>

        <div className={classes.moduleContainer}>
          <h1 className={classes.moduleTitle}>Energy Healing</h1>
          <p className={classes.moduleText}>
            Put simply, Energy Healing is the means by which we restore
            energetic harmony within ourselves, to promote peace and well-being.
            It is a holistic approach to healing the mind and body, predicated
            upon the understanding that they are connected energetically in a
            powerful way. This connection is intricate and dynamic, yet fragile
            in that an imbalance of the energies within us will manifest
            physical and mental ailments. Energy Healing practitioners work to
            restore balance to the energetic body, alleviating the symptoms we
            experience by treating the root cause.
          </p>
          <h2 className={classes.moduleSubtitle}>Reiki</h2>
          <p className={classes.moduleText}>
            A large part of the benefits people see from receiving Reiki
            sessions stems from the cleansing of the Chakras. When they are
            clear of blocks and negative energy, the body may be able to defend
            itself against many issues. A Reiki healing session can help to
            release emotional wounds, relax the body and mind, and energize you
            when you feel drained, just to name a few of the many possible
            benefits!
          </p>
          <h2 className={classes.moduleSubtitle}>Access Bars</h2>
          <p className={classes.moduleText}>
            This healing modality helps to clear the subconscious by releasing
            beliefs, thought patterns, and emotions that no longer serve us
            using gentle pressure applied to specific areas of the head. An
            Access Bars healing session can help to release negative thought
            patterns and limiting beliefs and allow mental clarity.
          </p>
          <h2 className={classes.moduleSubtitle}>Sound Healing</h2>
          <p className={classes.moduleText}>
            You may already be familiar with the powerful effects of sound
            frequencies as they are the basis for modern day meditation music
            and binaural beats. The same concepts are at play in a sound healing
            session. Through the use of a variety of instruments such as Tibetan
            singing bowls, tuning forks, and drums, an atmosphere of specific
            vibratory resonance is applied to the physical and etheric body,
            restoring harmony and balance within each.
          </p>
          <div className={classes.buttonContainer}>
            <Link to="/booking" className={classes.button}>
              Book a Session
            </Link>
            <span className={classes.buttonSpacer}>OR</span>
            <Link to="/learn-more" className={classes.button}>
              Learn More
            </Link>
          </div>
        </div>
        <h1 className={classes.sectionTitle}>Coming Soon...</h1>
        <div className={classes.moduleContainer}>
          <h1 className={classes.moduleTitle}>Workshops</h1>
          <p className={classes.moduleText}>
            We all have within us the ability to connect with our spiritual
            nature and access tools to help us along our journey. Our single-day
            workshops are designed to share knowledge, wisdom, and guidance,
            aiding in the discovery and cultivation of these tools. Is there a
            topic you'd like to learn more about? Please let us know!
          </p>
        </div>
        <h1 className={classes.sectionTitle}>Our Mission</h1>
        <div className={classes.moduleContainer}>
          <p className={classes.moduleText}>
            Serenity Ignited, LLC is committed to helping people ignite the fire
            within themselves to move forward from past traumas and bring
            serenity to their lives. We strive to empower people to stand in
            their own sovereignty, allowing them to embrace their true Self, and
            to provide tools that sustain them on their journey forward as well
            as a safe space to build their foundation.
          </p>
          <div className={classes.buttonContainer}>
            <button className={classes.button}>Read More</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
