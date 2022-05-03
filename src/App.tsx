import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link  } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import UsersList from './app/UserList';
import UsersTable from './app/UserTable';
import DenseAppBar from './app/AppBar';
import UserPostList from './app/UserPostList';
import UserPostCard from './app/UserPostCard';

function App() {
  return (
    <div>
      
      <Router>
       <DenseAppBar />    
     
      <Routes>
      <Route path="/" element={<UsersTable />} />
      {/* <Route path="invoices" element={<Invoices />} /> */}
      <Route path="posts/:userId" element={<UserPostList/>} />
      <Route path="post/:id" element={<UserPostCard />} />
    </Routes>
    </Router>
    </div>
  );
}

export default App;
