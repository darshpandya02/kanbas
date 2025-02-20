import { FaPlus } from "react-icons/fa6";
import { FaCheckCircle, FaBan } from "react-icons/fa";

import QuizEditor from "./QuizEditor"; // Replace ModuleEditor with QuizEditor
import { useSelector } from "react-redux";
import ProtectedRouteRole from "../ProtectedRouteRole";

export default function QuizzesControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-quizzes-controls" className="text-nowrap d-block mb-3 p-0">
      {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
        <button
          id="wd-add-quiz-btn"
          className="btn btn-lg btn-danger m-1 ms-1 float-end"
          data-bs-toggle="modal"
          data-bs-target="#wd-add-quiz-dialog"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Quiz
        </button>
      )}
      <div className="dropdown d-inline m-1 float-end">
        <ProtectedRouteRole>
          <button
            id="wd-publish-all-quizzes-btn"
            className="btn btn-lg btn-secondary dropdown-toggle ms-1"
            type="button"
            data-bs-toggle="dropdown"
          >
            <FaCheckCircle
              className="position-relative me-2"
              style={{
                bottom: "1px",
                color: "green",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            Publish All
          </button>
        </ProtectedRouteRole>
        <ul className="dropdown-menu">
          <li>
            <div
              id="wd-publish-all-quizzes-and-items-btn"
              className="dropdown-item"
            >
              <FaCheckCircle
                className="position-relative me-2"
                style={{ bottom: "1px", color: "green" }}
              />
              Publish all quizzes and items
            </div>
          </li>
          <li>
            <div id="wd-publish-quizzes-only-button" className="dropdown-item">
              <FaCheckCircle
                className="position-relative me-2"
                style={{ bottom: "1px", color: "green" }}
              />
              Publish quizzes only
            </div>
          </li>
          <li id="wd-unpublish-all-quizzes-and-items">
            <div
              id="wd-unpublish-all-quizzes-and-items-button"
              className="dropdown-item"
            >
              <FaBan
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Unpublish all quizzes
            </div>
          </li>
          <li id="wd-unpublish-quizzes-only">
            <div
              id="wd-unpublish-quizzes-only-button"
              className="dropdown-item"
            >
              <FaBan
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Unpublish quizzes only
            </div>
          </li>
        </ul>
      </div>
      <button
        id="wd-collapse-all-quizzes"
        className="btn btn-lg btn-secondary m-1 float-end"
      >
        Collapse All
      </button>
      {/* <QuizEditor
        dialogTitle="Add Quiz"
        quizName={quizName}
        setQuizName={setQuizName}
        addQuiz={addQuiz}
      /> */}
    </div>
  );
}
