import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import { userPostsArray } from "../../redux/posts";
import { thunkLoadPosts } from "../../redux/posts";
import { useModal } from "../../context/Modal";
import { thunkLogin } from "../../redux/session";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  const handleProfilePage = async (e) => {
    e.preventDefault();
    closeMenu();
    await dispatch(thunkLoadPosts());
    navigate('/user/current');
  };

  const handleDemoLogin = async () => {
    return await dispatch(thunkLogin({ email: 'demouser@demo.com', password: 'password' }));
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <i className="fas fa-user" />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <h3>{user.username}</h3>
              <button onClick={(e) => handleProfilePage(e)}>My Profile</button>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              <button className="demo-user-button" type="button" onClick={handleDemoLogin}>Demo User</button>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
