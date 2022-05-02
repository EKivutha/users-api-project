import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import UsersList from './app/UserList';
import UsersTable from './app/UserTable';
import DenseAppBar from './app/AppBar';

function App() {
  return (
    <div>
      <DenseAppBar />
      <UsersTable />
      {/* <Router>
       <UsersList/>
    </Router> */}
    </div>
  );
}

export default App;
