import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import './proxy';
import Index from './pages/home';
import Category from "./pages/Category/Category";
import Customer from "./pages/Customer/Customer";
import Employee from "./pages/Employee/Employee";
import Order from "./pages/Order/Order";
import Payment from "./pages/Payment/Payment";
import Book from "./pages/Book/Book";
import AddBook from "./pages/Book/AddBook";
import EditBook from "./pages/Book/EditBook";
import Role from "./pages/Role/Role";
import Subcategories from "./pages/Category/Subcategory";
import Permisstion from "./pages/Permisstion/Permisstion";
import Login from "./pages/login";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập của người dùng
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/dashboard" element={loggedIn ? <Index /> : <Navigate to="/" />} />
        <Route path="/category" element={loggedIn ? <Category /> : <Navigate to="/" />} />
        <Route path="/Subcategories/:id" element={loggedIn ? <Subcategories /> : <Navigate to="/" />} />
        <Route path="/employee" element={loggedIn ? <Employee /> : <Navigate to="/" />} />
        <Route path="/customer" element={loggedIn ? <Customer /> : <Navigate to="/" />} />
        <Route path="/order" element={loggedIn ? <Order /> : <Navigate to="/" />} />
        <Route path="/payment" element={loggedIn ? <Payment /> : <Navigate to="/" />} />
        <Route path="/book" element={loggedIn ? <Book /> : <Navigate to="/" />} />
        <Route path="/role" element={loggedIn ? <Role /> : <Navigate to="/" />} />
        <Route path="/permission" element={loggedIn ? <Permisstion /> : <Navigate to="/" />} />
        <Route path="/EditBook/:id" element={loggedIn ? <EditBook /> : <Navigate to="/" />} />
        <Route path="/AddBook" element={loggedIn ? <AddBook /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
