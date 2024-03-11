import React, { Fragment, useEffect, useState, Component } from "react";
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";
import { Link } from "react-router-dom";

import Table from "react-bootstrap/Table";
import request from "../../utils/request";
import Pagination from "../../Component/Pagination";

function Book() {
  const [books, setBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get("Book");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [request]);

  const handleDeleteBook = async (id) => {
    try {
      // Gọi API để xóa category có id tương ứng
      await request.delete(`Book/id=${id}`);

      // Tải lại trang sau khi xóa thành công
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting book:", error);
    }
  };

  const handlePageClick = (event) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  return (
    <div className="sb-nav-fixed">
      <Header />
      <div id="layoutSidenav">
        <Navbar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Quản lý thông tin sách</h1>
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
                    <div>Bảng điều khiển</div>
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
                        <i className="fa-solid fa-book"></i> Sách
                      </div>
                      <div>
                        <Link
                          to={"/AddBook"}
                          type="button"
                          className="btn btn-primary add-book"
                        >
                          <i
                            className="fa-solid fa-plus"
                            style={{ paddingLeft: "10px" }}
                          ></i>
                          Thêm sách
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table className="table table-hover">
                      <thead>
                        <tr style={{ textAlign: "center" }}>
                          <th>ISBN</th>
                          <th>Tên sách</th>
                          <th>Giá</th>
                          <th>Ảnh</th>
                          <th>NXB</th>
                          <th>Nhà xản xuất</th>
                          <th>Tác giả</th>
                          <th>Danh mục</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentBooks.map((book, index) => (
                          <tr
                          key={index}
                            style={{ textAlign: "center", padding: "50px" }}
                          >
                            <td width={"15px"}>{book.Isbn}</td>
                            <td width={"150px"}>{book.Name}</td>
                            <td width={"150px"}>
                              {book.Price.toLocaleString("vi-VN")} VND
                            </td>
                            <td width={"50px"}>
                              <img
                                src={"assets/img/" + book.ImageUrl}
                                width={"100px"}
                                height={"100px"}
                              />{" "}
                            </td>
                            <td width={"100px"}>
                              {book.PublishYear.split("-")[0]}
                            </td>
                            <td width={"150px"}>{book.Publisher}</td>
                            <td width={"250px"}>{book.Author}</td>
                            <td width={"150px"}>{book.CategoryName}</td>
                            <td width={"225px"}>
                              <Link
                                to={"/EditBook/" + book.Id}
                                type="button"
                                className="btn btn-success"
                                style={{ marginRight: "15px" }}
                              >
                                <i className="fa-regular fa-pen-to-square" />
                              </Link>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteBook(book.Id)}
                                style={{ marginRight: "15px" }}
                              >
                                <i className="fa-solid fa-trash" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-info"
                                data-bs-toggle="modal"
                                data-bs-target="#details_book"
                                style={{ marginRight: "15px" }}
                              >
                                <i
                                  className="fa-solid fa-circle-info"
                                  style={{ color: "white" }}
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Pagination
                        pageCount={Math.ceil(books.length / itemsPerPage)}
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

export default Book;
