"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem, Dropdown, Form } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes, addQuiz, deleteQuiz, updateQuiz } from "./reducer";
import * as client from "./client";

function formatDate(isoString: string | undefined): string {
  if (!isoString) return "No date";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "No date";
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const minuteStr = minutes === 0 ? "" : `:${String(minutes).padStart(2, "0")}`;
  return `${month} ${day} at ${hour12}${minuteStr}${ampm}`;
}

function getAvailabilityStatus(quiz: any): string {
  const now = new Date();
  const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
  const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
  if (until && now > until) return "Closed";
  if (available && until && now >= available && now <= until) return "Available";
  if (available && now < available)
    return `Not available until ${formatDate(quiz.availableDate)}`;
  return "Available";
}

const ASSIGNMENT_GROUPS = ["Quizzes", "Exams", "Assignments", "Project"];

export default function QuizList() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const [searchTerm, setSearchTerm] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  useEffect(() => {
    const fetch = async () => {
      const data = await client.findQuizzesForCourse(cid);
      dispatch(setQuizzes(data));
    };
    fetch();
  }, [cid]);

  const visibleQuizzes = quizzes.filter((q: any) => {
    if (!isFaculty && !q.published) return false;
    if (searchTerm && !q.title.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;
    return true;
  });

  const handleDelete = async (quizId: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const handleTogglePublish = async (quiz: any) => {
    const updated = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
  };

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuiz(cid, {});
    dispatch(addQuiz(newQuiz));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}`);
  };

  const toggleGroup = (group: string) => {
    setCollapsed((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const groupsWithQuizzes = ASSIGNMENT_GROUPS.filter((group) =>
    visibleQuizzes.some((q: any) => q.assignmentGroup === group)
  );

  return (
    <div id="wd-quizzes-screen">
      {/* Toolbar */}
      {isFaculty && (
        <div className="d-flex align-items-center mb-3 gap-2">
          <div className="position-relative flex-grow-1">
            <CiSearch
              className="position-absolute"
              style={{
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                fontSize: "1.2rem",
              }}
            />
            <Form.Control
              placeholder="Search for Quiz"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: "2rem" }}
              size="lg"
            />
          </div>
          <button
            className="btn btn-danger btn-lg text-nowrap"
            onClick={handleAddQuiz}
          >
            <FaPlus className="me-1" />
            Quiz
          </button>
        </div>
      )}

      {/* Empty state */}
      {visibleQuizzes.length === 0 && (
        <div className="text-center text-muted mt-5">
          {isFaculty
            ? "No quizzes yet. Click + Quiz to create one."
            : "No quizzes available."}
        </div>
      )}

      {/* Groups */}
      {groupsWithQuizzes.map((group) => {
        const groupQuizzes = visibleQuizzes.filter(
          (q: any) => q.assignmentGroup === group
        );
        const isCollapsed = collapsed[group] ?? false;

        return (
          <ListGroup key={group} className="rounded-0 mb-3">
            {/* Group header */}
            <div
              className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => toggleGroup(group)}
            >
              <BsGripVertical className="me-2 fs-3" />
              {isCollapsed ? (
                <IoMdArrowDropright className="me-1 fs-5" />
              ) : (
                <IoMdArrowDropdown className="me-1 fs-5" />
              )}
              <strong>{group}</strong>
            </div>

            {/* Quiz rows */}
            {!isCollapsed &&
              groupQuizzes.map((quiz: any) => {
                const availability = getAvailabilityStatus(quiz);
                return (
                  <ListGroupItem
                    key={quiz._id}
                    className="d-flex align-items-start p-3 ps-1"
                    style={{ borderLeft: "4px solid green" }}
                  >
                    <BsGripVertical className="me-2 fs-3 flex-shrink-0" />

                    {/* Main content */}
                    <div className="flex-grow-1">
                      <Link
                        href={`/courses/${cid}/quizzes/${quiz._id}`}
                        className="fw-bold text-dark text-decoration-none"
                      >
                        {quiz.title}
                      </Link>
                      <div className="text-muted small mt-1">
                        <span
                          className={
                            availability === "Closed"
                              ? "text-danger"
                              : availability === "Available"
                              ? "text-success"
                              : ""
                          }
                        >
                          {availability}
                        </span>
                        {quiz.dueDate && (
                          <span>
                            {" "}
                            | <strong>Due</strong> {formatDate(quiz.dueDate)}
                          </span>
                        )}
                        <span> | {quiz.points} pts</span>
                        <span> | {quiz.numberOfQuestions} Questions</span>
                        {!isFaculty && <span> | Score: -</span>}
                      </div>
                    </div>

                    {/* Right controls */}
                    {isFaculty && (
                      <div className="d-flex align-items-center gap-2 flex-shrink-0">
                        <span
                          title={quiz.published ? "Unpublish" : "Publish"}
                          style={{ cursor: "pointer", fontSize: "1.2rem" }}
                          onClick={() => handleTogglePublish(quiz)}
                        >
                          {quiz.published ? "✅" : "🚫"}
                        </span>
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            variant="link"
                            bsPrefix="p-0 border-0 bg-transparent"
                            id={`quiz-menu-${quiz._id}`}
                          >
                            <BsThreeDotsVertical />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href={`/courses/${cid}/quizzes/${quiz._id}`}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-danger"
                              onClick={() => handleDelete(quiz._id, quiz.title)}
                            >
                              Delete
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleTogglePublish(quiz)}
                            >
                              {quiz.published ? "Unpublish" : "Publish"}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    )}
                  </ListGroupItem>
                );
              })}
          </ListGroup>
        );
      })}
    </div>
  );
}
