"use client";

import { useParams } from "next/navigation";
import * as db from "../../../database";
import Link from "next/link";  
import AssignmentsControls from "./assignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentGroupControlButtons from "./AssignmentsGroupControlButtons";
import LessonControlButtons from "../modules/LessonControlButtons";
import { VscNotebook } from "react-icons/vsc";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments
    return (
      <div id="wd-assignments-screen">
        <AssignmentsControls /><br/><br/><br/><br/>
        <ListGroup className="rounded-0" id="wd-assignments-group-list">
        <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" /> <IoMdArrowDropdown/> ASSIGNMENTS <AssignmentGroupControlButtons />
            </div>
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <ListGroup key={assignment._id} className="wd-assignments rounded-0">
              <ListGroupItem className="wd-assignment-row p-3 ps-1">
                <div className="wd-assignment-left">
                  <BsGripVertical className="me-2 fs-3" />
                  <VscNotebook className="me-2 fs-5" color="green" />
                  <div className="wd-assignment-text">
                    <Link href={`/courses/${cid}/assignments/${assignment._id}`} className="wd-assignment-link">
                      <div className="wd-assignment-title">{assignment.title}</div>
                    </Link>
                    <div className="wd-assignment-subtext">
                      <span className="wd-assignments-subtext-red">Multiple Modules </span> | <b>Not available until</b> {assignment.date_available} at {assignment.time_available} |   <br/>
                      <b>Due</b> {assignment.date_due} at {assignment.time_due} | {assignment.points} pts
                    </div>
                  </div>
                </div>
                <LessonControlButtons />
              </ListGroupItem>
              </ListGroup>
          ))}
        </ListGroup>
        </div>
);}
    

/**export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments
    return (
      <div id="wd-assignments-screen">
        <AssignmentsControls /><br/><br/><br/><br/>
        <ListGroup className="rounded-0" id="wd-assignments-group-list">
          <ListGroupItem className="wd-assignments-group p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" /> <IoMdArrowDropdown/> ASSIGNMENTS <AssignmentGroupControlButtons />
            </div>
            <ListGroup className="wd-assignments rounded-0">
              <ListGroupItem className="wd-assignment-row p-3 ps-1">
                <div className="wd-assignment-left">
                  <BsGripVertical className="me-2 fs-3" />
                  <VscNotebook className="me-2 fs-5" color="green" />
                  <div className="wd-assignment-text">
                    <Link href="/courses/1234/assignments/123" className="wd-assignment-link">
                      <div className="wd-assignment-title">A1</div>
                    </Link>
                    <div className="wd-assignment-subtext">
                      <span className="wd-assignments-subtext-red">Multiple Modules </span> | <b>Not available until</b> May 6 at 12:00 AM |   <br/>
                      <b>Due</b> May 13 at 11:59 PM | 100 pts
                    </div>
                  </div>
                </div>
                <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-assignment-row p-3 ps-1">
                <div className="wd-assignment-left">
                  <BsGripVertical className="me-2 fs-3" />
                  <VscNotebook className="me-2 fs-5" color="green" />
                  <div className="wd-assignment-text">
                    <Link href="/courses/1234/assignments/123" className="wd-assignment-link">
                      <div className="wd-assignment-title">A2</div>
                    </Link>
                    <div className="wd-assignment-subtext">
                      <span className="wd-assignments-subtext-red">Multiple Modules </span> | <b>Not available until</b> May 13 at 12:00 AM |   <br/>
                      <b>Due</b> May 20 at 11:59 PM | 100 pts
                    </div>
                  </div>
                </div>
                <LessonControlButtons />
              </ListGroupItem>
              <ListGroupItem className="wd-assignment-row p-3 ps-1">
                <div className="wd-assignment-left">
                  <BsGripVertical className="me-2 fs-3" />
                  <VscNotebook className="me-2 fs-5" color="green" />
                  <div className="wd-assignment-text">
                    <Link href="/courses/1234/assignments/123" className="wd-assignment-link">
                      <div className="wd-assignment-title">A3</div>
                    </Link>
                    <div className="wd-assignment-subtext">
                      <span className="wd-assignments-subtext-red">Multiple Modules </span> | <b>Not available until</b> May 20 at 12:00 AM |   <br/>
                      <b>Due</b> May 27 at 11:59 PM | 100 pts
                    </div>
                  </div>
                </div>
                <LessonControlButtons />
              </ListGroupItem>
          </ListGroup>
          </ListGroupItem>
        </ListGroup>
        </div>
    );}**/