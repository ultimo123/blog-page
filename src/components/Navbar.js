import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";
import { Avatar } from "@material-ui/core";
import "../styling/navbar.css";
import { GoogleLogout } from "react-google-login";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("tech");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };

  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  return (
    <div className="navbar">
      <h1 className="navbar__header">BlogMania 🤔 </h1>
      {isSignedIn && (
        <div className="blog__search">
          <input
            type="text"
            className="search"
            placeholder="Search for a Blog"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleClick}>
            Search
          </button>
        </div>
      )}
      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar
            className="user"
            src={userData?.imageUrl}
            alt={userData?.name}
          />
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout
            clientId="699595027574-gae72dsnq42ilkuuai69ghjab240bbc8.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button"
              >
                Log Out
              </button>
            )}
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        <h1 className="notSignedIn">User not available 😿</h1>
      )}
    </div>
  );
};

export default Navbar;
