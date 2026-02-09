"use client";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

export default function AssignmentsControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap clearfix">
      <div className="wd-search-assignments-wrapper">
        <CiSearch className="wd-search-assignments-icon" />
        <Form.Control id="wd-search-assignment" placeholder="Search ..." className="wd-search-assignments-input" size="lg"/>
      </div>
      <Button
        variant="danger" size="lg" className="float-end ms-2" id="wd-add-assignment-btn">
        <FaPlus className="position-relative me-2" />
        Assignment
      </Button>
      <Button variant="secondary" size="lg" className="float-end" id="wd-add-group-btn">
        <FaPlus className="position-relative me-2" />
        Group
      </Button>
    </div>
  );
}
