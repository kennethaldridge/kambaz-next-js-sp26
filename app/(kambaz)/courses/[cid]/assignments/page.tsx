"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AssignmentsControls from "./assignmentsControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscNotebook } from "react-icons/vsc";
import AssignmentGroupControlButtons from "./AssignmentsGroupControlButtons";
import LessonControlButtons from "../modules/LessonControlButtons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import {
  setAssignments,
  deleteAssignment,
} from "./reducer";
import { FaTrash } from "react-icons/fa";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as any;
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const removeAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div id="wd-assignments-screen">
      {isFaculty && <AssignmentsControls cid={cid} />}
      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-assignments-group-list">
        <div className="wd-title p-3 ps-2 bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
          <IoMdArrowDropdown />
          ASSIGNMENTS
          <AssignmentGroupControlButtons />
        </div>

        {assignments.map((assignment: any) => (
          <ListGroupItem
            key={assignment._id}
            className="wd-assignment-row p-3 ps-1"
          >
            <div className="wd-assignment-left">
              <BsGripVertical className="me-2 fs-3" />
              <VscNotebook className="me-2 fs-5" color="green" />

              <div className="wd-assignment-text">
                <Link
                  href={`/courses/${cid}/assignments/${assignment._id}`}
                  className="wd-assignment-link"
                >
                  <div className="wd-assignment-title">
                    {assignment.title}
                  </div>
                </Link>

                <div className="wd-assignment-subtext">
                  <span className="wd-assignments-subtext-red">
                    Multiple Modules
                  </span>{" "}
                  | <b>Not available until</b> {assignment.availableFromDate}
                  <br />
                  <b>Due</b> {assignment.dueDate} | {assignment.points} pts
                </div>
              </div>
            </div>

            {isFaculty && (
              <div className="float-end">
                <FaTrash
                  className="text-danger me-2 mb-1"
                  id="wd-delete-assignment-btn"
                  role="button"
                  style={{ cursor: "pointer" }}
                  onClick={async (event) => {
                    event.preventDefault();
                    const confirmed = window.confirm(
                      `Confirm Delete "${assignment.title}"?`
                    );
                    if (!confirmed) return;
                    await removeAssignment(assignment._id);
                  }}
                />
                <LessonControlButtons />
              </div>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}