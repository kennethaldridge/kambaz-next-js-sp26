/*"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link href={`/courses/${cid}/home`} id="wd-course-home-link"
        className={`list-group-item border-0 ${
                  pathname === `/courses/${cid}/home` ? "active" : "text-danger"}`}> 
        Home 
      </Link>
      <Link href={`/courses/${cid}/modules`} id="wd-course-modules-link"
        className={`list-group-item border-0 ${
                    pathname === `/courses/${cid}/modules` ? "active" : "text-danger"}`}> 
        Modules 
      </Link>
      <Link href={`/courses/${cid}/piazza`} id="wd-course-piazza-link"
        className={`list-group-item border-0 ${
                    pathname === `/courses/${cid}/piazza` ? "active" : "text-danger"}`}> 
        Piazza 
      </Link>
      <Link href={`/courses/${cid}/zoom`} id="wd-course-zoom-link"
        className={`list-group-item border-0 ${
                    pathname === `/courses/${cid}/zoom` ? "active" : "text-danger"}`}> 
        Zoom 
      </Link>
      <Link href={`/courses/${cid}/assignments`} id="wd-course-assignments-link"
        className={`list-group-item border-0 ${
                    pathname === `/courses/${cid}/assignments` ? "active" : "text-danger"}`}> 
        Assignments 
      </Link>
      <Link href={`/courses/${cid}/quizzes`} id="wd-course-quizzes-link"
        className={`list-group-item border-0 ${
                    pathname === `/courses/${cid}/quizzes` ? "active" : "text-danger"}`}> 
        Quizzes 
      </Link>
      <Link href={`/courses/${cid}/people/table`} id="wd-course-people-link"
        className={`list-group-item border-0 ${
                    pathname === `/courses/${cid}/people/table` ? "active" : "text-danger"}`}> 
        People 
      </Link>
    </div>
  );
}*/

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  const pathFor = (label: string) => {
    const base = `/courses/${cid}`;
    if (label === "People") return `${base}/people/table`;
    return `${base}/${label.toLowerCase()}`; 
  };

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const path = pathFor(label);
        return (
          <Link
            key={label} href={path}
            className={`list-group-item border-0 ${
              pathname === path ? "active" : "text-danger"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}




