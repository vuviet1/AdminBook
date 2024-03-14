import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
// import './proxy';
import Index from './pages/home';
import Category from "./pages/Category/Category";
import Customer from "./pages/Customer/Customer";
import Admin from "./pages/Admin/Admin";
import Order from "./pages/Order/Order";
import Payment from "./pages/Payment/Payment";
import Book from "./pages/Book/Book";
import AddBook from "./pages/Book/AddBook";
import EditBook from "./pages/Book/EditBook";
import Role from "./pages/Role/Role";
import Subcategories from "./pages/Category/Subcategory";
import Permission from "./pages/Permission/Permission";

import Login from "./pages/login";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập của người dùng
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  function AdminElement({ children }) {
    const CURRENT_TYPE_USER = localStorage.getItem('roleName');

    if (CURRENT_TYPE_USER === "Admin") {
      return <>{children}</>;
    } else {
      return <Navigate to="/" />;
    }
  }

  function UserElement({ children }) {
    const CURRENT_TYPE_USER = localStorage.getItem('roleName');
    if (CURRENT_TYPE_USER === "Employee" || CURRENT_TYPE_USER === "Admin") {
      return <>{children}</>;
    } else {
      return <Navigate to="/" />;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
      <Route path="/dashboard" element={loggedIn ? <Index /> : <Navigate to="/" />} />
      <Route path="/admin" element={loggedIn ? <Admin /> : <Navigate to="/" />} />
      <Route path="/category" element={loggedIn ? <UserElement><Category /></UserElement> : <Navigate to="/" />} />
      <Route path="/subcategories/:id" element={loggedIn ? <UserElement><Subcategories /></UserElement> : <Navigate to="/" />} />
      <Route path="/customer" element={loggedIn ? <UserElement><Customer /></UserElement> : <Navigate to="/" />} />
      <Route path="/order" element={loggedIn ? <UserElement><Order /></UserElement> : <Navigate to="/" />} />
      <Route path="/payment" element={loggedIn ? <UserElement><Payment /> </UserElement> : <Navigate to="/" />} />
      <Route path="/book" element={loggedIn ? <UserElement><Book /></UserElement> : <Navigate to="/" />} />
      <Route path="/role" element={loggedIn ? <AdminElement><Role /></AdminElement> : <Navigate to="/" />} />
      <Route path="/permission" element={loggedIn ? <AdminElement><Permission /></AdminElement> : <Navigate to="/" />} />
      <Route path="/editBook/:id" element={loggedIn ? <UserElement><EditBook /></UserElement> : <Navigate to="/" />} />
      <Route path="/addBook" element={loggedIn ? <UserElement><AddBook /></UserElement> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
