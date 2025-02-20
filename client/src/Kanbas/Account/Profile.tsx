import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
    navigate(0);
  };

  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kanbas/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div id="wd-profile-screen" style={{ minWidth: "300px" }} className="w-25">
      <h3>Profile</h3>
      {profile && (
        <div>
          <input
            id="wd-username"
            placeholder="username"
            className="form-control mb-2"
            defaultValue={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <input
            id="wd-password"
            placeholder="password"
            className="form-control mb-2"
            defaultValue={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <input
            id="wd-firstname"
            placeholder="First Name"
            className="form-control mb-2"
            defaultValue={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <input
            id="wd-lastname"
            placeholder="Last Name"
            className="form-control mb-2"
            defaultValue={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <input
            id="wd-dob"
            type="date"
            className="form-control mb-2"
            defaultValue={profile.dob ? profile.dob.split("T")[0] : ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <input
            id="wd-email"
            className="form-control mb-2"
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            id="wd-role"
            value={profile.role}
            className="form-select mb-2"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
          >
            Update
          </button>
          <button
            onClick={signout}
            className="btn btn-danger w-100"
            id="wd-signout-btn"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
