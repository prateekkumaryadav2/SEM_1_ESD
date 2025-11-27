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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

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
      code: form.code,
      title: form.title,
      description: form.description,
      credits: form.credits
    };
    
    if (editingId) {
      // Update existing course
      await API.updateCourse(token, editingId, courseRequest);
      setSuccess('Course updated successfully!');
      setEditingId(null);
    } else {
      // Create new course
      await API.createCourse(token, courseRequest);
      setSuccess('Course created successfully!');
    }
    
    setForm({code: '', title: '', credits: 3, description: ''});
    setLoading(false);
    setShowForm(false);
    setTimeout(() => setSuccess(null), 3000);
    loadCourses();
  };

  const handleEditCourse = (course: CourseDisplay): void => {
    setForm({
      code: course.code,
      title: course.title,
      credits: course.credits,
      description: course.description || ''
    });
    setEditingId(course.id);
    setShowForm(true);
  };

  const handleCancelEdit = (): void => {
    setForm({code: '', title: '', credits: 3, description: ''});
    setEditingId(null);
    setShowForm(false);
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

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-vh-100 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
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
            <h2 className={`mb-1 ${darkMode ? 'text-light' : ''}`}>
              <i className="bi bi-book me-2"></i>Course Management
            </h2>
            <p className={`mb-0 ${darkMode ? 'text-light' : 'text-muted'}`}>Manage your academic courses</p>
          </div>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => {
              if (showForm && !editingId) {
                setShowForm(false);
              } else if (showForm && editingId) {
                handleCancelEdit();
              } else {
                setShowForm(true);
              }
            }}
          >
            <i className={`bi bi-${showForm ? 'x-circle' : 'plus-circle'} me-2`}></i>
            {showForm ? 'Cancel' : 'Add New Course'}
          </button>
        </div>

        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <span className={`input-group-text ${darkMode ? 'bg-secondary text-light border-secondary' : 'bg-light'}`}>
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className={`form-control ${darkMode ? 'bg-secondary text-light border-secondary' : ''}`}
                placeholder="Search courses by title, code, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={darkMode ? { color: '#fff' } : {}}
              />
            </div>
          </div>
        </div>

        {showForm && (
          <CourseForm 
            form={form}
            setForm={setForm}
            onSubmit={handleCreateCourse}
            loading={loading}
            onCancel={handleCancelEdit}
            isEditing={!!editingId}
          />
        )}

        <CourseTable 
          courses={filteredCourses}
          onDelete={handleDeleteCourse}
          onEdit={handleEditCourse}
        />
      </div>

      <footer className={`${darkMode ? 'bg-dark text-light' : 'bg-white text-muted'} mt-5 py-3 border-top`}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <small>
              © 2025 Academic Management System. All rights reserved.
            </small>
            <a 
              href="https://github.com/prateekkumaryadav2/SEM_1_ESD" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-light' : 'text-dark'}`}
              style={{ 
                fontSize: '1.5rem',
                transition: 'opacity 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              title="View on GitHub"
            >
              <i className="bi bi-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CoursesContainer;
