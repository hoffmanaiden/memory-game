import React from 'react';
import PropTypes from 'prop-types';
import './Styles/nav.css';

const Nav = ({ onNewGame }) => (
  <div className="nav">
    <div className="title">
      <span><a>Memory Game</a></span>
    </div>
    <div className="links">
      <span><a onClick={onNewGame}>New Game</a></span>
    </div>
  </div>
);

Nav.propTypes = {
  onNewGame: PropTypes.func.isRequired
};

export default Nav;