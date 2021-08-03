import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { checkIsLogin } from '../../redux/slices/checkUserLoginSlice';
import { checkToken } from '../../utils/localStorage/localStorage';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  const isLogin = useSelector(state => state.checkUserLoginReducer.isLogin);
  const isLoginToken = checkToken();
  const dispatch = useDispatch();

  const renderButtonLogin = () => {
    if (isLoginToken) {
      dispatch(checkIsLogin(true));
    }
    if (isLogin || isLoginToken) {
      return (
        <li>
          <Link to="/login" className="nav-links-mobile" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      );
    } else {
      return (
        <li>
          <Link to="/login" className="nav-links-mobile" onClick={closeMobileMenu}>
            Login
          </Link>
        </li>
      );
    }
  };
  const renderButtonLoginDesktop = () => {
    if (isLoginToken) {
      dispatch(checkIsLogin(true));
    }
    if (isLogin || isLoginToken) {
      return (
        <Button buttonStyle="btn--outline" text="/" onClick={handleLogout}>
          Logout
          {/* <i className="fas fa-caret-down" /> */}
        </Button>
      );
    } else {
      return (
        <Button buttonStyle="btn--outline" text="/login">
          Login
        </Button>
      );
    }
  };
  const handleLogout = () => {
    dispatch(checkIsLogin(false));
    localStorage.removeItem('userLogin');
    closeMobileMenu();
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            CovidTracker
            <i class="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/countries/Vietnam" className="nav-links" onClick={closeMobileMenu}>
                Country
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/global" className="nav-links" onClick={closeMobileMenu}>
                Global
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-links" onClick={closeMobileMenu}>
                Signup
              </Link>
            </li>

            {renderButtonLogin()}

            {/* <li>
              <Link to="/login" className="nav-links-mobile" onClick={closeMobileMenu}>
                Login
              </Link>
            </li> */}
          </ul>
          {button && renderButtonLoginDesktop()}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
