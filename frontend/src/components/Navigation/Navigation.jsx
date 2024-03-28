import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  return (
    <div className="navigation">
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
