import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const NavItem = ({ to, item, onClickEnabled, onClick, imageSrc }) => {
  const navigateTo = useNavigate();
  const [activeItems, setActiveItems] = useState({});

  const handleClick = (e) => {
    e.preventDefault();
    onClick(item);
    navigateTo(to);
    setActiveItems((prevActiveItems) => ({
      ...prevActiveItems,
      [to]: true,
    }));
  };

  return (
    <li className={`nav-item ${activeItems[to] ? "active" : ""}`}>
      {imageSrc && <img className="nav-item-image" src={imageSrc} alt="Nav Item" />}
      {onClickEnabled ? (
        <NavLink
          className={`link-list-item`}
          to={to}
          onClick={handleClick}
          activeclassname="active"
        >
          {item}
        </NavLink>
      ) : (
        <NavLink
          className={`link-list-item`}
          to={to}
          onClick={handleClick}
          activeClassName="active"
        >
          {item}
        </NavLink>
      )}
    </li>
  );
};

export default NavItem;
