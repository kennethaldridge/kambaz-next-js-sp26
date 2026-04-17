"use client";
import { useState, useEffect } from "react";
import { Button, FormControl } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../account/client";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const data = await client.findUserById(uid);
    setUser(data);
    setName(`${data.firstName} ${data.lastName}`);
  };

  useEffect(() => {
    fetchUser();
  }, [uid]);

  if (!uid) return null;

  const deleteUser = async () => {
    await client.deleteUser(uid);
    onClose();
  };

  const saveUser = async () => {
    const parts = name.trim().split(" ");
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(" ") || "";
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "320px",
        height: "100vh",
        backgroundColor: "white",
        borderLeft: "1px solid #dee2e6",
        padding: "20px",
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
      <div className="d-flex justify-content-end mb-3">
        <IoCloseSharp
          className="fs-3"
          style={{ cursor: "pointer" }}
          onClick={onClose}
        />
      </div>
      <div className="text-center mb-3">
        <FaUserCircle className="fs-1 text-secondary" style={{ fontSize: "80px" }} />
      </div>
      <div className="d-flex align-items-center mb-2">
        {editing ? (
          <FormControl
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="me-2"
          />
        ) : (
          <span
            className="fs-5 me-2"
            style={{ cursor: "pointer" }}
            onClick={() => setEditing(true)}
          >
            {user?.firstName} {user?.lastName}
          </span>
        )}
        {editing ? (
          <FaCheck
            style={{ cursor: "pointer" }}
            onClick={saveUser}
          />
        ) : (
          <FaPencil
            style={{ cursor: "pointer" }}
            onClick={() => setEditing(true)}
          />
        )}
      </div>
      {user && (
        <div className="mb-3">
          <div><strong>Role:</strong> {user.role}</div>
          <div><strong>Login ID:</strong> {user.loginId}</div>
          <div><strong>Section:</strong> {user.section}</div>
          <div><strong>Total Activity:</strong> {user.totalActivity}</div>
        </div>
      )}
      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={deleteUser}>
          Delete
        </Button>
      </div>
    </div>
  );
}
