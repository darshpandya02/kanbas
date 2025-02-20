import { AiOutlineDashboard, AiOutlineInbox } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineScience } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function KanbasNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Kanbas/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Kanbas/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Kanbas/Inbox", icon: AiOutlineInbox },
    { label: "Labs", path: "/Labs/Lab1", icon: MdOutlineScience },
  ];

  return (
    <div
      id="wd-kanbas-navigation"
      style={{ width: 110 }}
      className="list-group rounded-0 position-fixed
        bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        className="list-group-item bg-black border-0 text-center"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/images/NEU.png" width="75px" />
      </a>
      <Link
        to="/Kanbas/Account/"
        id="wd-account-link"
        className={`list-group-item text-center border-0 bg-black
            ${
              pathname.includes("Account")
                ? "bg-white text-danger"
                : "bg-black text-white"
            }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            pathname.includes("Account") ? "text-danger" : "text-white"
          }`}
        />
        <div>Account</div>
      </Link>

      {links.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          className={`list-group-item bg-black text-center border-0
              ${
                pathname.includes(link.label)
                  ? "text-danger bg-white"
                  : "text-white bg-black"
              }`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </Link>
      ))}
    </div>
  );
}
