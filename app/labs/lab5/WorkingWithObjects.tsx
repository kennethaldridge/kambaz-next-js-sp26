"use client";

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const [module, setModule] = useState({
    id: "M101",
    name: "Introduction to Node",
    description: "This module introduces Node and Express",
    course: "CS4550",
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${HTTP_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>
      <h4>Modifying Assignment Score</h4>
      <a id="wd-update-assignment-score"
        className="btn btn-primary float-end"
        href={`${HTTP_SERVER}/lab5/assignment/score/${assignment.score}`}>
        Update Score
      </a>

      <FormControl
        className="w-75"
        id="wd-assignment-score"
        type="number"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />
      <hr />
      <h4>Modifying Assignment Completed</h4>
      <a id="wd-update-assignment-completed"
        className="btn btn-primary float-end"
        href={`${HTTP_SERVER}/lab5/assignment/completed/${assignment.completed}`}>
        Update Completed
      </a>

      <div>
        <label>
          <input
            id="wd-assignment-completed"
            type="checkbox"
            checked={assignment.completed}
            onChange={(e) =>
              setAssignment({ ...assignment, completed: e.target.checked })
            }
          />
          Completed
        </label>
      </div>
      <hr />
      <h4>Retrieving Module</h4>
    <a id="wd-retrieve-module" className="btn btn-primary me-2"
      href={`${HTTP_SERVER}/lab5/module`}>
      Get Module
    </a>

    <a id="wd-retrieve-module-name" className="btn btn-primary"
      href={`${HTTP_SERVER}/lab5/module/name`}>
      Get Module Name
    </a>
    <hr />
    <h4>Modifying Module Name</h4>
    <a id="wd-update-module-name"
      className="btn btn-primary float-end"
      href={`${HTTP_SERVER}/lab5/module/name/${module.name}`}>
      Update Module Name
    </a>

    <FormControl
      className="w-75"
      id="wd-module-name"
      value={module.name}
      onChange={(e) => setModule({ ...module, name: e.target.value })}
    />
    <hr />
    <h4>Modifying Module Description</h4>
    <a id="wd-update-module-description"
      className="btn btn-primary float-end"
      href={`${HTTP_SERVER}/lab5/module/description/${module.description}`}>
      Update Module Description
    </a>

    <FormControl
      className="w-75"
      id="wd-module-description"
      value={module.description}
      onChange={(e) =>
        setModule({ ...module, description: e.target.value })
      }
    />
<hr />
    </div>
);}

  