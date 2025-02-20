// QuizReview.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz } from "./reducer";
import ProtectedRouteRole from "../ProtectedRouteRole";
import QuizQuestion from "./QuizQuestion";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import DOMPurify from "dompurify";
import * as quizzesClient from "./client"; // Ensure this includes getLatestAttemptForQuiz
import * as coursesClient from "../client";

interface Quiz {
  score?: number; // Made optional and of type number
  lastAttempt?: any; // Made optional
  _id: string;
  title: string;
  description: string;
  questions: QuizQuestion[]; // Unified interface
}

interface Choice {
  _id: string;
  question: string;
  correct: boolean;
  answer: string;
  selected: boolean;
}

interface QuizQuestion {
  name: string;
  _id: string;
  text: string;
  points: number;
  answers: QuizAnswerType[];
  quiz: string;
  title: string;
  type: string;
  question: string;
  choices: Choice[];
  edit: boolean;
  correct: boolean;
  attemptAnswer: string;
}

interface QuizAnswerType {
  _id: string;
  text: string;
  selected?: boolean;
}

interface User {
  _id: string;
  role: "STUDENT" | "FACULTY" | "ADMIN";
}

interface Attempt {
  lastAttempt: any;
  _id: string;
  quizId: string;
  userId: string;
  questions: AttemptQuestionType[];
  score: number;
  attemptDate: string;
}

interface AttemptQuestionType {
  currentAnswer: any;
  answer: string;
  question: string;
  _id: string;
  // questionId: string;
  // selectedAnswerIds: string[]; // Array of selected answer IDs for the question
}

interface RootState {
  quizzesReducer: {
    quizzes: Quiz[];
  };
  accountReducer: {
    currentUser: User | null;
  };
}

const QuizReview: React.FC = () => {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const { pathname } = useLocation();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Find the current quiz based on qid or initialize with default values
  const initialQuiz: Quiz = quizzes.find((quiz) => quiz._id === qid) ?? {
    _id: "",
    title: "",
    description: "",
    questions: [],
    score: undefined,
    lastAttempt: undefined,
  };

  const [quiz, setQuiz] = useState<Quiz>(initialQuiz);

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
  }, []);

  // State for the latest attempt
  const [latestAttempt, setLatestAttempt] = useState<Attempt | null>(null);
  const [loadingLatestAttempt, setLoadingLatestAttempt] =
    useState<boolean>(true);
  const [latestAttemptError, setLatestAttemptError] = useState<string | null>(
    null
  );

  const fetchLatestAttempt = async () => {
    if (quiz._id) {
      try {
        const attempt: Attempt = await quizzesClient.getLatestAttemptForQuiz(
          quiz._id
        );
        setLatestAttempt(attempt);

        // Merge attempt data with quiz questions to mark selected answers
        const updatedQuestions = quiz.questions.map((question) => {
          // Find the corresponding question in the attempt using questionId
          const attemptQuestion = attempt.questions.find(
            (aq) => aq.question === question.title
          );

          if (attemptQuestion) {
            // Map through the choices and set 'selected' based on attempt data
            const updatedChoices = question.choices.map((choice) => {
              return {
                ...choice,
                selected:
                  choice.answer.toLowerCase() === attemptQuestion.currentAnswer.toLowerCase()
                    ? true
                    : false,
              };
            });

            return {
              ...question,
              choices: updatedChoices,
              currentAnswer: attemptQuestion.currentAnswer,
            };
          }

          return question; // No changes if the question wasn't attempted
        });

        setQuiz((prevQuiz) => ({
          ...prevQuiz,
          questions: updatedQuestions,
          score: attempt.score,
          lastAttempt: attempt.lastAttempt,
        }));
      } catch (error: any) {
        console.error("Error fetching latest attempt:", error);
        setLatestAttemptError("Failed to fetch the latest attempt.");
      } finally {
        setLoadingLatestAttempt(false);
      }
    } else {
      setLoadingLatestAttempt(false);
    }
  };

  useEffect(() => {
    fetchLatestAttempt();
  }, [quiz]);

  const save = () => {
    dispatch(updateQuiz(quiz));
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  // console.log("latestAttempt", latestAttempt);

  return (
    <div className="col col-lg-8 align-items-center justify-content-center ms-auto me-auto">
      {!latestAttempt ? (
        <div className="alert alert-info">
          You have not attempted this quiz yet.
        </div>
      ) : (
        <>
          <h2>{quiz.title || "Unnamed Quiz"}</h2>
          <ProtectedRouteRole>
            <div
              id="wd-todo-error-message"
              className="alert alert-danger mt-2 mb-2 border-0"
            >
              <RiErrorWarningLine className="text-danger me-2 fs-5" />
              This is a preview of the published version of the quiz
            </div>
          </ProtectedRouteRole>
          <div className="fs-3 m">
            <span className="fs-3 fw-bold">Last Attempt: </span>
            {quiz.lastAttempt ? (
              new Date(quiz.lastAttempt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
            ) : (
              <span>No attempts yet.</span>
            )}
          </div>
          <div className="fs-3 mb-2">
            <span className="fs-3 fw-bold">Score: </span>
            {quiz.score !== undefined
              ? `${quiz.score} / ${quiz.questions.reduce(
                  (sum, question) => sum + (question.points || 0),
                  0
                )}`
              : "N/A"}
          </div>
          <h3>Quiz Instructions</h3>
          <div className="mt-2">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(quiz.description),
              }}
            />
          </div>
          <hr />
          <div>
            {quiz.questions.map((question) => (
              <QuizQuestion
                key={question._id}
                question={{
                  ...question,
                  correct: question.choices.some((c) => c.correct && c.selected),
                }}
                review={true}
                updateQuestion={(updatedQuestion: QuizQuestion) => {
                  // Ensure type consistency
                  setQuiz((prevQuiz) => ({
                    ...prevQuiz,
                    questions: prevQuiz.questions.map((q) =>
                      q._id === updatedQuestion._id ? updatedQuestion : q
                    ),
                  }));
                }}
              />
            ))}
          </div>
          <hr />
          <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
            <button
              id="wd-quiz-back"
              className="btn btn-lg btn-secondary ms-4 me-1 float-end"
            >
              Exit
            </button>
          </Link>
          {/* Display error message if fetching latest attempt failed */}
          {latestAttemptError && (
            <div className="text-danger mt-2">{latestAttemptError}</div>
          )}
          {loadingLatestAttempt && <div>Loading latest attempt...</div>}
        </>
      )}
    </div>
  );
};

export default QuizReview;
