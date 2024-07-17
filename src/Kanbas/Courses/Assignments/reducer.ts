import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableDate: string; 
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: new Date().getTime().toString(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description,
        points: assignment.points,
        dueDate: assignment.dueDate,
        availableFrom: assignment.availableFrom,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, action) => {
      const assignmentIdToDelete = action.payload;
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== assignmentIdToDelete
      );
    },
    updateAssignment: (state, action) => {
      const updatedAssignment = action.payload;
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === updatedAssignment._id ? updatedAssignment : assignment
      );
    },
    editAssignment: (state, { payload: assignmentId }) => {
        state.assignments = state.assignments.map((a: any) =>
            a._id === assignmentId ? { ...a, editing: true } : a
        ) as any;
    },
  },
});

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment, editAssignment } = assignmentSlice.actions;
export default assignmentSlice.reducer;
