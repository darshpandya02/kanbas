import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [module, setModule] = useState({
    id: 1,
    name: "Module Name 1",
    description: "Module Description 1",
    course: "Course Name 1",
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <input
        className="form-control w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />
      <h4>On Your Own</h4>
      <a className="btn btn-primary" href={`${REMOTE_SERVER}/lab5/module`}>
        Get Module
      </a>
      <hr />
      <a className="btn btn-primary" href={`${REMOTE_SERVER}/lab5/module/name`}>
        Get Module Name
      </a>
      <hr />
      <div>
        <a
          className="btn btn-primary float-end"
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Module Name
        </a>
        <input
          className="form-control w-50"
          defaultValue={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
        <hr />
      </div>
      <div>
        <a
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Assignment Score
        </a>
        <input
          className="form-control w-50"
          type="number"
          defaultValue={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) })
          }
        />
        <hr />
      </div>
      <div className="d-flex align-items-center">
        <div className="flex-fill">
          <input
            type="checkbox"
            className="form-check"
            checked={assignment.completed}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                completed: e.target.checked,
              })
            }
          />
        </div>
        <a
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Assignment Completed
        </a>
      </div>
      <hr />
      <div>
        <a
          className="btn btn-primary float-end"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Module Description
        </a>
        <input
          className="form-control w-50"
          defaultValue={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
        <hr />
      </div>
    </div>
  );
}
