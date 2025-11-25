import React, {useEffect, useState} from 'react';
import API from '../api';

export default function Courses({token, onLogout, darkMode, toggleDarkMode}){
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({code:'', title:'', credits:3, description:''});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const load = async () => {
    const data = await API.listCourses(token);
    setCourses(Array.isArray(data) ? data : []);
  };

  useEffect(()=>{ load(); },[]);

  const create = async e => {
    e.preventDefault();
    setLoading(true);
    await API.createCourse(token, form);
    setForm({code:'', title:'', credits:3, description:''});
    setLoading(false);
    setShowForm(false);
    setSuccess('Course created successfully!');
    setTimeout(() => setSuccess(null), 3000);
    load();
  };

  const del = async id => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await API.deleteCourse(token, id);
      setSuccess('Course deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
      load();
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header/Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="bi bi-mortarboard-fill me-2"></i>
            Academic Portal
          </a>
          <div className="d-flex align-items-center gap-2">
            <button 
              className="btn btn-outline-light theme-toggle" 
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <i className={`bi bi-${darkMode ? 'sun-fill' : 'moon-fill'}`}></i>
            </button>
            <button className="btn btn-outline-light" onClick={()=>{ API.logout(token); onLogout(); }}>
              <i className="bi bi-box-arrow-right me-2"></i>Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        {/* Success Alert */}
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            {success}
            <button type="button" className="btn-close" onClick={() => setSuccess(null)}></button>
          </div>
        )}

        {/* Page Header */}
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

        {/* Create Course Form */}
        {showForm && (
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-plus-square me-2"></i>Create New Course
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={create}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      <i className="bi bi-hash me-1"></i>Course Code
                    </label>
                    <input 
                      type="text"
                      className="form-control" 
                      placeholder="e.g., CS101" 
                      value={form.code} 
                      onChange={e=>setForm({...form, code:e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      <i className="bi bi-pencil me-1"></i>Course Title
                    </label>
                    <input 
                      type="text"
                      className="form-control" 
                      placeholder="e.g., Introduction to Computer Science" 
                      value={form.title} 
                      onChange={e=>setForm({...form, title:e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">
                      <i className="bi bi-star me-1"></i>Credits
                    </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="3" 
                      value={form.credits} 
                      onChange={e=>setForm({...form, credits:parseInt(e.target.value||0)})}
                      min="1"
                      max="6"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">
                      <i className="bi bi-file-text me-1"></i>Description
                    </label>
                    <textarea 
                      className="form-control" 
                      rows="3"
                      placeholder="Enter course description" 
                      value={form.description} 
                      onChange={e=>setForm({...form, description:e.target.value})}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Create Course
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Courses List */}
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <h5 className="mb-0">
              <i className="bi bi-list-ul me-2"></i>
              All Courses 
              <span className="badge bg-primary ms-2">{courses.length}</span>
            </h5>
          </div>
          <div className="card-body p-0">
            {courses.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-inbox display-1 text-muted"></i>
                <p className="text-muted mt-3">No courses found. Add your first course to get started!</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th><i className="bi bi-hash me-1"></i>ID</th>
                      <th><i className="bi bi-tag me-1"></i>Code</th>
                      <th><i className="bi bi-book me-1"></i>Title</th>
                      <th><i className="bi bi-star me-1"></i>Credits</th>
                      <th><i className="bi bi-file-text me-1"></i>Description</th>
                      <th className="text-center"><i className="bi bi-gear me-1"></i>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(c=> (
                      <tr key={c.id}>
                        <td className="align-middle">
                          <span className="badge bg-secondary">{c.id}</span>
                        </td>
                        <td className="align-middle">
                          <strong className="text-primary">{c.code}</strong>
                        </td>
                        <td className="align-middle">{c.title}</td>
                        <td className="align-middle">
                          <span className="badge bg-info">{c.credits}</span>
                        </td>
                        <td className="align-middle">
                          <small className="text-muted">
                            {c.description ? 
                              (c.description.length > 50 ? c.description.substring(0, 50) + '...' : c.description) 
                              : '-'
                            }
                          </small>
                        </td>
                        <td className="align-middle text-center">
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={()=>del(c.id)}
                          >
                            <i className="bi bi-trash me-1"></i>Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-5 py-3 border-top">
        <div className="container text-center">
          <small className="text-muted">
            © 2025 Academic Management System. All rights reserved.
          </small>
        </div>
      </footer>
    </div>
  );
}
