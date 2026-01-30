import Link from "next/link";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <Row className="mb-2">
        <Col>
          <Form.Control as="textarea" rows={1} defaultValue="alice"/>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control as="textarea" rows={1} defaultValue="123"/>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control as="textarea" rows={1} defaultValue="Alice"/>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control as="textarea" rows={1} defaultValue="Wonderland"/>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control type="datetime-local"/>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control type="email" defaultValue="alice@wonderland.com"/>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Form.Control as="textarea" rows={1} defaultValue="User"/>
        </Col>
      </Row>
      <Link id="wd-signout-btn" href="/account/signin" className="btn btn-danger w-100 mb-2"> Signout </Link>
    </div>
);}
