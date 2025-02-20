import { useState } from "react";
import { FaPencil, FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import Editor from "react-simple-wysiwyg";
import DOMPurify from "isomorphic-dompurify";

interface Choice {
  _id: string;
  question: string;
  correct: boolean;
  answer: string;
}

export interface QuizQuestionType {
  _id: string;
  quiz: string;
  title: string;
  type: string;
  points: number;
  question: string;
  choices: Choice[];
  edit: boolean;
}

export default function QuestionEditor({
  question,
  updateQuestion,
}: {
  question: QuizQuestionType;
  updateQuestion: (updatedQuestion: QuizQuestionType) => void;
}) {
  const [currentQuestion, setQuestion] = useState(question);
  const [presaveQuestion, setPresaveQuestion] = useState(question);
  const save = () => {
    const updatedQuestion = { ...currentQuestion, edit: false };
    setPresaveQuestion(updatedQuestion);
    setQuestion(updatedQuestion);
    updateQuestion(updatedQuestion);
  };
  const tf = [
    {
      _id: new Date().getTime().toString() + "00000000000",
      question: question._id,
      correct: false,
      answer: "True",
    },
    {
      _id: new Date().getTime().toString() + "1" + "0000000000",
      question: question._id,
      correct: false,
      answer: "False",
    },
  ];
  const changeType = (value: string) => {
    setQuestion({
      ...currentQuestion,
      choices: value === "True/False" ? tf : currentQuestion.choices,
      type: value,
    });
  };
  const addAnswer = () => {
    currentQuestion.choices
      ? setQuestion({
          ...currentQuestion,
          choices: [
            ...currentQuestion.choices,
            {
              _id: new Date().getTime().toString() + "00000000000",
              question: currentQuestion._id,
              correct: false,
              answer: "",
            },
          ],
        })
      : setQuestion({
          ...currentQuestion,
          choices: [
            {
              _id: new Date().getTime().toString() + "00000000000",
              question: currentQuestion._id,
              correct: false,
              answer: "",
            },
          ],
        });
  };

  return (
    <div>
      <form id="wd-assignments-editor" className="g-4 border rounded p-3 mt-4">
        <fieldset className="d-flex align-items-center">
          {currentQuestion.edit ? (
            <input
              className="form-control w-25 me-2"
              type="text"
              value={currentQuestion.title}
              placeholder="Title"
              onChange={(e) =>
                setQuestion({ ...currentQuestion, title: e.target.value })
              }
            />
          ) : (
            <div className="fs-5">{currentQuestion.title}</div>
          )}
          {currentQuestion.edit && (
            <select
              className="form-select w-25 me-auto"
              defaultValue={currentQuestion.type}
              onChange={(e) => changeType(e.target.value)}
            >
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="True/False">True/False</option>
              <option value="Fill In the Blank">Fill In the Blank</option>
            </select>
          )}
          <div className="d-inline-flex align-items-center ms-auto">
            <label
              htmlFor={`question-points-${currentQuestion._id}`}
              className="fs-6 ms-auto"
            >
              pts:
            </label>
            {currentQuestion.edit ? (
              <div className="w-50">
                <input
                  id={`question-points-${currentQuestion._id}`}
                  className="form-control"
                  type="number"
                  value={currentQuestion.points}
                  onChange={(e) =>
                    setQuestion({
                      ...currentQuestion,
                      points: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            ) : (
              <span className="fs-6">
                &nbsp;
                {currentQuestion.points}
              </span>
            )}
          </div>
          <hr />
        </fieldset>
        {!currentQuestion.edit && (
          <div className="d-block">Type: {currentQuestion.type}</div>
        )}
        {currentQuestion.edit ? (
          <fieldset>
            <div className="mb-2 mt-2">
              {currentQuestion.type === "Multiple Choice" && (
                <span>
                  Enter your question and multiple answers, then select the one
                  correct answer.
                </span>
              )}
              {currentQuestion.type === "True/False" && (
                <span>
                  Enter your question text, then select if True or False is the
                  correct answer.
                </span>
              )}
              {currentQuestion.type === "Fill In the Blank" && (
                <span>
                  Enter your question text, then define all possible correct
                  answers for the blank. Students will see the question followed
                  by a small text box to type their answer.
                </span>
              )}
            </div>
            <div>
              <label
                className="form-label fw-bolder fs-6"
                htmlFor={`question-text-${currentQuestion._id}`}
              >
                Question:
              </label>
              <Editor
                placeholder="Question"
                id={`question-text-${currentQuestion._id}`}
                value={currentQuestion.question}
                onChange={(e: { target: { value: any } }) =>
                  setQuestion({
                    ...currentQuestion,
                    question: e.target.value,
                  })
                }
              />
            </div>
          </fieldset>
        ) : (
          <div className="mt-2">
            {
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(question.question),
                }}
              />
            }
          </div>
        )}
        {!currentQuestion.edit &&
          currentQuestion.choices &&
          currentQuestion.choices.map((choice) => (
            <div
              className={`border rounded mb-2 mt-2 p-2 ${
                choice.correct && "fw-bolder text-success border-success"
              }`}
            >
              {choice.answer}
            </div>
          ))}
        {currentQuestion.edit && (
          <fieldset>
            <div className="fw-bolder mt-4 fs-6">Answers:</div>
            {currentQuestion.type === "Multiple Choice" && (
              <span>
                <div className="mt-2 container">
                  {currentQuestion.choices &&
                    currentQuestion.choices.map((choice) => (
                      <div className="row align-items-center mt-3 justify-content-start">
                        <div className="col-auto">
                          <input
                            className="form-check-input text-success"
                            type="radio"
                            checked={choice.correct}
                            id={`question-choice-${currentQuestion._id}-${choice._id}`}
                            name={`question-choice-${currentQuestion._id}`}
                            onChange={(e) =>
                              setQuestion({
                                ...currentQuestion,
                                choices: currentQuestion.choices.map((c) =>
                                  c._id === choice._id
                                    ? { ...c, correct: e.target.checked }
                                    : { ...c, correct: false }
                                ),
                              })
                            }
                          />
                          <label
                            htmlFor={`question-choice-${currentQuestion._id}-${choice._id}`}
                            className={`ms-2 ${
                              choice.correct && "text-success fw-bolder"
                            }`}
                          >
                            {choice.correct
                              ? "Correct Answer"
                              : "Possible Answer"}
                          </label>
                        </div>
                        <div className="col-10 col-lg-6">
                          <textarea
                            id={`question-choice-${currentQuestion._id}-${choice._id}`}
                            className="form-control"
                            rows={1}
                            value={choice.answer}
                            placeholder="Answer"
                            onChange={(e) =>
                              setQuestion({
                                ...currentQuestion,
                                choices: currentQuestion.choices.map((c) =>
                                  c._id === choice._id
                                    ? { ...c, answer: e.target.value }
                                    : c
                                ),
                              })
                            }
                          />
                        </div>
                        <div className="col">
                          <FaTrash
                            className="text-danger ms-2 fs-6"
                            onClick={(e) =>
                              setQuestion({
                                ...currentQuestion,
                                choices: currentQuestion.choices.filter(
                                  (c) => c._id !== choice._id
                                ),
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </span>
            )}
            {currentQuestion.type === "True/False" && (
              <span>
                <div className="mt-2 container">
                  {currentQuestion.choices &&
                    currentQuestion.choices.map((choice) => (
                      <div className="row align-items-center mt-3 justify-content-start">
                        <div className="col-auto">
                          <input
                            className="form-check-input"
                            type="radio"
                            checked={choice.correct}
                            id={`question-choice-${currentQuestion._id}-${choice._id}`}
                            name={`question-choice-${currentQuestion._id}`}
                            onChange={(e) =>
                              setQuestion({
                                ...currentQuestion,
                                choices: currentQuestion.choices.map((c) =>
                                  c._id === choice._id
                                    ? { ...c, correct: e.target.checked }
                                    : { ...c, correct: false }
                                ),
                              })
                            }
                          />
                          <label
                            htmlFor={`question-choice-${currentQuestion._id}-${choice._id}`}
                            className={`ms-2 ${
                              choice.correct && "text-success fw-bolder"
                            }`}
                          >
                            {choice.answer}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              </span>
            )}
            {currentQuestion.type === "Fill In the Blank" && (
              <span>
                <div className="mt-2 container">
                  {currentQuestion.choices &&
                    currentQuestion.choices.map((choice) => (
                      <div className="row align-items-center mt-3 justify-content-start">
                        <div className="col-auto">Possible Answer:</div>
                        <div className="col-10 col-lg-6">
                          <input
                            id={`question-choice-${currentQuestion._id}-${choice._id}`}
                            className="form-control"
                            type="text"
                            value={choice.answer}
                            placeholder="Answer"
                            onChange={(e) =>
                              setQuestion({
                                ...currentQuestion,
                                choices: currentQuestion.choices.map((c) =>
                                  c._id === choice._id
                                    ? {
                                        ...c,
                                        answer: e.target.value,
                                        correct: true,
                                      }
                                    : c
                                ),
                              })
                            }
                          />
                        </div>
                        <div className="col">
                          <FaTrash
                            className="text-danger ms-2 fs-6"
                            onClick={(e) =>
                              setQuestion({
                                ...currentQuestion,
                                choices: currentQuestion.choices.filter(
                                  (c) => c._id !== choice._id
                                ),
                              })
                            }
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </span>
            )}
            {currentQuestion.type !== "True/False" && (
              <div>
                <button
                  className="me-1 btn btn-outline-danger border-0 float-end mt-2"
                  type="button"
                  onClick={addAnswer}
                >
                  <FaPlus className="position-relative me-2 mb-1" />
                  Add Another Answer
                </button>
              </div>
            )}
          </fieldset>
        )}

        <hr />
        {currentQuestion.edit ? (
          <div>
            <button
              className="btn btn-secondary me-1"
              onClick={(e) => setQuestion({ ...presaveQuestion, edit: false })}
            >
              Cancel
            </button>
            <button className="btn btn-danger me-1" onClick={save}>
              Save
            </button>
          </div>
        ) : (
          <button
            className="btn btn-success me-1"
            onClick={(e) => setQuestion({ ...currentQuestion, edit: true })}
          >
            <FaPencil className="position-relative me-2 mb-1" />
            Edit
          </button>
        )}
      </form>
    </div>
  );
}
