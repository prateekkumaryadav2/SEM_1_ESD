import React, { useEffect, useState } from 'react';
import API, { Course, CourseRequest } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../presentation/Navbar';
import Alert from '../presentation/Alert';
import CourseForm from '../presentation/CourseForm';
import CourseTable from '../presentation/CourseTable';

interface CourseFormData {
  code: string;
  title: string;
  credits: number;
  description: string;
}

interface CourseDisplay {
  id: number;
  code: string;
  title: string;
  credits: number;
  description?: string;
}

const CoursesContainer: React.FC = () => {
  const { token, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  
  const [courses, setCourses] = useState<CourseDisplay[]>([]);
  const [form, setForm] = useState<CourseFormData>({code: '', title: '', credits: 3, description: ''});
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  const loadCourses = async (): Promise<void> => {
    if (!token) return;
    const data = await API.listCourses(token);
    console.log('API Response:', data);
    // Map API Course to CourseDisplay - backend returns id, code, title (not courseId, courseCode, name)
    const displayCourses: CourseDisplay[] = Array.isArray(data) 
      ? data.map((c: any) => {
          console.log('Mapping course:', c);
          return {
            id: c.id || c.courseId,
            code: c.code || c.courseCode,
            title: c.title || c.name,
            credits: c.credits,
            description: c.description
          };
        })
      : [];
    console.log('Display courses:', displayCourses);
    setCourses(displayCourses);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreateCourse = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    
    // Map form data to CourseRequest
    const courseRequest: CourseRequest = {
      courseCode: form.code,
      name: form.title,
      description: form.description,
      year: 2025,
      term: 'Fall',
      faculty: 'Faculty Name',
      credits: form.credits,
      capacity: 30
    };
    
    await API.createCourse(token, courseRequest);
    setForm({code: '', title: '', credits: 3, description: ''});
    setLoading(false);
    setShowForm(false);
    setSuccess('Course created successfully!');
    setTimeout(() => setSuccess(null), 3000);
    loadCourses();
  };

  const handleDeleteCourse = async (id: number): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      if (!token) return;
      await API.deleteCourse(token, id);
      setSuccess('Course deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
      loadCourses();
    }
  };

  const handleLogout = (): void => {
    if (token) {
      API.logout(token);
    }
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
