import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Courses from './Courses';
import KanbasNavigation from '../Kanbas/Navigation';
import Account from '../Kanbas/Account'
import { Provider } from 'react-redux';
import store from './store';
import { fetchAllCourses, createCourse, deleteCourse as deleteCourseClient, updateCourse as updateCourseClient } from './Courses/client';
import ProtectedRoute from './ProtectedRoute';


const Kanbas: React.FC = () => {
  console.log("Kanbas component rendered");
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: '1234',
    name: 'New Course',
    number: 'New Number',
    startDate: '2023-09-10',
    endDate: '2023-12-15',
    description: 'New Description',
  });

  // Fetch courses from the server when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await fetchAllCourses();
      setCourses(fetchedCourses);
    };
    fetchCourses();
  }, []);

  const addNewCourse = async () => {
    const newCourse = await createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    await deleteCourseClient(courseId);
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    await updateCourseClient(course);
    setCourses(
      courses.map((c) => (c._id === course._id ? course : c))
    );
  };

  return (
    <Provider store={store}>
      <div id="wd-kanbas" className="h-100">
        <div className="d-flex h-100">
          <div className="d-none d-md-block bg-black">
            <KanbasNavigation />
          </div>
          <div className="flex-fill p-4">
            <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              {/* <Route path="Account" element={<h1>Account</h1>} /> */}
              <Route
                path="Dashboard"
                element={<ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    
                  />
                  </ProtectedRoute>
                }
                
              />
                <Route path="/Account/*" element={<Account />} />
                <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute> } />
              <Route path="Calendar" element={<h1>Calendar</h1>} />
              <Route path="Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default Kanbas;
