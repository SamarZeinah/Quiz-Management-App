
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Circle, CircleCheck, CircleCheckBig, Square, SquarePen, Trash2, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Groups_URLS } from "../Services/Urls";

type GroupData = {
  name: string;
  status: "Active" | "Inactive";
  instructor: string;
students: string[];
  max_students: number;
  footer: string;
};


const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODE4ZjUwOGYyZDMyMWQ3ZWE2MTVhZjkiLCJlbWFpbCI6InNhbWFyemVpbmFoQGdtYWlsLmNvbSIsInJvbGUiOiJJbnN0cnVjdG9yIiwiaWF0IjoxNzY2NjgzODYzLCJleHAiOjE3NzAyODM4NjN9.AcT1UnIQdJyfSGFqmp7vhlrjEMH3e03nsEBCX9sOgf4"
const GroupsList = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);

const fetchGroupData = async () => {
  try {
    // const token = localStorage.getItem('token');
    // console.log("Token from localStorage:", token); 
    const res = await axios.get(Groups_URLS.GET_GROUPS, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
        Authorization: `Bearer ${token}`,

      },
    });
    setGroups(res.data);
    console.log("Groups Data:", res.data);
  } catch (error) {
    console.error("Failed to fetch groups:", error);
  }
};

useEffect(()=>{
  fetchGroupData()
},[])
  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((card, idx) => (
          <Card key={idx} className="w-full">
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>{card.name}</CardTitle>
      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 border-2 border-green-200 text-green-900 text-sm font-medium">
        <CircleCheckBig className="w-4 h-4" />
        {card.status}
      </div>
    </div>
  </CardHeader>

  <CardContent className="flex flex-col gap-2">
    <CardDescription className="flex gap-2 items-center">
      <span className="flex items-center gap-1">
        <User className="text-blue-600 w-4 h-4" />
        Instructor:
      </span>
      <span>{card.instructor}</span>
    </CardDescription>

    <CardDescription className="flex gap-2 items-center">
      <span className="flex items-center gap-1">
        <Users className="text-green-600 w-4 h-4" />
        Students:
      </span>
      <span>{card.students.length}/{card.max_students}</span>
    </CardDescription>

    {/* Progress Bar */}
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <div
        className="bg-green-500 h-2"
        style={{ width: `${(card.students.length / card.max_students) * 100}%` }}
      />
    </div>
    <span className="text-sm text-gray-600 text-right">
      {Math.round((card.students.length / card.max_students) * 100)}% filled
    </span>
  </CardContent>

 <CardFooter className="flex flex-row gap-4 justify-end">
  <div className="flex items-center gap-1 text-blue-600">
    <SquarePen className="w-4 h-4" />
    <Button  className="p-0 text-blue-600 bg-transparent border-0 shadow-none ">Edit</Button>
  </div>
  <div className="flex items-center gap-1 text-red-600">
    <Trash2 className="w-4 h-4" />
    <Button  className="p-0 text-red-600 bg-transparent border-0 shadow-none">Delete</Button>
  </div>
</CardFooter>

</Card>

        ))}
      </div>
    </div>
  );
};

export default GroupsList;
