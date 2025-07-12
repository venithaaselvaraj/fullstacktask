import React, { useState, useEffect } from 'react';
import { departmentAPI } from '../api';
import './Form.css';

const DepartmentForm = ({ department, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    hod: '',
    building: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name || '',
        hod: department.hod || '',
        building: department.building || '',
      });
    }
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Department name is required';
    if (!formData.hod.trim()) newErrors.hod = 'HOD is required';
    if (!formData.building.trim()) newErrors.building = 'Building is required';
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
      if (department) {
        await departmentAPI.update(department.id, formData);
      } else {
        await departmentAPI.create(formData);
      }
      onSave();
    } catch (err) {
      if (err.response?.data) {
        setErrors(err.response.data);
      } else {
        alert('Failed to save department');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Department Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Enter department name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="hod">Head of Department *</label>
        <input
          type="text"
          id="hod"
          name="hod"
          value={formData.hod}
          onChange={handleChange}
          className={errors.hod ? 'error' : ''}
          placeholder="Enter HOD name"
        />
        {errors.hod && <span className="error-message">{errors.hod}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="building">Building *</label>
        <input
          type="text"
          id="building"
          name="building"
          value={formData.building}
          onChange={handleChange}
          className={errors.building ? 'error' : ''}
          placeholder="Enter building name"
        />
        {errors.building && <span className="error-message">{errors.building}</span>}
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

export default DepartmentForm;