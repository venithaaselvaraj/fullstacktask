import React, { useState, useEffect } from 'react';
import { facultyAPI, departmentAPI } from '../api';
import './Form.css';

const FacultyForm = ({ faculty, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    department: null,
  });
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
    if (faculty) {
      setFormData({
        name: faculty.name || '',
        designation: faculty.designation || '',
        email: faculty.email || '',
        department: faculty.department || null,
      });
    }
  }, [faculty]);

  const fetchDepartments = async () => {
    try {
      const response = await departmentAPI.getAll();
      setDepartments(response.data);
    } catch (err) {
      console.error('Failed to fetch departments');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'department') {
      const selectedDept = departments.find(dept => dept.id === parseInt(value));
      setFormData(prev => ({ ...prev, department: selectedDept }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Faculty name is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.department) newErrors.department = 'Department is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      if (faculty) {
        await facultyAPI.update(faculty.id, formData);
      } else {
        await facultyAPI.create(formData);
      }
      onSave();
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        alert('Failed to save faculty');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Faculty Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Enter faculty name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="designation">Designation *</label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className={errors.designation ? 'error' : ''}
          placeholder="Enter designation"
        />
        {errors.designation && <span className="error-message">{errors.designation}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="Enter email address"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="department">Department *</label>
        <select
          id="department"
          name="department"
          value={formData.department?.id || ''}
          onChange={handleChange}
          className={errors.department ? 'error' : ''}
        >
          <option value="">Select a department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.department && <span className="error-message">{errors.department}</span>}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default FacultyForm;