import { useParams, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz } from "./reducer";
import { useEffect, useState } from "react";
import ProtectedRouteRole from "../ProtectedRouteRole";
import QuizQuestion from "./QuizQuestion";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import DOMPurify from "dompurify";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";
import { QuizQuestionType } from "./QuestionEditor";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();
  // console.log("qid", qid);
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
  });

  const updateQuestionInQuiz = (updatedQuestion: any) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q: { _id: string }) =>
        q._id === updatedQuestion._id ? updatedQuestion : q
      ),
    });
  };

  const navigate = useNavigate();
  const save = async () => {
    if (!cid) {
      console.error("Course ID is undefined");
      return; // Exit if cid is undefined
    }

    let totalPoints = 0;

    quiz.questions.forEach((question: { choices: any[]; points: number }) => {
      if (
        question.choices.some((choice) => choice.correct && choice.selected)
      ) {
        console.log("Adding points", question.points);
        totalPoints += question.points;
      }
    });

    console.log("totalPoints", totalPoints);

    quiz.questions.forEach((question: any) => {
      if (
        question.choices.some(
          (choice: any) =>
            choice.correct &&
            choice.answer.toLowerCase() ===
              question.currentAnswer?.toLowerCase()
        ) &&
        question.type === "Fill In the Blank"
      ) {
        totalPoints += question.points;
      }
    });

    console.log("totalPoints 2", totalPoints);

    const score = totalPoints;

    const attemptData = {
      score: score,
      questions: quiz.questions.map((question: any) => {
        let selectedChoice = question.choices.find(
          (choice: any) => choice.selected
        );

        console.log("question", question);

        if (question.type === "Fill In the Blank") {
          selectedChoice = question.choices.find(
            (choice: any) =>
              choice.answer.toLowerCase() ===
              question.currentAnswer?.toLowerCase()
          );
          console.log("selectedChoice", selectedChoice);
        }

        return {
          question: question.title,
          currentAnswer: question.currentAnswer,
          answer: selectedChoice ? selectedChoice.answer : null,
          correct: selectedChoice ? selectedChoice.correct : false,
        };
      }),
    };

    console.log("attemptData", attemptData);

    try {
      const response = await quizzesClient.createAttempt(
        cid,
        qid!,
        attemptData
      );
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Review`);
    } catch (error) {
      console.error("Error saving attempt:", error);
    }
  };

  console.log("quiz", quiz);

  return (
    <div className="col col-lg-8 align-items-center justify-content-center ms-auto me-auto">
      <h2>{quiz.title || "Unnamed Quiz"}</h2>
      <ProtectedRouteRole>
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mt-2 mb-4 border-0"
        >
          <RiErrorWarningLine className="text-danger me-2 fs-5" />
          This is a preview of the published version of the quiz
        </div>
      </ProtectedRouteRole>
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
        {quiz.questions.map((question: any) => (
          <QuizQuestion
            key={question._id}
            question={question}
            review={false}
            updateQuestion={updateQuestionInQuiz}
          />
        ))}
      </div>
      <hr />
      <button
        id="wd-quiz-save"
        className="btn btn-lg btn-danger me-1 float-end"
        onClick={save}
        disabled={!quiz.questions.every((question: any) => question.currentAnswer)}
      >
        Submit Quiz
      </button>
      <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
        <button
          id="wd-quiz-cancel"
          className="btn btn-lg btn-secondary ms-4 me-1 float-end"
        >
          Cancel
        </button>
      </Link>
      <ProtectedRouteRole>
        <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Questions`}>
          <button
            id="wd-quiz-cancel"
            className="btn btn-lg btn-secondary me-1 float-start"
          >
            <FaPencil className="me-2" />
            Keep Editing This Quiz
          </button>
        </Link>
      </ProtectedRouteRole>
    </div>
  );
}
