import { FaUserCircle } from "react-icons/fa";
import PeopleDetails from "./Details";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PeopleTable({ users = [] }: { users?: any[] }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-people-table" className="me-2 ">
      <PeopleDetails />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col" className="col-1">
              Name
            </th>
            <th scope="col" className="col-1">
              Login ID
            </th>
            <th scope="col" className="col-1">
              Section
            </th>
            <th scope="col" className="col-1">
              Role
            </th>
            <th scope="col" className="col-1">
              Last Activity
            </th>
            <th scope="col" className="col-1">
              Total Activity
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr>
              <td className="wd-full-name text-nowrap text-danger me-4">
                {currentUser.role === "ADMIN" && (
                  <Link
                    to={`/Kanbas/Account/Users/${user._id}`}
                    className="text-decoration-none text-danger"
                  >
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name align-middle">
                      {user.firstName}&nbsp;
                    </span>
                    <span className="wd-last-name me-2 align-middle">
                      {user.lastName}
                    </span>
                  </Link>
                )}
                {currentUser.role !== "ADMIN" && (
                  <div>
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name align-middle">
                      {user.firstName}&nbsp;
                    </span>
                    <span className="wd-last-name me-2 align-middle">
                      {user.lastName}
                    </span>
                  </div>
                )}
              </td>
              <td className="wd-login-id me-2 align-middle">{user.loginId}</td>
              <td className="wd-section me-2 align-middle">{user.section}</td>
              <td className="wd-role me-2 align-middle">{user.role}</td>
              <td className="wd-last-activity me-2 align-middle">
                {user.lastActivity &&
                  new Date(user.lastActivity).toLocaleDateString("en-US")}
              </td>
              <td className="wd-total-activity me-2 align-middle">
                {user.totalActivity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
