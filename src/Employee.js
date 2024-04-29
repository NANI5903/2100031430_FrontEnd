import React, { useState } from 'react';

const EmployeeInfo = () => {
  // Sample employee data
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', department: 'IT', salary: 50000, age: 35 },
    { id: 2, name: 'Jane Smith', department: 'HR', salary: 60000, age: 42 },
    { id: 3, name: 'Michael Johnson', department: 'Finance', salary: 70000, age: 38 }
  ]);

  const [hoveredEmployeeId, setHoveredEmployeeId] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewedEmployee, setViewedEmployee] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredEmployeeId(id);
  };

  const handleMouseLeave = () => {
    setHoveredEmployeeId(null);
  };

  const handleAddEmployee = () => {
    setShowAddForm(true);
    setEditingEmployee(null); // Clear any editing state when showing add form
  };

  const handleEditEmployee = (id) => {
    const employeeToEdit = employees.find(employee => employee.id === id);
    setEditingEmployee({ ...employeeToEdit });
    setShowAddForm(true); // Show the add form when editing
  };

  const handleSaveEdit = () => {
    if (editingEmployee.id) {
      const updatedEmployees = employees.map(employee => {
        if (employee.id === editingEmployee.id) {
          return { ...editingEmployee };
        }
        return employee;
      });
      setEmployees(updatedEmployees);
    } else {
      const maxId = Math.max(...employees.map(employee => employee.id));
      const newEmployee = { id: maxId + 1, ...editingEmployee };
      setEmployees([...employees, newEmployee]);
    }
    setEditingEmployee(null);
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
    setShowAddForm(false);
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee({
      ...editingEmployee,
      [name]: value
    });
  };

  const handleViewEmployee = (employee) => {
    setViewedEmployee(employee);
  };

  return (
    <div>
      <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Employee Info</h1>
      {!showAddForm && (
        <button onClick={handleAddEmployee} style={{ float: 'right', marginBottom: '10px' }}>
          Add Employee
        </button>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Department</th>
            <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Salary</th>
            <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Age</th>
            <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Position</th>
            <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr 
              key={employee.id} 
              onMouseEnter={() => handleMouseEnter(employee.id)} 
              onMouseLeave={handleMouseLeave}
              style={{ backgroundColor: hoveredEmployeeId === employee.id ? 'lightblue' : 'white' }}
            >
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{index + 1}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{employee.name}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{employee.department}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>${employee.salary.toLocaleString()}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{employee.age}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{employee.age > 40 ? 'Sr. Employee' : 'Jr. Employee'}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                <button onClick={() => handleEditEmployee(employee.id)}>Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                <button onClick={() => handleViewEmployee(employee)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddForm && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px' }}>
          <h2>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
          <label>Name:</label>
          <input type="text" name="name" value={editingEmployee ? editingEmployee.name : ''} onChange={handleInputChange} /><br />
          <label>Department:</label>
          <input type="text" name="department" value={editingEmployee ? editingEmployee.department : ''} onChange={handleInputChange} /><br />
          <label>Salary:</label>
          <input type="text" name="salary" value={editingEmployee ? editingEmployee.salary : ''} onChange={handleInputChange} /><br />
          <label>Age:</label>
          <input type="text" name="age" value={editingEmployee ? editingEmployee.age : ''} onChange={handleInputChange} /><br />
          <button onClick={handleSaveEdit}>{editingEmployee ? 'Save' : 'Add'}</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
      {viewedEmployee && (
        <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px' }}>
          <h2>View Employee Details</h2>
          <p><strong>ID:</strong> {viewedEmployee.id}</p>
          <p><strong>Name:</strong> {viewedEmployee.name}</p>
          <p><strong>Department:</strong> {viewedEmployee.department}</p>
          <p><strong>Salary:</strong> ${viewedEmployee.salary.toLocaleString()}</p>
          <p><strong>Age:</strong> {viewedEmployee.age}</p>
          <button onClick={() => setViewedEmployee(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeInfo;
