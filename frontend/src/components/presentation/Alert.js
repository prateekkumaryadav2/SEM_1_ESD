import React from 'react';

const Alert = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      <i className={`bi bi-${type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill'} me-2`}></i>
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};

export default Alert;
