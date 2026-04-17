"use client";
import { useState, useEffect } from "react";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import * as client from "../client";
import PeopleTable from "../../courses/[cid]/people/Table";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    const data = await client.findAllUsers();
    setUsers(data);
  };

  const filterUsersByRole = async () => {
    if (role) {
      const data = await client.findUsersByRole(role);
      setUsers(data);
    } else {
      fetchUsers();
    }
  };

  const filterUsersByName = async () => {
    if (name) {
      const data = await client.findUsersByPartialName(name);
      setUsers(data);
    } else {
      fetchUsers();
    }
  };

  const createUser = async () => {
    const newUser = {
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      role: "STUDENT",
    };
    const created = await client.createUser(newUser);
    setUsers([...users, created]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="wd-users-page" className="p-3">
      <h1>Users</h1>
      <hr />
      <div className="d-flex gap-2 mb-3">
        <Button variant="primary" onClick={createUser}>
          + Users
        </Button>
        <FormControl
          placeholder="Search by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && filterUsersByName()}
        />
        <FormSelect
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
          style={{ width: "200px" }}
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="TA">Assistants</option>
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrators</option>
        </FormSelect>
        <Button variant="secondary" onClick={filterUsersByRole}>
          Filter Role
        </Button>
        <Button variant="secondary" onClick={filterUsersByName}>
          Search
        </Button>
      </div>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
