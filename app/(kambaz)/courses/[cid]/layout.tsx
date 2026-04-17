"use client";

import { ReactNode, useEffect, useState } from "react";
import CourseNavigation from "./navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { cid } = useParams<{ cid: string }>();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } =
    useSelector((state: RootState) => state.accountReducer) as any;
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const course = courses.find((course: any) => course._id === cid);
  const [showCourseNav, setShowCourseNav] = useState(true);
  const userId = currentUser?._id;
  const enrolled =
    !!userId &&
    enrollments.some((e: any) => e.user === userId && e.course === cid);
  useEffect(() => {
    if (!enrolled) {
      router.push("/dashboard");
    }
  }, [enrolled, router]);
  if (!enrolled) return null;
  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() => setShowCourseNav((prev) => !prev)}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        {showCourseNav && (
          <div className="d-none d-md-block">
            <CourseNavigation cid={cid} />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}