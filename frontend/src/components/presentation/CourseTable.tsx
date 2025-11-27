import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Course {
  id: number;
  code: string;
  title: string;
  credits: number;
  description?: string;
  specialisations?: string[];
}

interface CourseTableProps {
  courses: Course[];
  onDelete: (id: number) => void;
  onEdit: (course: Course) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, onDelete, onEdit }) => {
  const { darkMode } = useTheme();
  
  if (courses.length === 0) {
    return (
      <div className={`card shadow-sm ${darkMode ? 'bg-secondary text-light' : 'bg-white'}`}>
        <div className="card-body p-0">
          <div className="text-center py-5">
            <i className={`bi bi-inbox display-1 ${darkMode ? 'text-light' : 'text-muted'}`}></i>
            <p className={`mt-3 ${darkMode ? 'text-light' : 'text-muted'}`}>No courses found. Add your first course to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card shadow-sm ${darkMode ? 'bg-secondary' : 'bg-white'}`}>
      <div className={`card-header ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
        <h5 className="mb-0">
          <i className="bi bi-list-ul me-2"></i>
          All Courses 
          <span className="badge bg-primary ms-2">{courses.length}</span>
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className={`table table-hover table-striped mb-0 ${darkMode ? 'table-dark' : ''}`}>
            <thead className="table-dark">
              <tr>
                <th><i className="bi bi-hash me-1"></i>ID</th>
                <th><i className="bi bi-tag me-1"></i>Code</th>
                <th><i className="bi bi-book me-1"></i>Title</th>
                <th><i className="bi bi-mortarboard me-1"></i>Specialisations</th>
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
                    {course.specialisations && course.specialisations.length > 0 ? (
                      <div className="d-flex flex-wrap gap-1">
                        {course.specialisations.map((spec: string, index: number) => (
                          <span key={index} className="badge bg-success">
                            {spec}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
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
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => onEdit(course)}
                    >
                      <i className="bi bi-pencil me-1"></i>Edit
                    </button>
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
