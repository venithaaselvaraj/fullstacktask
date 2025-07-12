
import React, { useState, useEffect } from 'react';
import { facultyAPI } from '../api';
import FacultyForm from './FacultyForm';
import Modal from './Modal';
import './FacultyList.css';

const FacultyList = () => {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      setLoading(true);
      const response = await facultyAPI.getAll();
      setFaculties(response.data);
    } catch (err) {
      setError('Failed to fetch faculties');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingFaculty(null);
    setIsModalOpen(true);
  };

  const handleEdit = (faculty) => {
    setEditingFaculty(faculty);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty?')) {
      try {
        await facultyAPI.delete(id);
        fetchFaculties();
      } catch (err) {
        alert('Failed to delete faculty');
      }
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    fetchFaculties();
  };

  if (loading) return <div className="loading">Loading faculties...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="faculty-list">
      <div className="list-header">
        <h2>Faculties</h2>
        <button className="btn btn-primary" onClick={handleCreate}>
          Add Faculty
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((faculty) => (
              <tr key={faculty.id}>
                <td>{faculty.id}</td>
                <td>{faculty.name}</td>
                <td>{faculty.designation}</td>
                <td>{faculty.email}</td>
                <td>{faculty.department?.name || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEdit(faculty)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(faculty.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFaculty ? 'Edit Faculty' : 'Add Faculty'}
      >
        <FacultyForm
          faculty={editingFaculty}
          onSave={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default FacultyList;