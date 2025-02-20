import { FaPencil, FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import DOMPurify from "isomorphic-dompurify";
import { useState, useEffect } from "react";

interface Choice {
  _id: string;
  question: string;
  correct: boolean;
  answer: string;
  selected: boolean;
}

interface QuizAnswerType {
  _id: string;
  text: string;
  selected?: boolean;
}

interface QuizQuestion {
  previous_answer?: string;
  attemptAnswer: string;
  currentAnswer?: string; // Added currentAnswer field
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
  name: string;
}

export default function QuizQuestion({
  question,
  updateQuestion,
  review,
}: {
  question: QuizQuestion;
  updateQuestion: (updatedQuestion: QuizQuestion) => void;
  review: boolean;
}) {
  const [inputValue, setInputValue] = useState("");

  // Initialize currentAnswer if it's already present in the question
  useEffect(() => {
    if (question.currentAnswer) {
      setInputValue(question.currentAnswer);
    }
  }, [question.currentAnswer]);

  const handleChoiceSelect = (choiceId: string) => {
    const selectedChoice = question.choices.find(
      (choice) => choice._id === choiceId
    );
    if (!selectedChoice) return;

    const updatedQuestion: QuizQuestion = {
      ...question,
      choices: question.choices.map((choice) =>
        choice._id === choiceId
          ? { ...choice, selected: true }
          : { ...choice, selected: false }
      ),
      currentAnswer: selectedChoice.answer, // Set currentAnswer to selected choice's answer
    };
    updateQuestion(updatedQuestion);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Update currentAnswer with the input value
    const updatedQuestion: QuizQuestion = {
      ...question,
      choices: question.choices.map((choice) => ({
        ...choice,
        selected: false, // Deselect all choices since it's a fill-in-the-blank
      })),
      currentAnswer: value, // Set currentAnswer to the input value
    };
    updateQuestion(updatedQuestion);
  };

  return (
    <div>
      <form
        id="wd-assignments-editor"
        className={`g-4 border rounded p-3 mt-4 bg-light ${
          review &&
          (question.correct
            ? "border-success border-2"
            : question.correct === false
            ? "border-danger border-2"
            : "border-warning")
        }`}
      >
        <fieldset className="d-flex align-items-center">
          <div className="fs-5">{question.title}</div>
          <div className="d-inline-flex align-items-center ms-auto">
            <label
              htmlFor={`question-points-${question._id}`}
              className="fs-6 ms-auto"
            >
              pts:
            </label>
            <span className="fs-6">
              &nbsp;
              {question.points}
            </span>
          </div>
          <hr />
        </fieldset>

        <div className="mt-2">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(question.question),
            }}
          />
        </div>
        {question.choices &&
          question.choices.map((choice) => (
            <div key={choice._id}>
              {question.type !== "Fill In the Blank" && !review && (
                <button
                  type="button"
                  className={`border rounded mb-2 mt-2 p-2 ps-3 bg-white w-100 text-start ${
                    choice.selected && "fw-bolder text-success border-success"
                  }`}
                  onClick={() => handleChoiceSelect(choice._id)}
                >
                  {choice.answer}
                </button>
              )}
              {question.type !== "Fill In the Blank" && review && (
                <div
                  className={`border rounded mb-2 mt-2 p-2 ps-3 bg-white w-100 text-start ${
                    choice.selected && "fw-bolder border-dark"
                  }`}
                >
                  {choice.answer}
                </div>
              )}
            </div>
          ))}
        {question.type === "Fill In the Blank" && !review && (
          <div>
            <input
              className="form-control border rounded mb-2 mt-2 p-2 ps-3 bg-white w-50 text-start"
              type="text"
              placeholder="Type your answer here..."
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
        )}
        {question.type === "Fill In the Blank" && review && (
          <div className="form-control border rounded mb-2 mt-2 p-2 ps-3 bg-white w-50 text-start">
            {question.currentAnswer}
          </div>
        )}
      </form>
    </div>
  );
}
