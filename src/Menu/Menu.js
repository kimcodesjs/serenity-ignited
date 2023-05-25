import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Navigation from './Navigation';

const useStyles = createUseStyles({
  menuToggle: {
    zIndex: 11,
    position: 'fixed',
    top: 0,
    right: 0,
    marginTop: '10px',
    marginRight: '10px',
    borderRadius: '50%',
    background: 'radial-gradient(rgba(185, 221, 232, .92) 10%, transparent)',
  },
  menuIcon: {
    transitionProperty: 'opacity',
    transitionDuration: '2s',
    transitionDelay: '1s',
    float: 'right',
    width: '60px',
    height: 'auto',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    cursor: 'pointer',
  },
  menuDiv: {
    display: 'inline-flex',
    flexDirection: 'column',
    backgroundImage:
      'linear-gradient(to bottom, rgba(56, 17, 17, .92), rgba(60, 23, 89, .0)),url("/3.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '300px',
    height: '100%',
    borderRadius: '10px 0% 0% 10px',
    zIndex: 10,
    position: 'fixed',
    right: '-310px',
    opacity: 0,
    transition: 'right 1s, opacity 1s',
    boxShadow: '-5px 2px 5px #443356',
  },
  authDiv: {
    marginTop: '100px',
    marginLeft: '50px',
    marginRight: 'auto',
  },
  button: {
    marginBottom: '10px',
    padding: '0',
    border: 'none',
    textAlign: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    background: 'transparent',
    textShadow: '#e5d7d7 1px 0px 5px',
    filter: 'drop-shadow(2px 2px 1px #443356)',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontFamily: 'inherit',
  },
});

const Menu = () => {
  const classes = useStyles();

  const [menuToggle, setToggle] = useState(false);

  const toggleMenu = () => {
    const menu = document.getElementById('menu');

    if (!menuToggle) {
      menu.style.right = '0';
      menu.style.opacity = 1;
      setToggle(true);
    } else {
      menu.style.right = '-310px';
      menu.style.opacity = 0;
      setToggle(false);
    }
  };

  return (
    <div>
      <div id="sidebar">
        <div className={classes.menuToggle} id="menu-toggle">
          <img
            src="/menu-icon.png"
            className={classes.menuIcon}
            id="menu-icon"
            onClick={toggleMenu}
          />
        </div>

        <div className={classes.menuDiv} id="menu">
          <Navigation toggleMenu={toggleMenu} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
