import {
  Navigate,
  Route,
  Routes,
  useParams,
  useLocation,
  useNavigate,
} from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, updateQuiz } from "./reducer";
import { useEffect, useState } from "react";
import ProtectedRouteRole from "../ProtectedRouteRole";
import { FaPlus } from "react-icons/fa";
import QuestionEditor, { QuizQuestionType } from "./QuestionEditor";
import QuizDetailsEditor from "./QuizDetailsEditor";
import * as coursesClient from "../client";

export default function QuizEditor() {
  const { pathname } = useLocation();
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchQuiz = async () => {
    try {
      const returnedQuiz = await coursesClient.getQuizById(
        cid as string,
        qid as string
      );
      setQuiz(returnedQuiz);
    } catch (err: any) {
      console.error("Error fetching quiz:", err);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, [pathname]);
  const [quiz, setQuiz] = useState<{
    title: string;
    description: string;
    quizType: string;
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit: number;
    allowMultipleAttempts: boolean;
    assignTo: string;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
    showCorrectAnswers: string;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcam: boolean;
    lockQuestions: boolean;
    questions: QuizQuestionType[];
    points: number;
  }>({
    title: "Quiz Title",
    description: "",
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    allowMultipleAttempts: false,
    assignTo: "Everyone",
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtATime: true,
    webcam: false,
    lockQuestions: false,
    questions: [],
    points: 0,
  });

  const handleSubmit = async (quiz: any) => {
    if (quiz._id) {
      const updatedQuiz = await coursesClient.updateQuizForCourse(
        cid as string,
        quiz
      );
      dispatch(updateQuiz(updatedQuiz));
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    } else {
      const newQuiz = await coursesClient.createQuizForCourse(
        cid as string,
        quiz
      );
      dispatch(addQuiz(newQuiz));
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`);
    }
    return quiz._id;
  };

  const handleSubmitAndPublish = async (quiz: any) => {
    if (quiz._id) {
      const updatedQuiz = await coursesClient.updateQuizForCourse(
        cid as string,
        { ...quiz, published: true }
      );
      dispatch(updateQuiz(updatedQuiz));
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } else {
      const newQuiz = await coursesClient.createQuizForCourse(cid as string, {
        ...quiz,
        published: true,
      });
      dispatch(addQuiz(newQuiz));
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    }
    return quiz._id;
  };

  const addQuestion = () => {
    const newQuestion: any = {
      _id: new Date().getTime().toString() + "00000000000",
      quiz: qid,
      type: "Multiple Choice",
      choice: [],
      edit: false,
      question: "Question...",
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  return (
    <ProtectedRouteRole>
      <div className="col col-lg-8 align-items-center justify-content-center ms-auto me-auto">
        <div className="d-flex align-items-center justify-content-center">
          <div className="fs-4 ms-auto">
            Points:{" "}
            {quiz.questions.reduce(
              (sumQuestions: number, question: QuizQuestionType) =>
                sumQuestions + (question.points || 0),
              0
            )}
          </div>

          {pathname.includes("Questions") && (
            <button
              id="wd-add-question"
              className="btn btn-secondary float-end ms-2"
              onClick={addQuestion}
            >
              <FaPlus className="position-relative me-2" />
              New Question
            </button>
          )}
          <button
            id="wd-add-question"
            className="btn btn-secondary float-end ms-2"
            onClick={(e) =>
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`)
            }
          >
            Preview Quiz
          </button>
        </div>
        <hr />
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className={`nav-link  ${
                pathname.includes("Details") ? "active" : "text-danger"
              }`}
              aria-current="page"
              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Details`}
            >
              Details
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link  ${
                pathname.includes("Questions") ? "active" : "text-danger"
              }`}
              aria-current="page"
              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Questions`}
            >
              Questions
            </Link>
          </li>
        </ul>
        {pathname.includes("Questions") && (
          <div>
            <div>
              {quiz.questions.map((question: any) => (
                <QuestionEditor
                  question={question}
                  updateQuestion={(question) => {
                    setQuiz({
                      ...quiz,
                      questions: quiz.questions.map((q) =>
                        q._id === question._id ? question : q
                      ),
                      points: quiz.questions.reduce(
                        (sumQuestions, q) =>
                          sumQuestions +
                          ((q._id === question._id
                            ? question.points
                            : q.points) || 0),
                        0
                      ),
                    });
                  }}
                />
              ))}
            </div>
            <hr />
            <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
              <button
                id="wd-quiz-cancel"
                className="btn  btn-secondary ms-4 me-1 float-start"
              >
                Cancel
              </button>
            </Link>
            <button
              id="wd-quiz-save"
              className="btn btn-danger me-1 float-start"
              onClick={() => handleSubmit(quiz)}
            >
              Save
            </button>
          </div>
        )}
        {pathname.includes("Details") && (
          <QuizDetailsEditor
            handleSubmit={handleSubmit}
            handleSubmitAndPublish={handleSubmitAndPublish}
            thisQuiz={quiz}
            fetchQuiz={fetchQuiz}
            qid={qid as string}
          />
        )}
      </div>
    </ProtectedRouteRole>
  );
}
