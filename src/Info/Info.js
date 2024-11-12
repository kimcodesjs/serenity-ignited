import React from 'react';
import Reiki from './Reiki';
import Access from './Access';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  banner: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    bottom: '30px',
    backgroundImage: 'url("Water-Fire Yin Yang.png")',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '-webkit-mask-image': 'linear-gradient(black 95%, transparent)',
    maskImage: 'linear-gradient(transparent, black 5%, black 95%, transparent)',
    overflow: 'hidden',
    zIndex: '2',
  },

  ehQuote: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    // background: 'white',
    // maskImage: 'linear-gradient(transparent, black 10%, black 90%, white)',
  },
  h1: {
    fontFamily: "'Euphoria Script', cursive",
    fontSize: '100px',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '30px',
    opacity: '1',
    textShadow: '#381111 1px 0px 4px',
    transitionProperty: 'opacity',
    transitionDuration: '2s',
    '@media (max-width: 700px)': {
      fontSize: '40px',
    },
    // textShadow: '#381111 1px 0px 20px',
    // '@media (max-width: 1040px)': {
    //   fontSize: '35px',
    // },
    // '@media (max-width: 740px)': {
    //   fontSize: '25px',
    // },
  },
  h2: {
    fontSize: '40px',
    marginTop: 0,
    '@media (max-width: 700px)': {
      fontSize: '30px',
    },
  },
  textContainer: {
    marginLeft: '10%',
    marginRight: '10%',
  },
  text: {
    fontSize: '24px',
    '@media (max-width: 700px)': {
      fontSize: '18px',
    },
  },
});

const LearningCenter = () => {
  const classes = useStyles();
  return (
    <>
      <meta
        name="description"
        content="Energy Healing is the means by which we restore energetic harmony within ourselves to promote peace and well-being. Read about energy healing in detail, including descriptions of the modalities we use."
      />
      <div className={classes.banner}>
        <div className={classes.ehQuote}>
          <h1 className={classes.h1}>
            Discover <br />
            Serenity in Healing
          </h1>
        </div>
      </div>
      <div className={classes.textContainer}>
        <h2 className={classes.h2}>Energy Healing</h2>
        <p className={classes.text}>
          Put simply, Energy Healing is the means by which we restore energetic
          harmony within ourselves, to promote peace and well-being. It is a
          holistic approach to healing the mind and body, predicated upon the
          understanding that they are connected energetically in a powerful way.
          This connection is intricate and dynamic, yet fragile in that an
          imbalance of the energies within us will manifest physical and mental
          ailments. Energy Healing practitioners work to restore balance to the
          energetic body, alleviating the symptoms we experience by treating the
          root cause.
        </p>
        <p className={classes.text}>
          There are many modalities in the world of energy healing. As of
          September, 2021 I offer two options for my clients - Reiki and Access
          Bars. I am looking to add sound healing therapy to the menu in 2022,
          and I'm sure I will be made aware of other ways to serve people as I
          move forward with you on the healing journey.
        </p>
        <p className={classes.text}>
          For now, I wanted to share a bit about the two options to hopefully
          help you choose the one that suits you best. Both Reiki and Access
          Bars move stagnant energies out of the body that no longer serve you.
          However, they each have a specific way of supporting people with the
          healing process that sets them apart from each other.
        </p>
        <p className={classes.text}>
          Reiki works through the chakras clearing energetic blocks and helping
          the life force energy flow more smoothly in the body which in turn
          helps people feel better, think more clearly and sometimes remember
          their own personal worth and value. Sessions can be done in person or
          remotely. Remote sessions work because we are all connected
          energetically, and it is the Universal Life Force Energy that is
          flowing through to help heal what needs attention in each session. It
          does not need a physical connection to do its work.
        </p>
        <p className={classes.text}>
          Access Bars works through light touch on 32 specific points located on
          the head where energetic resemblances of thoughts, ideas, beliefs,
          conclusions and considerations reside. These can be your own, or ones
          that you have adopted through other people or situations in your life.
          Regardless of how you have acquired them, they can hold you back from
          being the best you possible; especially if they are not yours. It's
          just like acupressure, but focused on the head rather than the whole
          body. Because Access Bars requires the light touch of the practitioner
          to facilitate the energy shifts, these sessions cannot be done
          remotely.
        </p>
      </div>
      <Reiki />
      <Access />
    </>
  );
};

export default LearningCenter;
