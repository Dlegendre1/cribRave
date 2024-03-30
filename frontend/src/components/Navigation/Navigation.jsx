import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  return (
    <div className="navigation">
      <NavLink to="/"><h1 className="title">Crib Rave</h1></NavLink>
      <ProfileButton />
    </div>
  );
}

export default Navigation;
