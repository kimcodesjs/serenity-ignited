import React, { useState, useEffect } from 'react';
import OptionCard from './OptionCard';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  viewContainer: {
    height: '88vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    overflowX: 'hidden',
  },
  viewPrompt: {
    marginLeft: '10px',
    marginRight: '10px',
    '@media (max-width: 920px)': {
      fontSize: '24px',
      marginLeft: '20px',
      marginRight: '20px',
    },
  },
  modalitySelection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    background:
      'radial-gradient(ellipse at top, rgba(232, 232, 185, .92) 1%, transparent), radial-gradient(ellipse at bottom, rgba(232, 232, 185, .92), transparent)',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    '& label': {
      fontSize: '18px',
      textAlign: 'center',
      width: '110px',
      WebkitUserSelect: 'none' /* Safari */,
      MozUserSelect: 'none' /* Firefox */,
      msUserSelect: 'none' /* IE10+/Edge */,
      userSelect: 'none' /* Standard */,
      cursor: 'pointer',
      borderRadius: '10px',
      '@media (max-width: 300px)': {
        fontSize: '14px',
        width: '70px',
      },
    },
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
});

const Session = ({ setSession, session, sessions }) => {
  const classes = useStyles();

  const [activeModality, setActiveModality] = useState('Reiki');

  const displayOptions = () => {
    if (activeModality === 'Packages')
      return sessions.filter((session) => session.modality.length >= 2);
    return sessions.filter((session) =>
      session.modality.includes(activeModality)
    );
  };
  return (
    <div className={classes.viewContainer}>
      <h1 className={classes.viewPrompt}>Choose your healing session:</h1>

      <div className={classes.modalitySelection}>
        <input
          type="radio"
          name="modality-selection"
          value="Reiki"
          id="reiki"
          className={classes.modalityInput}
          onChange={(e) => setActiveModality(e.target.value)}
        />
        <label
          htmlFor="reiki"
          className={
            activeModality === 'Reiki' ? classes.modalitySelected : null
          }
        >
          Reiki
        </label>
        <input
          type="radio"
          name="modality-selection"
          value="Access Consciousness"
          id="access-consciousness"
          className={classes.modalityInput}
          onChange={(e) => setActiveModality(e.target.value)}
        />
        <label
          htmlFor="access-consciousness"
          className={
            activeModality === 'Access Consciousness'
              ? classes.modalitySelected
              : null
          }
        >
          Access
        </label>
        <input
          type="radio"
          name="modality-selection"
          value="Packages"
          id="packages"
          className={classes.modalityInput}
          onChange={(e) => setActiveModality(e.target.value)}
        />
        <label
          htmlFor="packages"
          className={
            activeModality === 'Packages' ? classes.modalitySelected : null
          }
        >
          Packages
        </label>
      </div>
      <div className={classes.optionContainer}>
        {displayOptions().map((option) => (
          <OptionCard
            key={option._id}
            option={option}
            setActive={setSession}
            active={session && session._id === option._id ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default Session;
