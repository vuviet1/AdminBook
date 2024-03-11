import React, { useState, useEffect } from "react";
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";
import Table from "react-bootstrap/Table";

import Pagination from "../../Component/Pagination";
import request from "../../utils/request";

function Customer() {
  // HIỂN THỊ
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get("Customer");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [request]);
  
  const handlePageClick = (event) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomer = customers.slice(startIndex, endIndex);

  return (
    <div className="sb-nav-fixed">
      <Header />
      <div id="layoutSidenav">
        <Navbar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <div
                className="card border-left-primary shadow h-100 py-1"
                style={{
                  borderLeft: "0.25rem solid orange !important",
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                <ol className="breadcrumb mb-2">
                  <li
                    className="breadcrumb-item active"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <div>Quản lý thông tin khách hàng</div>
                    <div />
                  </li>
                </ol>
              </div>
              <div style={{ marginTop: 10 }} />
              <main>
                <div className="card mb-4">
                  <div className="card-header">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ marginTop: 5 }}>
                        <i className="fa-solid fa-users" /> Khách hàng
                      </div>
                      <div>
                        {/* <button
                            type="button"
                            className="btn btn-primary add-payment"
                            data-bs-toggle="modal"
                            data-bs-target="#add_customer"
                        >
                            <i className="fa-solid fa-plus" />
                            Thêm khách hàng
                        </button> */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Tên khách hàng</th>
                          <th>Số điện thoại</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentCustomer.map((customer, index) => (
                          <tr key={index}>
                            <td>{customer.FullName}</td>
                            <td>{customer.PhoneNumber}</td>
                            <td>{customer.Email}</td>
                            {/* <td>
                                Button trigger modal
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#edit_customer"
                                >
                                    <i className="fa-regular fa-pen-to-square" />
                                </button>
                                <button className="btn btn-danger">
                                    <i className="fa-solid fa-trash" />
                                </button>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Pagination
                      pageCount={Math.ceil(customers.length / itemsPerPage)}
                      handlePageClick={handlePageClick}
                    />
                  </div>
                </div>
              </main>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Customer;
