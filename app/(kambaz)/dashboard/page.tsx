/* eslint-disable react/jsx-key */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { setCourses } from "../courses/reducer";
import * as client from "../courses/client";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as any;

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const canManageCourses =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const loadEnrollments = async () => {
    if (!currentUser) {
      setEnrollments([]);
      return;
    }
    try {
      const data = await client.findMyEnrollments();
      setEnrollments(data);
    } catch (error) {
      console.error(error);
      setEnrollments([]);
    }
  };

  const loadCourses = async () => {
    try {
      if (showAllCourses) {
        const data = await client.fetchAllCourses();
        dispatch(setCourses(data));
      } else {
        const data = await client.findMyCourses();
        dispatch(setCourses(data));
      }
    } catch (error) {
      console.error(error);
      dispatch(setCourses([]));
    }
  };

  const refreshDashboard = async () => {
    await loadEnrollments();
    await loadCourses();
  };

  const isEnrolled = (courseId: string) =>
    enrollments.some((enrollment: any) => enrollment.course === courseId);

  const resetForm = () => {
    setCourse({
      _id: "0",
      name: "New Course",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/reactjs.jpg",
      description: "New Description",
    });
  };

  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);

      dispatch(setCourses([...courses, newCourse]));
      if (currentUser) {
        setEnrollments([
          ...enrollments,
          { user: currentUser._id, course: newCourse._id },
        ]);
      }

      resetForm();
      await refreshDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);

      dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
      setEnrollments(
        enrollments.filter((e: any) => e.course !== courseId)
      );

      await refreshDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateCourse = async () => {
    try {
      await client.updateCourse(course);

      dispatch(
        setCourses(
          courses.map((c: any) =>
            c._id === course._id ? course : c
          )
        )
      );

      await refreshDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const onEnroll = async (courseId: string) => {
    try {
      await client.enrollUserInCourse(courseId);

      if (currentUser) {
        setEnrollments([
          ...enrollments,
          { user: currentUser._id, course: courseId },
        ]);
      }

      await refreshDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  const onUnenroll = async (courseId: string) => {
    try {
      await client.unenrollUserFromCourse(courseId);

      setEnrollments(
        enrollments.filter((e: any) => e.course !== courseId)
      );

      if (!showAllCourses) {
        dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
      }

      await refreshDashboard();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, [currentUser, showAllCourses]);

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
          {showAllCourses ? "My Courses" : "Enrollments"}
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
              type="button"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              type="button"
              onClick={onUpdateCourse}
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
        Published Courses ({courses.length})
      </h2>

      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {(courses ?? []).map((c: any) => {
            const enrolled = isEnrolled(c._id);

            return (
              <Col
                key={c._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
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

                    {enrolled ? (
                      <Link
                        href={`/courses/${c._id}`}
                        className="btn btn-primary"
                      >
                        Go
                      </Link>
                    ) : (
                      <button className="btn btn-secondary" type="button">
                        Go
                      </button>
                    )}

                    {currentUser && enrolled && (
                      <button
                        className="btn btn-danger float-end"
                        type="button"
                        onClick={() => onUnenroll(c._id)}
                      >
                        Unenroll
                      </button>
                    )}

                    {currentUser && showAllCourses && !enrolled && (
                      <button
                        className="btn btn-success float-end"
                        type="button"
                        onClick={() => onEnroll(c._id)}
                      >
                        Enroll
                      </button>
                    )}

                    {canManageCourses && (
                      <>
                        <button
                          className="btn btn-danger float-end ms-2"
                          id="wd-delete-course-click"
                          type="button"
                          onClick={() => onDeleteCourse(c._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning me-2 float-end"
                          id="wd-edit-course-click"
                          type="button"
                          onClick={() => setCourse(c)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}