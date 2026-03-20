"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as client from "../client";

export default function AssignmentEditor() {
  const router = useRouter();
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const isNew = aid === "new";

  const [assignment, setAssignment] = useState<any>({
    title: "New Assignment",
    description: "",
    points: 100,
    dueDate: "",
    availableFromDate: "",
    availableUntilDate: "",
  });

  const fetchAssignment = async () => {
    if (isNew) return;
    const assignment = await client.findAssignmentById(aid);
    setAssignment(assignment);
  };

  useEffect(() => {
    fetchAssignment();
  }, [aid]);

  const save = async () => {
    if (isNew) {
      await client.createAssignmentForCourse(cid, assignment);
    } else {
      await client.updateAssignment(assignment);
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const cancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <Row className="mb-3">
        <Col>
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            className="assignments-editor-form"
            value={assignment.title || ""}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Control
            as="textarea"
            rows={10}
            id="wd-assignment-instructions"
            value={assignment.description || ""}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Col>
      </Row>

      <Row className="mb-3" controlId="points">
        <Form.Label className="text-end" column sm={3}>
          Points
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="number"
            value={assignment.points ?? 100}
            onChange={(e) =>
              setAssignment({ ...assignment, points: Number(e.target.value) })
            }
          />
        </Col>
      </Row>

      <Row className="mb-3" controlId="assign">
        <Form.Label className="text-end" column sm={3}>
          Assign
        </Form.Label>
        <Col sm={9}>
          <div className="wd-assignments-editor-box">
            <Form.Group className="mb-3">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="date"
                value={assignment.dueDate || ""}
                onChange={(e) =>
                  setAssignment({ ...assignment, dueDate: e.target.value })
                }
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Available From</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.availableFromDate || ""}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableFromDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.availableUntilDate || ""}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableUntilDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-save-btn"
        onClick={save}
      >
        Save
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-cancel-btn"
        onClick={cancel}
      >
        Cancel
      </Button>
    </div>
  );
}