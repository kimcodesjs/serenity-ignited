import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  accessBanner: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '500px',
    backgroundImage: 'url("lady with book.png")',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '-webkit-mask-image':
      'linear-gradient(transparent, black 5%, black 95%, transparent)',
    maskImage: 'linear-gradient(transparent, black 5%, black 95%, transparent)',
    //textAlign: 'center'
    overflow: 'hidden',
  },
  h1: {
    fontSize: '40px',
    '@media (max-width: 700px)': {
      fontSize: '30px',
    },
  },
  accessText: {
    marginLeft: '10%',
    marginRight: '10%',
    paddingBottom: '10%',
    fontSize: '24px',
    '@media (max-width: 700px)': {
      fontSize: '18px',
    },
  },
});

const Access = () => {
  const classes = useStyles();
  return (
    <div className={classes.accessContainer}>
      <div className={classes.accessBanner} />
      <div className={classes.accessText}>
        <h1 className={classes.h1}>Understanding Access Consciousness</h1>
        <ul>
          <li className={classes.listItem}>
            Releases the beliefs you have agreed to hold as your own, but are
            not true
          </li>
          <li className={classes.listItem}>
            Cleans out energetic imprints that emotions and feelings have left
            in your mind from traumatic or unpleasant situations
          </li>
          <li className={classes.listItem}>
            Can bring the limiting beliefs you have into your awareness so you
            can choose different if they no longer make sense
          </li>
          <li className={classes.listItem}>
            Leaves you opportunities to bring peace, joy, and happiness into
            your life with ease
          </li>
          <li className={classes.listItem}>
            Supports your ability to release stress and anxiety
          </li>
          <li className={classes.listItem}>
            Reduces, or even eliminates, the constant mental chatter which
            allows for more mental clarity
          </li>
          <li className={classes.listItem}>
            Releases negative thought patterns that are holding you back from
            the life you have dreamt of having
          </li>
          <li className={classes.listItem}>
            Assists you in seeing the potential you hold as an infinite being
          </li>
        </ul>
        <p>
          "Consciousness is the ability to be present in your life in every
          moment, without judgment of you or anyone else. It is the ability to
          receive everything, reject nothing, and create everything you desire
          in life - greater than what you currently have, and more than what you
          can imagine" ~Gary Douglas~
        </p>
        <p>
          The concept of Access Bars was gifted to Gary Douglas through a
          meditation. Since then he has passed that gift of knowledge on to many
          practitioners. It is a relatively new concept, but is a potent healing
          modality. It focuses on the energetic imprint our thoughts, beliefs
          and emotions leave in our mind.
        </p>
        <p>
          I have read studies by scientists that say during our waking hours,
          about 80-90% of our actions are controlled by the subconscious mind.
          Think about that for just a moment...if our subconscious holds the
          majority of control, what is it basing its actions on? The beliefs,
          thoughts, ideas, feelings, emotions, memories and who knows what else
          that are stored in there. The energetic imprints we have decided to
          own, whether it was an original thought we had ourselves, or one
          someone else shared with us.
        </p>
        <p>
          What if you had control over what imprints you keep? What if you had a
          way to get rid of energy that is no longer serving you tied to people
          and situations you don't resonate with anymore? What if there was more
          to life than what today is for you?
        </p>
        <p>
          All this and more can be addressed, released and cleansed with an
          Access Bars session. Basically if you think about your brain as if it
          were a computer, a Bars session would be comparable to archiving or
          deleting files you no longer need. It gives you space to expand on
          what you determine is serving your best good, and makes room for new
          additions that allow you to be the infinite being you truly are.
          Another way to look at it is, it gives you back the control of your
          waking hours rather than running on auto-pilot.
        </p>
        <p>
          The more you get your Bars run, the more you begin to perceive how
          much effort it actually takes to function from thoughts, feelings,
          emotions and ideas. You also start to perceive the possibility of
          functioning from perceiving, knowing, being and receiving. It can open
          your awareness to areas that were on auto-pilot so you can take
          control back. You get to decide who you are, what your life is like,
          and what it means for you to live in peace, joy and happiness; if not
          everyday, at least more often than you maybe had been before.
        </p>
        <p>
          I encourage you to give Access Bars a try. If you have been feeling
          like you're stuck, lost or unhappy and can't figure out what to do
          about it, a Bars session may be able to help you. Worst case, you
          leave the session feeling like you just had a great massage. And if
          that's the worst thing that could happen, what do you have to lose?
        </p>
        <p>
          Would you like to <Link to="/booking">book a session</Link>?
        </p>
      </div>
    </div>
  );
};

export default Access;
