import React, { Fragment, useEffect, useState, Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";

import Table from "react-bootstrap/Table";
import Pagination from "../../Component/Pagination";
import request from "../../utils/request";


function Category() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get("Category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [request]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await request.post(`Category`, {
        name: name,
        parent_id: parentId,
      });

      console.log("Category added successfully:", response.data); // Add this line

      window.location.reload();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };



  const handleEditButtonClick = async (id) => {
    try {
      const response = await request.get(`Category/id=${id}`);

      if (response.data) {
        setSelectedCategory({
          Id: response.data.Id,
          Name: response.data.Name,
        });
        setSelectedCategoryId(id);
      } else {
        console.error("No data returned from the API");
      }
    } catch (error) {
      console.error("Error while fetching category data:", error);
    }
  };

  // Function to save changes
  const handleSaveChanges = async () => {
    try {
      await request.put(`Category/id=${selectedCategoryId}`, {
        Name: selectedCategory.Name,
      });

      console.log("Changes saved successfully"); // Add this line

      window.location.reload();
    } catch (error) {
      console.error("Error while saving changes:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      // Gọi API để xóa category có id tương ứng
      await request.delete(`Category/id=${id}`);

      // Tải lại trang sau khi xóa thành công
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting category:", error);
    }
  };

  const handlePageClick = (event) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  const CURRENT_TYPE_USER = localStorage.getItem('roleName');

  return (
    <Fragment>
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
                      <div>Quản lý thông tin danh mục</div>
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
                          <i className="fa-solid fa-table-list" />
                          Danh mục
                        </div>
                        <div>
                        {CURRENT_TYPE_USER === "Admin" && (
                          <button
                            type="button"
                            className="btn btn-primary add-category"
                            data-bs-toggle="modal"
                            data-bs-target="#addcategory"
                          >
                            <i className="fa-solid fa-plus" />
                            Thêm danh mục
                          </button>
                        )}
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <Table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Tên danh mục</th>
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                        {currentCategories.map((category, index) => (
                            <tr key={index}>
                              <td>{category.Name}</td>
                              {/* <td>{category.ParentId.Name}</td> */}
                              <td>
                                {/* Button trigger modal */}
                                {CURRENT_TYPE_USER === "Admin" && (
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editcategory"
                                  style={{ marginRight: "15px" }}
                                  onClick={() =>
                                    handleEditButtonClick(category.Id)
                                  }
                                >
                                  <i className="fa-regular fa-pen-to-square" />
                                </button>
                                )}
                                {CURRENT_TYPE_USER === "Admin" && (
                                <button
                                  className="btn btn-danger"
                                  style={{ marginRight: "15px" }}
                                  onClick={() =>
                                    handleDeleteCategory(category.Id)
                                  }
                                >
                                  <i className="fa-solid fa-trash" />
                                </button>
                                )}
                                <Link
                                  to={"/subcategories/" + category.Id}
                                  className="btn btn-info"
                                >
                                  <i className="fa-solid fa-circle-info"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <Pagination
                        pageCount={Math.ceil(categories.length / itemsPerPage)}
                        handlePageClick={handlePageClick}
                      />
                    </div>
                  </div>
                </main>
              </div>
            </main>

            <Footer />
          </div>

          {/*Modal*/}
          <>
            <div
              className="modal fade"
              id="editcategory"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="editBackdropLabel">
                      Cập nhật danh mục
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <input type="hidden" id="id_pay_edit" />
                    <div className="mb-3">
                      <label htmlFor="name_cate_edit" className="form-label">
                        Tên danh mục
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        // id="name_pay_edit"
                        value={selectedCategory.Name}
                        onChange={(e) =>
                          setSelectedCategory({
                            ...selectedCategory,
                            Name: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveChanges}
                      className="btn btn-primary"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="addcategory"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <form className="modal-content" onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addBackdropLabel">
                      Thêm danh mục
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <input type="hidden" id="id_pay_add" />
                    <div className="mb-3">
                      <label htmlFor="name_pay_add" className="form-label">
                        Tên danh mục mới
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Hủy bỏ
                    </button>
                    <button className="btn btn-primary">Thêm mới</button>
                  </div>
                </form>
              </div>
            </div>
          </>

          {/*    Modal*/}
        </div>
      </div>
    </Fragment>
  );
}

export default Category;
