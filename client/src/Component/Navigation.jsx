import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Navigation.css";
const Navigation = () => {
  return (
    <ul className="Navigation">
      <img
        alt="Gacha-logo"
        className="Gacha-logo"
        src="https://raw.githubusercontent.com/Docomiot/gacha-image/main/logo.png"
      />
      <NavLink exact activeClassName="current" to="/">
        <li>Acceuil</li>
      </NavLink>
      <NavLink exact activeClassName="current" to="/CardGenerator">
        <li>Card Layer editor</li>
      </NavLink>
      <NavLink exact activeClassName="current" to="/ThreeDCard">
        <li> 3D Card</li>
      </NavLink>
      <NavLink exact activeClassName="current" to="/Element">
        <li>Card Reader</li>
      </NavLink>
      <NavLink exact activeClassName='current' to='/AnimationCreator'>
        <li>Animated</li>
      </NavLink>
      <NavLink exact activeClassName='current' to='/LeaderBoardItem'><li>LeaderBoard</li></NavLink>
    </ul>
  );
};

export default Navigation;
