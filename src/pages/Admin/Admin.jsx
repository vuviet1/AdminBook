import React, { useState, useEffect, Fragment } from "react";
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";
import Table from "react-bootstrap/Table";

import Pagination from "../../Component/Pagination";
import request from "../../utils/request";

function Employee() {
  const [admins, setAdmins] = useState([]);
  const [roles, setRoles] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [roleName, setRoleName] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get("Admin");
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const rolesResponse = await request.get("Role");
        setRoles(rolesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData1();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        full_name: fullName,
        username: username,
        password: password,
        email: email,
        role_name: roleName,
      };

      console.log("Request Payload:", data); // Log the payload

      const response = await request.post("Admin", data);

      console.log(response.data);
      console.log("Admin added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const [editFields, setEditFields] = useState({
    FullName: "",
    Username: "",
    Password: "",
    Email: "",
    Role: "",
  });

  const [selectedAdmin, setSelectedAdmin] = useState({
    FullName: "",
    Username: "",
    Password: "",
    Email: "",
    Role: "",
  });

  const handleEditButtonClick = async (id) => {
    try {
      const response = await request.get(`Admin/id=${id}`);

      if (response.data) {
        setEditFields(response.data);
      } else {
        console.error("No data returned from the API");
      }
    } catch (error) {
      console.error("Error while fetching admin data:", error);
    }
  };

  const handleEditFieldChange = (e, fieldName) => {
    setEditFields({ ...editFields, [fieldName]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      await request.put(`Admin/id=${editFields.Id}`, editFields);
      window.location.reload();
    } catch (error) {
      console.error("Error while saving changes:", error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      // Gọi API để xóa category có id tương ứng
      await request.delete(`Admin/id=${id}`);
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
  const currentAdmins = admins.slice(startIndex, endIndex);

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
                      <div>Quản lý thông tin nhân viên</div>
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
                          <i className="fa-solid fa-users" />
                          Nhân viên
                        </div>
                        <div>
                          {CURRENT_TYPE_USER === "Admin" && (
                            <button
                              type="button"
                              className="btn btn-primary add-payment"
                              data-bs-toggle="modal"
                              data-bs-target="#addemployee"
                            >
                              <i className="fa-solid fa-plus" />
                              Thêm nhân viên
                            </button>
                          )} 
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <Table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Tên nhân viên</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Quyền</th>
                            {CURRENT_TYPE_USER === "Admin" && (
                              <th>Hành động</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {currentAdmins.map((admin, index) => (
                            <tr key={index}>
                              <td>{admin.FullName}</td>
                              <td>{admin.Username}</td>
                              <td>{admin.Email}</td>
                              <td>{admin.RoleName}</td>
                              {CURRENT_TYPE_USER === "Admin" && (
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editemployee"
                                    style={{ marginRight: "15px" }}
                                    onClick={() =>
                                      handleEditButtonClick(admin.Id)
                                    }
                                  >
                                    <i className="fa-regular fa-pen-to-square" />
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteAdmin(admin.Id)}
                                  >
                                    <i className="fa-solid fa-trash" />
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                      <Pagination
                        pageCount={Math.ceil(admins.length / itemsPerPage)}
                        handlePageClick={handlePageClick}
                      />
                    </div>
                  </div>
                </main>
              </div>
            </main>

            <Footer />
          </div>

          {/*    Modal*/}
          <>
            <div
              className="modal fade"
              id="editemployee"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <form className="modal-content" onClick={handleSaveChanges}>
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="editBackdropLabel">
                      Cập nhật nhân viên
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
                      <label htmlFor="name_em_edit" className="form-label">
                        Tên nhân viên
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullname_admin_edit"
                        value={editFields?.FullName || ""}
                        onChange={(e) => handleEditFieldChange(e, "FullName")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username_admin_edit"
                        value={editFields?.Username || ""}
                        onChange={(e) => handleEditFieldChange(e, "Username")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email_admin_edit"
                        value={editFields?.Email || ""}
                        onChange={(e) => handleEditFieldChange(e, "Email")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password_admin_edit"
                        value={editFields?.Password || ""}
                        onChange={(e) => handleEditFieldChange(e, "Password")}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">
                        Vai trò
                      </label>

                      <select
                        className="form-select"
                        id="role_admin_edit"
                        aria-label="Default select example"
                        value={editFields?.RoleName || ""}
                        onChange={(e) => handleEditFieldChange(e, "RoleName")}
                      >
                        {roles.map((role) => (
                          <option key={role.Id} value={role.Id}>
                            {role.Name}
                          </option>
                        ))}
                      </select>
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
                    <button type="submit" className="btn btn-primary">
                      Cập nhật
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="modal fade"
              id="addemployee"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <form className="modal-dialog" onSubmit={handleSubmit}>
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addBackdropLabel">
                      Thêm nhân viên
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="name_em_edit" className="form-label">
                        Tên nhân viên
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        className="form-control"
                        id="fullname_admin_add"
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        className="form-control"
                        id="username_admin_add"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        className="form-control"
                        id="email_admin_add"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        className="form-control"
                        id="password_admin_add"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Vai trò
                      </label>
                      <select
                        className="form-select"
                        id="role_admin_add"
                        aria-label="Default select example"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                      >
                        <option value="" disabled>
                          Vai trò
                        </option>
                        {roles.map((role) => (
                          <option key={role.Id} value={role.Name}>
                            {role.Name}
                          </option>
                        ))}
                      </select>
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
                    <button type="submit" className="btn btn-primary">
                      Thêm mới
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>

          {/*Modal*/}
        </div>
      </div>
    </Fragment>
  );
}

export default Employee;
