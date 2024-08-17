import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const useStyles = createUseStyles({
  navMenu: {
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    opacity: 1,
    transition: 'opacity 2s',
    overflow: 'hidden',
  },
  menuLogo: {
    filter: 'drop-shadow(5px 5px 1px #443356)',
    width: '280px',
    height: 'auto',
    marginTop: '25px',
    right: '5px',
  },
  navLink: {
    textDecoration: 'none',
    padding: '5px',
    margin: '10px',
    textAlign: 'center',
    color: '#fdbd00',
    fontSize: '38px',
    //textShadow: '#381111 1px 0px 5px',
    textShadow: '#e5d7d7 1px 0px 5px',
    fontFamily: "'Euphoria Script', cursive",
    filter: 'drop-shadow(2px 2px 1px #443356)',
    background:
      'radial-gradient(ellipse at top, rgba(68, 51, 86, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
    borderRadius: '30px',

    // backgroundColor: "#443356",
    // borderRadius: '20px'
  },
  span: {
    padding: '5px',
    margin: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    color: '#fdbd00',
    fontSize: '38px',
    //textShadow: '#381111 1px 0px 5px',
    textShadow: '#e5d7d7 1px 0px 5px',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    '-webkit-user-select': 'none' /* Safari */,
    '-moz-user-select': 'none' /* Firefox */,
    '-ms-user-select': 'none' /* IE10+/Edge */,
    userSelect: 'none',
    fontFamily: "'Euphoria Script', cursive",
    background:
      'radial-gradient(ellipse at top, rgba(68, 51, 86, .92), transparent), radial-gradient(ellipse at bottom, rgba(56, 17, 17, 1), transparent)',
    borderRadius: '30px',
  },
});

const Navigation = ({ toggleMenu }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLinkClicks = async (e) => {
    if (e.target.id === 'log-out') {
      logout();
      toggleMenu();
    } else {
      toggleMenu();
    }
  };

  return (
    <nav
      id="nav-menu"
      className={classes.navMenu}
      onClick={(e) => {
        e.preventDefault();
        handleLinkClicks(e);
      }}
    >
      <Link to="/" className={classes.navLink}>
        Home
      </Link>
      <Link to="/learn-more" className={classes.navLink} id="info">
        Discover
      </Link>
      <Link to="/booking" className={classes.navLink} id="book-a-session">
        Booking
      </Link>
      <Link to="/events" className={classes.navLink} id="events">
        Events
      </Link>
      <Link to="/contact-me" className={classes.navLink} id="contact-me">
        Contact
      </Link>
      <Link to="/about-me" className={classes.navLink} id="about-me">
        About
      </Link>
      {!user && (
        <Link
          to="/login"
          className={classes.navLink}
          id="log-in"
          state={{ authFlow: 'log-in' }}
        >
          Log In
        </Link>
      )}
      {!user && (
        <Link
          to="/login"
          className={classes.navLink}
          id="sign-up"
          state={{ authFlow: 'sign-up' }}
        >
          Sign Up
        </Link>
      )}
      {user && (
        <Link
          to={`${user._id}/my-sessions`}
          className={classes.navLink}
          id="my-sessions"
        >
          My Sessions
        </Link>
      )}
      {user && user.role === 'admin' && (
        <Link to="/admin" className={classes.navLink} id="admin">
          Admin Settings
        </Link>
      )}
      {user && (
        <span className={classes.span} id="log-out">
          Log Out
        </span>
      )}
    </nav>
  );
};

export default Navigation;
