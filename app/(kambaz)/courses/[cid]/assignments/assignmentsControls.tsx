"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

export default function AssignmentsControls({ cid }: { cid: string }) {
  return (
    <div id="wd-modules-controls" className="text-nowrap clearfix">
      <div className="wd-search-assignments-wrapper">
        <CiSearch className="wd-search-assignments-icon" />
        <Form.Control
          id="wd-search-assignment"
          placeholder="Search ..."
          className="wd-search-assignments-input"
          size="lg"
        />
      </div>

      <Link
        href={`/courses/${cid}/assignments/new`}
        className="btn btn-danger btn-lg float-end ms-2"
        id="wd-add-assignment-btn"
      >
        <FaPlus className="position-relative me-2" />
        Assignment
      </Link>

      <Button
        variant="secondary"
        size="lg"
        className="float-end"
        id="wd-add-group-btn"
      >
        <FaPlus className="position-relative me-2" />
        Group
      </Button>
    </div>
  );
}