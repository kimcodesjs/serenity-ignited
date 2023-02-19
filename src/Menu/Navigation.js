import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showAlert } from '../alert';

const useStyles = createUseStyles({
  menuLogo: {
    filter: 'drop-shadow(5px 5px 1px #443356)',
    width: '280px',
    height: 'auto',
    marginTop: '25px',
    right: '5px',
  },
  navMenu: {
    height: '700px',
    display: 'inline-flex',
    flexDirection: 'column',
    // alignItems: 'center',
    opacity: 0,
    transition: 'opacity 2s',
    overflow: 'hidden',
  },
  navLink: {
    textDecoration: 'none',
    padding: '10px',
    textAlign: 'center',
    color: 'black',
    fontSize: '30px',
    textShadow: '#381111 1px 0px 5px',
  },
  span: {
    padding: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '30px',
    textShadow: '#381111 1px 0px 5px',
    '-webkit-user-select': 'none' /* Safari */,
    '-moz-user-select': 'none' /* Firefox */,
    '-ms-user-select': 'none' /* IE10+/Edge */,
    userSelect: 'none',
  },
});

const Navigation = ({ display, setDisplay, user, setUser, toggleMenu }) => {
  const classes = useStyles();
  let navigate = useNavigate();
  useEffect(() => {
    animateNavMenu();
  }, [display]);

  const handleLinkClicks = async (e) => {
    console.log(e.target.id, display);
    if (e.target.id === 'log-in' || e.target.id === 'sign-up') {
      setDisplay(e.target.id);
    } else if (e.target.id === 'log-out') {
      try {
        const res = await axios({
          method: 'POST',
          url: 'http://127.0.0.1:3000/api/v1/users/logout',
          withCredentials: true,
        });
        if (res.data.status === 'success') {
          setUser(null);
          animateNavMenu();
          showAlert('Logged out successfully!');
          navigate('/');
        }
      } catch (err) {
        console.log(err.response.data.message);
      }
    } else {
      toggleMenu();
    }
  };

  const animateNavMenu = () => {
    const navMenu = document.getElementById('nav-menu');
    if (display === 'nav-menu') {
      navMenu.style.opacity = '1';
    } else {
      navMenu.style.opacity = '0';
    }
  };

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
      <Link to="/info" className={classes.navLink} id="info">
        Learn About Energy Healing
      </Link>
      <Link to="/booking" className={classes.navLink} id="book-a-session">
        Book a Session
      </Link>
      <Link to="/contact-me" className={classes.navLink} id="contact-me">
        Contact Me
      </Link>
      <Link to="/about-me" className={classes.navLink} id="about-me">
        About Me
      </Link>
      {!user && (
        <span className={classes.span} id="log-in">
          Log In
        </span>
      )}
      {!user && (
        <span className={classes.span} id="sign-up">
          Sign Up
        </span>
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
      {user && (
        <span className={classes.span} id="log-out">
          Log Out
        </span>
      )}
    </div>
  );
};

export default Navigation;
