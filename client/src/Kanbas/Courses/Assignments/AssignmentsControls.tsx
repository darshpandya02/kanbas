import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ProtectedRouteRole from "../ProtectedRouteRole";

export default function AssignmentsControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();

  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <div className="search-bar me-2 mb-2 float-start d-flex align-items-center">
        <CiSearch className="position-relative m-2 fs-4" />
        <input
          id="wd-search-assignment"
          className="form-control border-0"
          placeholder="Search..."
        ></input>
      </div>
      <div className="row float-end">
        <ProtectedRouteRole>
          <button
            id="wd-add-assignment-group"
            className="btn btn-lg btn-secondary mb-2 me-2 float-end col"
          >
            <FaPlus className="position-relative me-2" />
            Group
          </button>
        </ProtectedRouteRole>
        {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
          <a
            href={`#/Kanbas/Courses/${cid}/Assignments/New`}
            className="btn btn-lg btn-danger  me-2 mb-2 float-end col text-nowrap"
          >
            <FaPlus className="position-relative me-2" />
            Assignment
          </a>
        )}
      </div>
    </div>
  );
}
