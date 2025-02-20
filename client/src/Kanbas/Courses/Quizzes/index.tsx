import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { RxRocket } from "react-icons/rx";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import QuizControlButtons from "./QuizControlButtons";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import { deleteQuiz, setQuizzes } from "./reducer";
import QuizGroupControlButtons from "./QuizGroupControlButtons";
import * as quizzesClient from "./client";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    if (currentUser.role === "STUDENT") {
      dispatch(
        setQuizzes(
          quizzes.filter((q: { published: boolean }) => q.published === true)
        )
      );
    } else {
      dispatch(setQuizzes(quizzes));
    }
  };

  const [attempts, setAttempts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAttempts = async () => {
      if (currentUser?._id) {
        try {
          const userAttempts = await quizzesClient.getUserAttempts(currentUser._id);
          setAttempts(userAttempts);
        } catch (err) {
          console.error("Error fetching user attempts:", err);
        }
      }
    };
    fetchAttempts();
  }, [currentUser]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div id="wd-quizzes" className="m-5">
      <div id="wd-search-quizzes-box" className="row">
        <div className="col-8">
          <div className="search-bar me-2 mb-2 float-start d-flex align-items-center">
            <CiSearch className="position-relative m-2 fs-4" />
            <input
              id="wd-search-assignment"
              className="form-control border-0"
              placeholder="Search..."
            ></input>
          </div>
        </div>
        {currentUser.role === "FACULTY" && (
          <div className="col-4">
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/@/Edit/Details`}>
              <button
                id="wd-add-quizzes"
                className="btn btn-lg btn-danger me-1 float-end"
              >
                <FaPlus
                  className="position-relative me-2"
                  style={{ bottom: "1px" }}
                />
                Quiz
              </button>
            </Link>
          </div>
        )}
      </div>
      <br />
      <br />
      <ul className="list-group rounded-0">
        <li className="list-group-item p-0 fs-5 border-gray">
          <div className="wd-title p-3 ps-3 bg-secondary">
            {currentUser.role === "FACULTY" && (
              <BsGripVertical className="me-2 fs-3" />
            )}
            QUIZZES
            <QuizGroupControlButtons />
          </div>
        </li>
        <ul id="wd-quizzes-list" className="list-group rounded-0">
          {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") &&
            quizzes.map(
              (quiz: {
                _id: string;
                title: string;
                course: string;
                availableFrom: Date;
                availableUntil: Date;
                dueDate: Date;
                points: number;
                questions: any[];
                published: boolean;
              }) => (
                <li className="wd-quiz-list-item list-group-item p-3 ps-1 fs-5">
                  <div className="row align-items-center">
                    <div className="col-1">
                      <BsGripVertical className="me-2 fs-3" />
                      <RxRocket className="fs-5 text-success" />
                    </div>
                    <div className="col-9">
                      <a
                        className="wd-quiz-link text-decoration-none text-dark h5"
                        href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                      >
                        {quiz.title}
                      </a>
                      <br />
                      <span className="custom-gray1 fw-bold">
                        {quiz.availableFrom &&
                          new Date(quiz.availableFrom) > new Date() &&
                          "Not available until"}
                        {quiz.availableUntil &&
                          new Date(quiz.availableUntil) < new Date() &&
                          "Closed"}
                        {quiz.availableFrom &&
                          new Date(quiz.availableFrom) <= new Date() &&
                          new Date(quiz.availableUntil) >= new Date() &&
                          "Available since"}
                        &nbsp;
                      </span>
                      <span className="">
                        <span className="custom-gray1">
                          {quiz.availableFrom &&
                            !(new Date(quiz.availableUntil) < new Date()) &&
                            new Date(quiz.availableFrom).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              }
                            )}
                          &nbsp;&nbsp;|&nbsp;&nbsp;
                          <strong>Due</strong>&nbsp;
                          {quiz.dueDate &&
                            new Date(quiz.dueDate).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          &nbsp;&nbsp;|&nbsp;&nbsp;{quiz.points}&nbsp;
                          pts&nbsp;&nbsp;|&nbsp;&nbsp; {quiz.questions.length}
                          &nbsp;Questions
                        </span>
                      </span>
                    </div>
                    <div className="col-2">
                      {cid && <QuizControlButtons quiz={quiz} cid={cid} />}
                    </div>
                  </div>
                </li>
              )
            )}
          {!(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") &&
            quizzes.map(
              (quiz: {
                _id: string;
                course: string;
                points: number;
                questions: any[];
                published: boolean;
                score: number;
                title: string;
                availableFrom: Date;
                availableUntil: Date;
                attempts: any[];
                dueDate: Date;
              }) => (
                <li className="wd-quiz-list-item list-group-item p-3 ps-3 fs-5">
                  <div className="row align-items-center">
                    <div className="col-1 ms-2" style={{ width: "4%" }}>
                      <RxRocket className="fs-5" />
                    </div>
                    <div className="col-11">
                      <a
                        className="wd-quiz-link text-decoration-none text-dark h5"
                        href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                      >
                        {quiz.title}
                      </a>
                      <br />
                      <span className="custom-gray1 fw-bold">
                        {quiz.availableFrom &&
                          new Date(quiz.availableFrom) > new Date() &&
                          "Not available until"}
                        {quiz.availableUntil &&
                          new Date(quiz.availableUntil) < new Date() &&
                          "Closed"}
                        {quiz.availableFrom &&
                          new Date(quiz.availableFrom) <= new Date() &&
                          new Date(quiz.availableUntil) >= new Date() &&
                          "Available"}
                        &nbsp;
                      </span>
                      <span className="">
                        <span className="custom-gray1">
                          {quiz.availableFrom &&
                            !(new Date(quiz.availableUntil) < new Date()) &&
                            new Date(quiz.availableFrom).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              }
                            )}
                          &nbsp;&nbsp;|&nbsp;&nbsp;
                          <strong>Due</strong>&nbsp;
                          {quiz.dueDate &&
                            new Date(quiz.dueDate).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          &nbsp;&nbsp;|&nbsp;&nbsp;{quiz.points}&nbsp;
                          pts&nbsp;&nbsp;|&nbsp;&nbsp; {quiz.questions.length}
                          &nbsp;Questions&nbsp;&nbsp;|&nbsp;&nbsp;
                        </span>
                        {/* {quiz.score && ( */}
                        {currentUser.role === "STUDENT" && (
                          <span>
                            Last attempt score:{" "}
                            {attempts
                              .filter((attempt) => 
                                attempt.quiz === quiz._id && 
                                attempt.user === currentUser._id
                              )
                              .sort((a, b) => 
                                new Date(b.lastAttempt).getTime() - 
                                new Date(a.lastAttempt).getTime()
                              )[0]?.score || "N/A"}
                          </span>
                        )}
                        {/* )}
                        {!quiz.score && <span>Last attempt score: N/A</span>} */}
                      </span>
                    </div>
                  </div>
                </li>
              )
            )}
        </ul>
      </ul>
    </div>
  );
}
