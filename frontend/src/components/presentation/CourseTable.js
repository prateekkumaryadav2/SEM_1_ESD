import React from 'react';

const CourseTable = ({ courses, onDelete }) => {
  if (courses.length === 0) {
    return (
      <div className="card shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)' }}>
        <div className="card-body p-0">
          <div className="text-center py-5">
            <i className="bi bi-inbox display-1 text-muted"></i>
            <p className="text-muted mt-3">No courses found. Add your first course to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)' }}>
      <div className="card-header" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <h5 className="mb-0">
          <i className="bi bi-list-ul me-2"></i>
          All Courses 
          <span className="badge bg-primary ms-2">{courses.length}</span>
        </h5>
      </div>
      <div className="card-body p-0">
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
              {courses.map(course => (
                <tr key={course.id}>
                  <td className="align-middle">
                    <span className="badge bg-secondary">{course.id}</span>
                  </td>
                  <td className="align-middle">
                    <strong className="text-primary">{course.code}</strong>
                  </td>
                  <td className="align-middle">{course.title}</td>
                  <td className="align-middle">
                    <span className="badge bg-info">{course.credits}</span>
                  </td>
                  <td className="align-middle">
                    <small className="text-muted">
                      {course.description ? 
                        (course.description.length > 50 ? course.description.substring(0, 50) + '...' : course.description) 
                        : '-'
                      }
                    </small>
                  </td>
                  <td className="align-middle text-center">
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(course.id)}
                    >
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseTable;
