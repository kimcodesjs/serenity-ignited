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
    padding: '10px',
    textAlign: 'center',
    color: '#fdbd00',
    fontSize: '38px',
    //textShadow: '#381111 1px 0px 5px',
    textShadow: '#e5d7d7 1px 0px 5px',
    fontFamily: "'Euphoria Script', cursive",
  },
  span: {
    padding: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    color: '#fdbd00',
    fontSize: '38px',
    //textShadow: '#381111 1px 0px 5px',
    textShadow: '#e5d7d7 1px 0px 5px',
    '-webkit-user-select': 'none' /* Safari */,
    '-moz-user-select': 'none' /* Firefox */,
    '-ms-user-select': 'none' /* IE10+/Edge */,
    userSelect: 'none',
    fontFamily: "'Euphoria Script', cursive",
  },
});

const Navigation = ({ toggleMenu }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  // console.log(user);
  // useEffect(() => {
  //   animateNavMenu();
  // }, [display]);

  const handleLinkClicks = async (e) => {
    if (e.target.id === 'log-out') {
      logout();
      toggleMenu();
    } else {
      toggleMenu();
    }
  };

  // const animateNavMenu = () => {
  //   const navMenu = document.getElementById('nav-menu');
  //   if (display === 'nav-menu') {
  //     navMenu.style.opacity = '1';
  //   } else {
  //     navMenu.style.opacity = '0';
  //   }
  // };

  return (
    <div
      id="nav-menu"
      className={classes.navMenu}
      onClick={(e) => {
        e.preventDefault();
        handleLinkClicks(e);
      }}
    >
      <Link to="/">
        <img
          src="/serenity-ignited-logo.png"
          className={classes.menuLogo}
          id="menu-logo"
          onClick={toggleMenu}
        />
      </Link>
      <Link to="/learn-more" className={classes.navLink} id="info">
        Learn About Energy Healing
      </Link>
      <Link to="/booking" className={classes.navLink} id="book-a-session">
        Book a Session
      </Link>
      <Link to="/events" className={classes.navLink} id="events">
        Events
      </Link>
      <Link to="/contact-me" className={classes.navLink} id="contact-me">
        Contact Me
      </Link>
      <Link to="/about-me" className={classes.navLink} id="about-me">
        About Me
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
    </div>
  );
};

export default Navigation;
