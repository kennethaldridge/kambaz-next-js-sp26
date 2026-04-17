"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as client from "../../../client";

export default function PeopleTablePage() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    if (!courseId) return;
    try {
      const data = await client.findUsersForCourse(courseId);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [courseId]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
