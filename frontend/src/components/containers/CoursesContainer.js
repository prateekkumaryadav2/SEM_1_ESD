import React, { useEffect, useState } from 'react';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../presentation/Navbar';
import Alert from '../presentation/Alert';
import CourseForm from '../presentation/CourseForm';
import CourseTable from '../presentation/CourseTable';

const CoursesContainer = () => {
  const { token, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({code: '', title: '', credits: 3, description: ''});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const loadCourses = async () => {
    const data = await API.listCourses(token);
    setCourses(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    await API.createCourse(token, form);
    setForm({code: '', title: '', credits: 3, description: ''});
    setLoading(false);
    setShowForm(false);
    setSuccess('Course created successfully!');
    setTimeout(() => setSuccess(null), 3000);
    loadCourses();
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await API.deleteCourse(token, id);
      setSuccess('Course deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
      loadCourses();
    }
  };

  const handleLogout = () => {
    API.logout(token);
    logout();
  };

  return (
    <div className="min-vh-100 bg-light">
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        onLogout={handleLogout} 
      />

      <div className="container py-4">
        <Alert 
          message={success} 
          type="success" 
          onClose={() => setSuccess(null)} 
        />

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">
              <i className="bi bi-book me-2"></i>Course Management
            </h2>
            <p className="text-muted mb-0">Manage your academic courses</p>
          </div>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => setShowForm(!showForm)}
          >
            <i className={`bi bi-${showForm ? 'x-circle' : 'plus-circle'} me-2`}></i>
            {showForm ? 'Cancel' : 'Add New Course'}
          </button>
        </div>

        {showForm && (
          <CourseForm 
            form={form}
            setForm={setForm}
            onSubmit={handleCreateCourse}
            loading={loading}
            onCancel={() => setShowForm(false)}
          />
        )}

        <CourseTable 
          courses={courses}
          onDelete={handleDeleteCourse}
        />
      </div>

      <footer className="bg-white mt-5 py-3 border-top">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              © 2025 Academic Management System. All rights reserved.
            </small>
            <a 
              href="https://github.com/prateekkumaryadav2/SEM_1_ESD" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-decoration-none"
              style={{ color: 'inherit' }}
              title="View Source Code on GitHub"
            >
              <i className="bi bi-github" style={{ fontSize: '1.5rem' }}></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CoursesContainer;
