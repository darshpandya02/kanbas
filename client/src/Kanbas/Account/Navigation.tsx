import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <div
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0 me-2"
    >
      {links.map((link) => (
        <Link
          id={`wd-course-${link}-link`}
          key={`wd-course-${link}-link`}
          to={link}
          className={`list-group-item border border-0 fs-5
              ${pathname.includes(link) ? "active" : "text-danger"}`}
        >
          {link}
        </Link>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          to={`/Kanbas/Account/Users`}
          className={`list-group-item border border-0 fs-5
            ${pathname.includes("Users") ? "active" : "text-danger"}`}
        >
          Users
        </Link>
      )}
    </div>
  );
}
