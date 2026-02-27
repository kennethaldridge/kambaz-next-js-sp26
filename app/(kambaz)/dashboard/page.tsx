/* eslint-disable react/jsx-key */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enrollInCourse, unenrollFromCourse } from "../enrollments/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as any;
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const userId = currentUser?._id;
  const isEnrolled = (courseId: string) =>
    !!userId &&
    enrollments.some((e: any) => e.user === userId && e.course === courseId);
  const safeCourses = (courses ?? []).filter(Boolean);
  const visibleCourses = showAllCourses
    ? safeCourses
    : safeCourses.filter((c: any) => isEnrolled(c._id));
  const canManageCourses =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  return (
    <div id="wd-dashboard">
      <div className="d-flex align-items-center">
        <h1 id="wd-dashboard-title" className="me-auto">
          Dashboard
        </h1>
        <Button
          className="float-end"
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </Button>
      </div>
      <hr />
      {canManageCourses && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((c: any) => {
            const enrolled = isEnrolled(c._id);
            return (
              <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link
                    href={`/courses/${c._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(event) => {
                      if (!enrolled) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <CardImg
                      src={c.image || "/images/reactjs.jpg"}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </CardText>
                      <Button variant="primary">Go</Button>
                      {userId && (
                        enrolled ? (
                          <button
                            className="btn btn-danger float-end"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(unenrollFromCourse({ user: userId, course: c._id }));
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success float-end"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(enrollInCourse({ user: userId, course: c._id }));
                            }}
                          >
                            Enroll
                          </button>
                        )
                      )}
                      {canManageCourses && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(c._id));
                            }}
                            className="btn btn-danger float-end ms-2"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(c);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}