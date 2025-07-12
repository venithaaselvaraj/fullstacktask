import React, { useState } from 'react';
import DepartmentList from './components/DepartmentList';
import FacultyList from './components/FacultyList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('departments');

  return (
    <div className="App">
      <header className="app-header">
        <h1>Faculty Management System</h1>
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'departments' ? 'active' : ''}`}
            onClick={() => setActiveTab('departments')}
          >
            Departments
          </button>
          <button
            className={`nav-tab ${activeTab === 'faculties' ? 'active' : ''}`}
            onClick={() => setActiveTab('faculties')}
          >
            Faculties
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'departments' && <DepartmentList />}
        {activeTab === 'faculties' && <FacultyList />}
      </main>
    </div>
  );
}

export default App;