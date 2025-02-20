import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";

export default function QuizDetailsEditor({
  handleSubmit,
  handleSubmitAndPublish,
  thisQuiz,
  qid,
}: {
  handleSubmit: (quiz: any) => void;
  handleSubmitAndPublish: (quiz: any) => void;
  thisQuiz: any;
  fetchQuiz: () => void;
  qid: string;
}) {
  const { cid } = useParams();

  const [quiz, setQuiz] = useState(
    thisQuiz || {
      _id: "",
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
      points: 0,
    }
  );

  useEffect(() => {
    setQuiz(thisQuiz);
  }, [thisQuiz]);

  const handleChange = (field: any, value: any) => {
    if (field === "allowMultipleAttempts" && value === false) {
      setQuiz({ ...quiz, [field]: value, maxAttempts: 1 });
    } else {
      setQuiz({ ...quiz, [field]: value });
    }
  };

  return (
    <div className="quiz-editor form-group p-4">
      <input
        className="form-control fs-5"
        value={quiz.title || "Unnamed Quiz"}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      <label htmlFor="quiz-description" className="mt-3">
        Quiz Instructions:
      </label>
      <Editor
        id="quiz-description"
        className="form-control"
        value={quiz.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <div className="mt-4">
        <label htmlFor="quiz-type">Quiz Type</label>
        <select
          id="quiz-type"
          className="form-control form-select"
          value={quiz.quizType}
          onChange={(e) => handleChange("quizType", e.target.value)}
        >
          <option value="Graded Quiz">Graded Quiz</option>
          <option value="Practice Quiz">Practice Quiz</option>
          <option value="Graded Survey">Graded Survey</option>
          <option value="Ungraded Survey">Ungraded Survey</option>
        </select>
      </div>

      <div className="mt-3">
        <label htmlFor="assignment-group">Assignment Group</label>
        <select
          id="assignment-group"
          className="form-control form-select"
          value={quiz.assignmentGroup}
          onChange={(e) => handleChange("assignmentGroup", e.target.value)}
        >
          <option value="Quizzes">Quizzes</option>
          <option value="Assignments">Assignments</option>
          <option value="Exams">Exams</option>
          <option value="Project">Project</option>
        </select>
      </div>

      <div className="mt-3">
        <strong className="fs-6">Options</strong>
        <div className="form-check mt-1">
          <input
            id="shuffle-answers"
            type="checkbox"
            className="form-check-input"
            checked={quiz.shuffleAnswers}
            onChange={(e) => handleChange("shuffleAnswers", e.target.checked)}
          />
          <label htmlFor="shuffle-answers" className="form-check-label">
            Shuffle Answers
          </label>
        </div>
        <div className="form-check mt-2">
          <label htmlFor="time-limit-yes" className="form-check-label">
            Time Limit
          </label>
          <input
            id="time-limit-yes"
            type="checkbox"
            className="form-check-input "
            checked={quiz.timeLimit >= 0}
            onChange={(e) =>
              handleChange("timeLimit", e.target.checked ? 20 : -1)
            }
          />
          {quiz.timeLimit >= 0 && (
            <div className="input-group ">
              <input
                id="time-limit"
                type="number"
                className="form-control w-50"
                placeholder="Time Limit (minutes)"
                value={quiz.timeLimit}
                onChange={(e) => handleChange("timeLimit", e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">
                  minutes
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="form-check mt-2">
          <input
            id="multiple-attempts"
            type="checkbox"
            className="form-check-input"
            checked={quiz.allowMultipleAttempts}
            onChange={(e) => {
              handleChange("allowMultipleAttempts", e.target.checked);
            }}
          />
          <label htmlFor="multiple-attempts" className="form-check-label">
            Allow Multiple Attempts
          </label>
          {quiz.allowMultipleAttempts && (
            <div className="input-group ">
              <input
                id="multiple-attempts"
                type="number"
                className="form-control w-50"
                placeholder="Max Attempts"
                value={quiz.maxAttempts}
                onChange={(e) => handleChange("maxAttempts", e.target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon3">
                  attempts
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="form-check mt-2">
          <input
            id="one-question"
            type="checkbox"
            className="form-check-input"
            checked={quiz.oneQuestionAtATime}
            onChange={(e) =>
              handleChange("oneQuestionAtATime", e.target.checked)
            }
          />
          <label htmlFor="one-question" className="form-check-label">
            One Question at a Time
          </label>
        </div>
        <div className="form-check mt-2">
          <input
            id="webcam"
            type="checkbox"
            className="form-check-input"
            checked={quiz.webcam}
            onChange={(e) => handleChange("webcam", e.target.checked)}
          />
          <label htmlFor="webcam" className="form-check-label">
            Webcam Required
          </label>
        </div>
        <div className="form-check mt-2">
          <input
            id="lock-questions"
            type="checkbox"
            className="form-check-input"
            checked={quiz.lockQuestions}
            onChange={(e) => handleChange("lockQuestions", e.target.checked)}
          />
          <label htmlFor="lock-questions" className="form-check-label">
            Lock Questions After Answering
          </label>
        </div>
        <div className="mt-1">
          <label htmlFor="show-correct-answers">Show Correct Answers</label>
          <select
            id="show-correct-answers"
            className="form-control form-select"
            value={quiz.showCorrectAnswers}
            onChange={(e) => handleChange("showCorrectAnswers", e.target.value)}
          >
            <option value="Never">Never</option>
            <option value="Immediately">Immediately</option>
          </select>
        </div>
        <div className="mt-1">
          <label htmlFor="access-code">Access Code</label>
          <input
            id="access-code"
            className="form-control"
            value={quiz.accessCode}
            onChange={(e) => handleChange("accessCode", e.target.value)}
          ></input>
        </div>
      </div>

      <div className="mt-4">
        <h5>Assign</h5>
        <div className="border rounded-2 p-3">
          <label htmlFor="assign-to">Assign To</label>
          <select
            id="assign-to"
            className="form-control form-select"
            value={quiz.assignTo}
            onChange={(e) => handleChange("assignTo", e.target.value)}
          >
            <option value="Everyone">Everyone</option>
            <option value="Specific Group">Specific Group</option>
          </select>

          <div className="mt-3">
            <label htmlFor="due-date">Due</label>
            <input
              type="date"
              id="due-date"
              className="form-control"
              value={
                quiz.dueDate &&
                new Date(quiz.dueDate).toISOString().split("T")[0]
              }
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="available-from">Available From</label>
            <input
              type="date"
              id="available-from"
              className="form-control"
              value={
                quiz.availableFrom &&
                new Date(quiz.availableFrom).toISOString().split("T")[0]
              }
              onChange={(e) => handleChange("availableFrom", e.target.value)}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="available-until">Available Until</label>
            <input
              type="date"
              id="available-until"
              className="form-control"
              value={
                quiz.availableUntil &&
                new Date(quiz.availableUntil).toISOString().split("T")[0]
              }
              onChange={(e) => handleChange("availableUntil", e.target.value)}
            />
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-2">
        <Link
          to={`/Kanbas/Courses/${cid}/quizzes`}
          className="btn btn-secondary me-2"
        >
          Cancel
        </Link>
        <button
          className="btn btn-danger me-2"
          onClick={() => handleSubmit(quiz)}
        >
          Save
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleSubmitAndPublish(quiz)}
        >
          Save and Publish
        </button>
      </div>
    </div>
  );
}
