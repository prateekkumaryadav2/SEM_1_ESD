import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Specialisation } from '../../api';

interface CourseFormData {
  code: string;
  title: string;
  credits: number;
  description: string;
  specialisationIds: number[];
}

interface CourseFormProps {
  form: CourseFormData;
  setForm: (form: CourseFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  onCancel: () => void;
  isEditing?: boolean;
  specialisations: Specialisation[];
}

const CourseForm: React.FC<CourseFormProps> = ({ form, setForm, onSubmit, loading, onCancel, isEditing = false, specialisations }) => {
  const { darkMode } = useTheme();
  
  const handleSpecialisationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: number[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(parseInt(options[i].value));
      }
    }
    setForm({...form, specialisationIds: selected});
  };
  
  return (
    <div className={`card shadow-sm mb-4 ${darkMode ? 'bg-secondary text-light' : 'bg-white'}`}>
      <div className={`card-header ${darkMode ? 'bg-dark text-light' : 'bg-primary text-white'}`}>
        <h5 className="mb-0">
          <i className={`bi bi-${isEditing ? 'pencil-square' : 'plus-square'} me-2`}></i>
          {isEditing ? 'Edit Course' : 'Create New Course'}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-hash me-1"></i>Course Code
              </label>
              <input 
                type="text"
                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                placeholder="e.g., CS101" 
                value={form.code} 
                onChange={e => setForm({...form, code: e.target.value})} 
                required 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                <i className="bi bi-pencil me-1"></i>Course Title
              </label>
              <input 
                type="text"
                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                placeholder="e.g., Introduction to Computer Science" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
                required 
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">
                <i className="bi bi-star me-1"></i>Credits
              </label>
              <input 
                type="number" 
                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                placeholder="3" 
                value={form.credits} 
                onChange={e => setForm({...form, credits: parseInt(e.target.value || '0')})}
                min="1"
                max="6"
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">
                <i className="bi bi-file-text me-1"></i>Description
              </label>
              <textarea 
                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                rows={3}
                placeholder="Enter course description" 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">
                <i className="bi bi-mortarboard me-1"></i>Specialisations
              </label>
              <select 
                multiple
                className={`form-control ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
                value={form.specialisationIds.map(String)}
                onChange={handleSpecialisationChange}
                style={{ minHeight: '120px' }}
              >
                {specialisations.map(spec => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name} ({spec.code})
                  </option>
                ))}
              </select>
              <small className={`form-text ${darkMode ? 'text-light' : 'text-muted'}`}>
                Hold Ctrl (Cmd on Mac) to select multiple specialisations
              </small>
            </div>
          </div>
          <div className="mt-3">
            <button 
              type="submit" 
              className="btn btn-primary me-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <i className={`bi bi-${isEditing ? 'check-circle' : 'check-circle'} me-2`}></i>
                  {isEditing ? 'Update Course' : 'Create Course'}
                </>
              )}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
