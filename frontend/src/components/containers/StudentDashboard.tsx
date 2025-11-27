import React, { useEffect, useState } from 'react';
import API, { Course } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const StudentDashboard: React.FC = () => {
  const { token, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialisation, setSelectedSpecialisation] = useState<string>('');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async (): Promise<void> => {
    if (!token) return;
    try {
      const data = await API.listCourses(token);
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (token) {
      API.logout(token);
    }
    logout();
  };

  // Get all unique specialisations from courses
  const allSpecialisations = Array.from(
    new Set(
      courses.flatMap(course => course.specialisations || [])
    )
  ).sort();

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialisation = !selectedSpecialisation || 
      (course.specialisations && course.specialisations.includes(selectedSpecialisation));
    
    return matchesSearch && matchesSpecialisation;
  });

  return (
    <div className={`min-vh-100 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      {/* Header */}
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} shadow-sm`}>
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bold" href="#">
            <i className="bi bi-mortarboard-fill me-2"></i>
            Student Dashboard
          </a>
          <div className="d-flex align-items-center gap-2">
            <button
              className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <i className={`bi bi-${darkMode ? 'sun-fill' : 'moon-fill'}`}></i>
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i>Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className={`display-4 fw-bold mb-3 ${darkMode ? 'text-light' : 'text-dark'}`}>
            Course Catalog
          </h1>
          <p className={`lead ${darkMode ? 'text-light' : 'text-muted'}`}>
            Explore our comprehensive selection of courses
          </p>
          
          {/* Search Bar and Specialisation Filter */}
          <div className="row justify-content-center mt-4">
            <div className="col-md-5">
              <div className="input-group input-group-lg">
                <span className={`input-group-text ${darkMode ? 'bg-secondary text-light border-secondary' : 'bg-light'}`}>
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className={`form-control ${darkMode ? 'bg-secondary text-light border-secondary' : ''}`}
                  placeholder="Search courses by title"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={darkMode ? { color: '#fff' } : {}}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="input-group input-group-lg">
                <span className={`input-group-text ${darkMode ? 'bg-secondary text-light border-secondary' : 'bg-light'}`}>
                  <i className="bi bi-filter"></i>
                </span>
                <select
                  className={`form-select ${darkMode ? 'bg-secondary text-light border-secondary' : ''}`}
                  value={selectedSpecialisation}
                  onChange={(e) => setSelectedSpecialisation(e.target.value)}
                  style={darkMode ? { color: '#fff' } : {}}
                >
                  <option value="">All Specialisations</option>
                  {allSpecialisations.map((spec: string) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="row mb-5">
          <div className="col-md-4">
            <div className={`card ${darkMode ? 'bg-primary text-white' : 'bg-primary text-white'} shadow-sm border-0`}>
              <div className="card-body text-center">
                <i className="bi bi-book-fill display-4 mb-2"></i>
                <h3 className="fw-bold">{courses.length}</h3>
                <p className="mb-0">Total Courses</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`card ${darkMode ? 'bg-success text-white' : 'bg-success text-white'} shadow-sm border-0`}>
              <div className="card-body text-center">
                <i className="bi bi-journal-check display-4 mb-2"></i>
                <h3 className="fw-bold">{filteredCourses.length}</h3>
                <p className="mb-0">Available Now</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className={`card ${darkMode ? 'bg-info text-white' : 'bg-info text-white'} shadow-sm border-0`}>
              <div className="card-body text-center">
                <i className="bi bi-award-fill display-4 mb-2"></i>
                <h3 className="fw-bold">{filteredCourses.reduce((sum, c) => sum + (c.credits || 0), 0)}</h3>
                <p className="mb-0">Total Credits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-5">
            <i className={`bi bi-inbox display-1 ${darkMode ? 'text-secondary' : 'text-muted'}`}></i>
            <h3 className={`mt-3 ${darkMode ? 'text-light' : 'text-muted'}`}>
              {searchTerm ? 'No courses found matching your search' : 'No courses available'}
            </h3>
          </div>
        )}

        {/* Course Cards Grid */}
        {!loading && filteredCourses.length > 0 && (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {filteredCourses.map((course) => (
              <div key={course.id} className="col">
                <div 
                  className={`card h-100 shadow-sm border-0 ${darkMode ? 'bg-secondary text-light' : 'bg-white'}`}
                  style={{
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = darkMode 
                      ? '0 8px 24px rgba(255,255,255,0.2)' 
                      : '0 8px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = darkMode
                      ? '0 2px 8px rgba(255,255,255,0.1)'
                      : '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  {/* Card Header with Badge */}
                  <div className={`card-header ${darkMode ? 'bg-dark border-secondary' : 'bg-primary bg-gradient text-white'} border-0`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className={`badge ${darkMode ? 'bg-info text-dark' : 'bg-light text-dark'}`}>{course.code}</span>
                      <span className="badge bg-warning text-dark">
                        <i className="bi bi-star-fill me-1"></i>
                        {course.credits} Credits
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column">
                    <h5 className={`card-title fw-bold mb-3 ${darkMode ? 'text-light' : 'text-dark'}`}>
                      {course.title}
                    </h5>
                    
                    {/* Specialisations */}
                    {course.specialisations && course.specialisations.length > 0 && (
                      <div className="mb-3">
                        <small className={`text-uppercase fw-bold ${darkMode ? 'text-info' : 'text-primary'}`}>
                          <i className="bi bi-mortarboard me-1"></i>
                          Specialisations:
                        </small>
                        <div className="d-flex flex-wrap gap-1 mt-2">
                          {course.specialisations.map((spec: string, index: number) => (
                            <span key={index} className="badge bg-success">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className={`card-text flex-grow-1 ${darkMode ? 'text-light' : 'text-muted'}`}>
                      {course.description || 'No description available'}
                    </p>
                    
                    {/* Tags/Labels */}
                    <div className="mt-3">
                      <span className={`badge ${darkMode ? 'bg-info' : 'bg-primary'} me-2`}>
                        <i className="bi bi-clock me-1"></i>
                        Full Semester
                      </span>
                      <span className={`badge ${darkMode ? 'bg-success' : 'bg-success'}`}>
                        <i className="bi bi-check-circle me-1"></i>
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className={`card-footer ${darkMode ? 'bg-dark border-secondary text-light' : 'bg-light text-muted'} border-0 text-center`}>
                    <small>
                      <i className="bi bi-book me-1"></i>
                      Course ID: {course.id}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`mt-5 py-4 ${darkMode ? 'bg-dark text-light' : 'bg-white text-muted'} border-top`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">
                <i className="bi bi-mortarboard-fill me-2"></i>
                Academic Management System © 2025
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
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
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
