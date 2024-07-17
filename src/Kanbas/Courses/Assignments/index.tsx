import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} from './reducer';
import * as client from './client';
import ModuleControlButtons from './ModuleControlButtons';
import ModuleControlChecks from './ModuleControlChecks';
import { BsGripVertical } from 'react-icons/bs';
import { IoNewspaperSharp } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assignments = useSelector((state: any) => state.assignmentReducer.assignments);
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssignmentsAndModules = async () => {
      if (cid) {
        try {
          // Fetch and set assignments
          const assignmentsData = await client.findAssignmentsForCourse(cid);
          console.log('Fetched assignments:', assignmentsData);
          dispatch(setAssignments(assignmentsData));

          // Fetch and set modules
          const modulesData = await client.findModulesForCourse(cid); // Implement this function to fetch modules
          console.log('Fetched modules:', modulesData);
          setModules(modulesData);
        } catch (error) {
          console.error("Error fetching assignments or modules: ", error);
        }
      }
    };

    fetchAssignmentsAndModules();
  }, [cid, dispatch]);

  console.log('Assignments from state:', assignments);
  console.log('Modules from state:', modules);
  console.log('Course ID:', cid);

  const courseModules = modules.filter((module: any) => module.course === cid);
  console.log('Filtered courseModules:', courseModules);

  const courseAssignments = assignments.filter((assignment: any) =>
    courseModules.some((module: any) => module._id === assignment.module)
  );
  console.log('Filtered courseAssignments:', courseAssignments);

  const [assignmentName, setAssignmentName] = useState('');

  const handleAddAssignment = async () => {
    if (cid && courseModules.length > 0) {
      try {
        const newAssignment = await client.createAssignment(cid, { title: assignmentName, module: courseModules[0]._id, description: '', points: 0, dueDate: '', availableDate: '' });
        console.log('New assignment:', newAssignment);
        dispatch(addAssignment(newAssignment));
        setAssignmentName('');
      } catch (error) {
        console.error("Error adding assignment:", error);
      }
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const handleUpdateAssignment = async (assignmentId: string, title: string) => {
    if (cid) {
      const assignmentToUpdate = assignments.find((assignment: any) => assignment._id === assignmentId);
      if (assignmentToUpdate) {
        try {
          const updatedAssignment = { ...assignmentToUpdate, title, module: assignmentToUpdate.module };
          await client.updateAssignment(updatedAssignment);
          dispatch(updateAssignment(updatedAssignment));
        } catch (error) {
          console.error("Error updating assignment:", error);
        }
      }
    }
  };

  const navigateToEditAssignment = () => {
    let id = new Date().getTime().toString();
    navigate(`${id}`);
  };

  return (
    <div id="wd-assignments" className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <div className="input-group w-50">
          <span className="input-group-text">
            <BsSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </div>
        <div>
          <button className="btn btn-light me-2" id="wd-add-assignment-group">
            <FaPlus className="me-2" />
            Group
          </button>
          <button
            className="btn btn-danger"
            id="wd-add-assignment"
            onClick={navigateToEditAssignment}
          >
            <FaPlus className="me-2" />
            Assignment
          </button>
        </div>
      </div>
      <h3
        id="wd-assignments-title"
        className="wd-title p-3 ps-2 bg-light d-flex align-items-center"
      >
        <BsGripVertical className="me-2 fs-3" />
        ASSIGNMENTS
        <button
          className="btn btn-secondary ms-auto"
          style={{ borderRadius: "1rem" }}
        >
          40% of Total
        </button>
      </h3>
      <ul id="wd-assignment-list" className="list-group rounded-0">
        {courseAssignments.map((assignment: any) => (
          <li
            key={assignment?._id}
            className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray d-flex align-items-center"
          >
            <BsGripVertical className="me-2 fs-3" />
            <IoNewspaperSharp />
            <div className="p-3 flex-grow-1">
              <a
                className="wd-assignment-link"
                href={`#/Kanbas/Courses/${cid}/Assignments/${assignment?._id}`}
              >
                {assignment && assignment.title}
              </a>
              <br />
              <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
              <b>Not Available until</b> {assignment.availableDate} | <br />
              <b>Due</b> {assignment.dueDate} | {assignment.points} pts
            </div>
            <ModuleControlButtons
              assignmentId={assignment._id}
              deleteAssignment={handleDeleteAssignment}
            />
            <ModuleControlChecks
              assignmentId={assignment._id}
              deleteAssignment={handleDeleteAssignment}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
