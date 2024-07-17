import axios from 'axios';

const REMOTE_SERVER = 'http://localhost:4000'; 
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/courses`;
const MODULES_API = `${REMOTE_SERVER}/api/courses`;

export const findAssignmentsForCourse = async (courseId: string) => {
  try {
    const response = await axios.get(`${ASSIGNMENTS_API}/${courseId}/assignments`);
    console.log(`Fetched assignments for course ID: ${courseId}`, response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw error;
  }
};

export const findModulesForCourse = async (courseId: string) => {
    const response = await axios.get(`${MODULES_API}/${courseId}/modules`);
    return response.data;
  };


export const createAssignment = async (courseId: string, assignment: any) => {
  try {
    const response = await axios.post(`${ASSIGNMENTS_API}/${courseId}/assignments`, assignment);
    return response.data;
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};

export const updateAssignment = async (assignment: any) => {
  try {
    const response = await axios.put(`${ASSIGNMENTS_API}/assignments/${assignment._id}`, assignment);
    return response.data;
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw error;
  }
};

export const deleteAssignment = async (assignmentId: string) => {
  try {
    const response = await axios.delete(`${ASSIGNMENTS_API}/assignments/${assignmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
};
