"use client";

import CourseNavigation from "./navigation";
import { ReactNode } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../database";
import { useParams } from "next/navigation";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout(
  { children }: { children: ReactNode}) {
    const { cid } = useParams<{ cid: string }>();
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        <Breadcrumb course={course}/>
      </h2>
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation cid={cid}/>
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
