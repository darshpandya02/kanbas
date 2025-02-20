import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BsBanFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteQuiz, publish, unPublish, updateQuiz } from "./reducer";
import * as coursesClient from "../client";
import { useEffect, useState } from "react";
export default function QuizControlButtons({
  quiz,
  cid,
}: {
  quiz: any;
  cid: string;
}) {
  const dispatch = useDispatch();
  const fetchQuiz = async () => {
    try {
      const returnedQuiz = await coursesClient.getQuizById(
        cid as string,
        quiz._id as string
      );
      setQuiz(returnedQuiz);
    } catch (err: any) {
      console.error("Error fetching quiz:", err);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, []);

  const [this_quiz, setQuiz] = useState(quiz);
  return (
    <div className="float-end">
      {this_quiz.published && (
        <span
          onClick={async () => {
            const updatedQuiz = await coursesClient.updateQuizForCourse(
              cid as string,
              { ...quiz, published: false }
            );
            dispatch(updateQuiz(updatedQuiz));
            fetchQuiz();
          }}
        >
          <GreenCheckmark />
        </span>
      )}
      {!this_quiz.published && (
        <BsBanFill
          className="text-danger me-1 mt-1 fs-5"
          onClick={async () => {
            const updatedQuiz = await coursesClient.updateQuizForCourse(
              cid as string,
              { ...quiz, published: true }
            );
            dispatch(updateQuiz(updatedQuiz));
            fetchQuiz();
          }}
        />
      )}

      <div className="dropdown float-end">
        <IoEllipsisVertical
          className="fs-4 dropdown-toggle no-shift"
          data-bs-toggle="dropdown"
        />
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item me-0"
              href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/Edit/Details`}
            >
              Edit
            </a>
          </li>
          <li>
            <button
              className="dropdown-item me-0"
              onClick={() => {
                coursesClient.deleteQuiz(cid, quiz._id);
                dispatch(deleteQuiz(quiz));
              }}
            >
              Delete
            </button>
          </li>
          <li>
            {this_quiz.published && (
              <button
                className="dropdown-item me-0"
                onClick={async () => {
                  const updatedQuiz = await coursesClient.updateQuizForCourse(
                    cid as string,
                    { ...quiz, published: false }
                  );
                  dispatch(updateQuiz(updatedQuiz));
                  fetchQuiz();
                }}
              >
                Unpublish
              </button>
            )}
            {!this_quiz.published && (
              <button
                className="dropdown-item me-0"
                onClick={async () => {
                  const updatedQuiz = await coursesClient.updateQuizForCourse(
                    cid as string,
                    { ...quiz, published: true }
                  );
                  dispatch(updateQuiz(updatedQuiz));
                  fetchQuiz();
                }}
              >
                Publish
              </button>
            )}
          </li>
          <li>
            <button className="dropdown-item me-0">Copy</button>
          </li>
          <li>
            <button className="dropdown-item me-0">Sort</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
