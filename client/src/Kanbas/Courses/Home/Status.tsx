import { FaCheckCircle, FaBan } from "react-icons/fa";
import { LuImport } from "react-icons/lu";
import { LiaFileImportSolid } from "react-icons/lia";
import {
  IoHomeOutline,
  IoBarChartOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { BsWindowFullscreen } from "react-icons/bs";
import { TfiAnnouncement } from "react-icons/tfi";
import ProtectedRouteRole from "../ProtectedRouteRole";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px", marginLeft: 40 }}>
      <h2>Course Status</h2>
      <ProtectedRouteRole>
        <div className="d-flex mb-3">
          <div className="w-50 pe-1">
            <button className="btn btn-lg btn-secondary w-100 text-nowrap">
              <FaBan className="me-2 fs-5 mb-1" />
              Unpublish
            </button>
          </div>
          <div className="w-50">
            <button className="btn btn-lg btn-success w-100">
              <FaCheckCircle className="me-2 fs-5 mb-1" />
              Publish
            </button>
          </div>
        </div>

        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <LuImport className="me-2 fs-5" />
          Import Existing Content
        </button>
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <LiaFileImportSolid className="me-2 fs-5" />
          Import from Commons
        </button>
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <IoHomeOutline className="me-2 fs-5" />
          Choose Home Page
        </button>
      </ProtectedRouteRole>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BsWindowFullscreen className="me-2 fs-5" />
        View Course Stream
      </button>
      <ProtectedRouteRole>
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <TfiAnnouncement className="me-2 fs-5" />
          New Announcement
        </button>
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <IoBarChartOutline className=" me-2 fs-5" />
          New Analytics
        </button>
      </ProtectedRouteRole>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoNotificationsOutline className="me-2 fs-5" />
        View Course Notifications
      </button>
    </div>
  );
}
