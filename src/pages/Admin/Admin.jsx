import React, { useState, useEffect, Fragment } from "react";
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";
import Table from "react-bootstrap/Table";

import Pagination from "../../Component/Pagination";
import request from "../../utils/request";

function Employee() {
  const [admins, setAdmins] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [roleName, setRoleName] = useState(null);
  const [roleId, setRoleId] = useState(0);

  const [roleOptions, setRoleOptions] = useState([]);

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
  }, [request]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await request.get("Role");
        setRoleOptions(rolesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [request]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await request.post("Admin", {
        username,
        password,
        email,
        fullName,
        roleId,
        roleName,
      });

      console.log(response);

      console.log("Admin added successfully!");

      // Change window location to '/admin'
      window.location.reload();
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const handleEditButtonClick = async (id) => {
    try {
      const response = await request.get(`Admin/id=${id}`);

      if (response.data) {
        setSelectedAdmin(response.data);
      } else {
        console.error("No data returned from the API");
      }
    } catch (error) {
      console.error("Error while fetching admin data:", error);
    }
  };

  const handleNameChange = (e) => {
    setSelectedAdmin({ ...selectedAdmin, Username: e.target.value });
    // setSelectedAdmin({ ...selectedAdmin, RoleId: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setSelectedAdmin({ ...selectedAdmin, Password: e.target.value });
    // setSelectedAdmin({ ...selectedAdmin, RoleId: e.target.value });
  };

  const handleEmailChange = (e) => {
    setSelectedAdmin({ ...selectedAdmin, Email: e.target.value });
    // setSelectedAdmin({ ...selectedAdmin, RoleId: e.target.value });
  };

  const handleFullNameChange = (e) => {
    setSelectedAdmin({ ...selectedAdmin, FullName: e.target.value });
    // setSelectedAdmin({ ...selectedAdmin, RoleId: e.target.value });
  };

  const handleRoleIdChange = (e) => {
    setSelectedAdmin({ ...selectedAdmin, RoleId: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      await request.put(`Admin/id=${selectedAdmin.Id}`, selectedAdmin);
      window.location.reload();
    } catch (error) {
      console.error("Error while saving changes:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      // Gọi API để xóa category có id tương ứng
      await request.delete(`Admin/id=${id}`);

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
  const currentAdmins = admins.slice(startIndex, endIndex);

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
                          <button
                            type="button"
                            className="btn btn-primary add-payment"
                            data-bs-toggle="modal"
                            data-bs-target="#addemployee"
                          >
                            <i className="fa-solid fa-plus" />
                            Thêm nhân viên
                          </button>
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
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                        {currentAdmins.map((admin, index) => (
                            <tr key={index}>
                              <td>{admin.FullName}</td>
                              <td>{admin.Username}</td>
                              <td>{admin.Email}</td>
                              <td>{admin.RoleName}</td>
                              <td>
                                {/* Button trigger modal */}
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
                        value={selectedAdmin?.FullName}
                        onChange={handleFullNameChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedAdmin?.Username}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedAdmin?.Email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={selectedAdmin?.Password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="role" className="form-label">
                        Quyền
                      </label>

                      <select
                        className="form-select"
                        value={roleId}
                        onChange={(e) => {
                          setRoleId(e.target.value);
                          const selectedRole = roleOptions.find(
                            (option) => option.Id === parseInt(e.target.value)
                          );
                          setRoleName(selectedRole ? selectedRole.Name : null);
                        }}
                        required
                      >
                        {roleOptions.map((option) => (
                          <option key={option.Id} value={option.Id}>
                            {option.Name}
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
                        className="form-control"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Vai trò
                      </label>
                      <select
                        className="form-select"
                        value={roleId}
                        onChange={(e) => {
                          setRoleId(e.target.value);
                          const selectedRole = roleOptions.find(
                            (option) => option.Id === parseInt(e.target.value)
                          );
                          setRoleName(selectedRole ? selectedRole.Name : null);
                        }}
                        required
                      >
                        <option value={0} disabled>-- Chọn vai trò --</option>
                        {roleOptions.map((option) => (
                          <option key={option.Id} value={option.Id}>
                            {option.Name}
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
