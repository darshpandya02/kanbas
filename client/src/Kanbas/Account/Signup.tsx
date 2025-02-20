import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
    } catch (error) {
      console.error("Caught: ", error);
    }
  };
  return (
    <div id="wd-signup-screen" style={{ minWidth: "300px" }} className="w-25">
      <h3>Sign up</h3>
      <input
        placeholder="username"
        className="form-control mb-2"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        type="password"
        className="form-control mb-2"
      />
      <button onClick={signup} className="btn btn-primary w-100 mb-2">
        Sign up
      </button>
      <Link to="/Kanbas/Account/Signin">Sign in</Link>
    </div>
  );
}
