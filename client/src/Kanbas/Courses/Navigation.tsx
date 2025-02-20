import { Link, useLocation, useParams } from "react-router-dom";
export default function CoursesNavigation() {
  const { pathname } = useLocation();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0 me-2"
    >
      {links.map((link) => (
        <Link
          id={`wd-course-${link}-link`}
          to={link}
          key={link}
          className={`list-group-item border border-0 fs-5
              ${pathname.includes(link) ? "active" : "text-danger"}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
