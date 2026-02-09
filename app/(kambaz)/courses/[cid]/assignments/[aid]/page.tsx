"use client";


import { useParams } from "next/navigation";
import * as db from "../../../../database";
import FormSelect from 'react-bootstrap/FormSelect';
import FormCheck from 'react-bootstrap/FormCheck';
import FormRange from 'react-bootstrap/FormRange';
import InputGroup from 'react-bootstrap/InputGroup';;
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function AssignmentEditor() {
  const { aid } = useParams();
  const assignments = db.assignments
    return (
      assignments
        .filter((assignment: any) => assignment._id === aid)
        .map((assignment: any) => (
      <div key={assignment._id} id="wd-assignments-editor">
        <Row className="mb-3">
          <Col>
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control as="textarea" rows={1} defaultValue={assignment.title} className='assignments-editor-form'/>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Control as="textarea" rows={10} id='wd-assignment-instructions'
              defaultValue={assignment.description}/>
          </Col>
        </Row>
        <Row className="mb-3" controlId="points">
                <Form.Label className="text-end" column sm={3}> Points </Form.Label>
                <Col sm={9}>
                    <Form.Control type="email" defaultValue={assignment.points} />
                </Col>
        </Row>
        <Row className="mb-3" controlId="assignment-group">
          <Form.Label className="text-end" column sm={3}> Assignment Group </Form.Label>
          <Col sm={9}>
            <FormSelect defaultValue={assignment.group}>
                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="TESTS">TESTS</option>
                    <option value="QUIZZES">QUIZZES</option>
                    <option value="PROJECTS">PROJECTS</option>
              </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3" controlId="display-grade">
          <Form.Label className="text-end" column sm={3}> Display Grade as </Form.Label>
          <Col sm={9}>
            <FormSelect defaultChecked={assignment.display_grade}>
                    <option value="Percentage">Percentage</option>
                    <option value="Points">Points</option>
                    <option value="Letter">Letter</option>
              </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3" controlId="submission-type">
          <Form.Label className="text-end" column sm={3}> Submission Type </Form.Label>
          <Col sm={9}>
            <div className='wd-assignments-editor-box'>
              <FormSelect className='mb-4' defaultValue={assignment.submission_type}>
                <option value="Online">Online</option>
                <option value="In-Person">In-Person</option>
              </FormSelect>
              <div className="fw-bold mb-2">Online Entry Options</div>
              <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-2" />
              <Form.Check type="checkbox" label="Website URL" defaultChecked className="mb-2"/>
              <Form.Check type="checkbox" label="Media Recordings" className="mb-2" />
              <Form.Check type="checkbox" label="Student Annotation" className="mb-2" />
              <Form.Check type="checkbox" label="File Uploads" />
            </div>
          </Col>
        </Row>
        <Row className="mb-3" controlId="assign">
          <Form.Label className="text-end" column sm={3}> Assign </Form.Label>
          <Col sm={9}>
            <div className='wd-assignments-editor-box'>
              <Form.Group className="mb-3">
                <Form.Label className='fw-bold'>Assign to</Form.Label>
                <Form.Control type="text" defaultValue="Everyone" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Due</Form.Label>
                <Form.Control type="datetime-local" defaultValue={assignment.dt_due}/>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Available From</Form.Label>
                    <Form.Control type="datetime-local" defaultValue={assignment.dt_available}/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Until</Form.Label>
                    <Form.Control type="datetime-local" defaultValue={assignment.dt_until}/>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Button variant="danger" size="lg" className="me-1 float-end" id="wd-save-btn" href={`/courses/${assignment.course}/assignments/`}>
          Save
        </Button>
        <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-cancel-btn" href={`/courses/${assignment.course}/assignments/`}>
          Cancel
        </Button>
    </div>
        ))
);}
