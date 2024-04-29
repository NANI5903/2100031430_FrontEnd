import React, { useState } from 'react';
import Home from './home';
import Employee from './Employee';

const App = () => {
  const [showHome, setShowHome] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);

  const handleShowHome = () => {
    setShowHome(true);
    setShowEmployee(false);
  };

  const handleShowEmployee = () => {
    setShowHome(false);
    setShowEmployee(true);
  };

  return (
    <div>
      <div className="container">
        <h1>Welcome To Employee Management</h1>
        <button onClick={handleShowHome}>Go to Home</button>
        <button onClick={handleShowEmployee}>Go to Employee</button>
      </div>
      {showHome && <Home />}
      {showEmployee && <Employee />}
    </div>
  );
};

export default App;
