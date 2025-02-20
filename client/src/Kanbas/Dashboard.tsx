import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  unenroll,
  enroll,
  enrollmentsOnSwitch,
  setEnrollments,
} from "./reducer";
import * as enrollmentsClient from "./client";
import * as userClient from "./Account/client";
import { current } from "@reduxjs/toolkit";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  updateEnrollment,
  enrolling,
  setEnrolling,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
}) {
  const images = [
    { label: 1, path: "web" },
    { label: 2, path: "coop" },
    { label: 3, path: "ds" },
    { label: 4, path: "is" },
    { label: 5, path: "mism" },
    { label: 6, path: "orgb" },
    { label: 7, path: "phil" },
    { label: 8, path: "acct" },
    { label: 9, path: "coop" },
    { label: 0, path: "mism" },
  ];
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {(currentUser.role === "STUDENT" || currentUser.role === "FACULTY") && (
        <div>
          <button
            className="btn btn-primary float-end"
            id="wd-enrollments"
            onClick={() => setEnrolling(!enrolling)}
          >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        </div>
      )}
      {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
        <div>
          <div className="row align-items-center mb-2">
            <h5 className="col mb-0 d-flex align-items-center">
              New Course
              <button
                className="btn btn-warning me-2 ms-auto"
                onClick={updateCourse}
                id="wd-update-course-click"
              >
                Update
              </button>
              <button
                className="btn btn-primary"
                id="wd-add-new-course-click"
                onClick={addNewCourse}
              >
                Add
              </button>
            </h5>
          </div>

          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control mb-2"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <div className="row">
            <div className="col-md-4">
              <label
                htmlFor="new-course-number"
                className="col-mb-2 col-form-label"
              >
                Course Number
              </label>
              <input
                id="new-course-number"
                value={course.number}
                className="form-control mb-2"
                onChange={(e) =>
                  setCourse({ ...course, number: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label
                htmlFor="new-course-start"
                className="col-mb-2 col-form-label"
              >
                Start Date
              </label>
              <input
                id="new-course-start"
                value={course.startDate}
                type="date"
                className="form-control mb-2"
                onChange={(e) =>
                  setCourse({ ...course, startDate: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label
                htmlFor="new-course-end"
                className="col-mb-2 col-form-label"
              >
                End Date
              </label>
              <input
                id="new-course-end"
                value={course.endDate}
                type="date"
                className="form-control"
                onChange={(e) =>
                  setCourse({ ...course, endDate: e.target.value })
                }
              />
            </div>
          </div>
          <hr />
        </div>
      )}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses" className="mt-4 mb-4">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses &&
            courses.map((course, index) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
                key={index}
              >
                <div className="card rounded-3 overflow-hidden shadow-sm ">
                  <div className="wd-dashboard-course-link text-decoration-none text-dark ">
                    <img
                      src={`/images/${
                        images[
                          parseInt(course._id.slice(-1), 10) ||
                            Number(
                              String(
                                course._id.charCodeAt(course._id.length - 1)
                              )[0]
                            )
                        ].path
                      }.jpg`}
                      width="100%"
                      height={160}
                      alt=""
                    />
                    <div className="card-body ">
                      {course.enrolled && (
                        <Link
                          to={`/Kanbas/Courses/${course._id}/Home`}
                          className="wd-dashboard-course-title-number text-decoration-none fw-bold"
                        >
                          {course._id}.{course.number}.{course.startDate}
                        </Link>
                      )}
                      {!course.enrolled && (
                        <span className="wd-dashboard-course-title-number text-decoration-none fw-bold">
                          {course._id}.{course.number}.{course.startDate}
                        </span>
                      )}
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      {course.enrolled && (
                        <Link
                          className="wd-dashboard-course-button"
                          to={`/Kanbas/Courses/${course._id}/Home`}
                        >
                          <button className="btn btn-primary"> Go </button>
                        </Link>
                      )}
                      {!course.enrolled && (
                        <button className="btn btn-primary"> Go </button>
                      )}
                      {(currentUser.role === "FACULTY" ||
                        currentUser.role === "ADMIN") &&
                        !enrolling && (
                          <span>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                deleteCourse(course._id);
                              }}
                              className="btn btn-danger float-end"
                              id={`wd-delete-course-click-${course._id}`}
                            >
                              Delete
                            </button>
                            <button
                              id={`wd-edit-course-click-${course._id}`}
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                              }}
                              className="btn btn-warning me-2 float-end"
                            >
                              Edit
                            </button>
                          </span>
                        )}
                      {(currentUser.role === "STUDENT" ||
                        currentUser.role === "FACULTY") &&
                        enrolling && (
                          <span>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                updateEnrollment(course._id, !course.enrolled);
                              }}
                              className={`btn ${
                                course.enrolled ? "btn-danger" : "btn-success"
                              } float-end`}
                              id={`unenroll-button-${course._id}`}
                            >
                              {course.enrolled ? "Unenroll" : "Enroll"}
                            </button>
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
