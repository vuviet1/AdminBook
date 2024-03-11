import React, { Fragment, useEffect, useState, Component } from "react";
import Table from "react-bootstrap/Table";

import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";
import Pagination from "../../Component/Pagination";
import request from "../../utils/request";

function Payment() {
  const [payments, setPayments] = useState([]);
  const [name, setName] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get("Payment");
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [request]);

  const handleSubmit = async () => {
    // e.preventDefault();

    try {
      const response = await request.post("Payment", {
        name: name,
      });

      window.location.reload();

      console.log("Payment method added successfully:", response.data);
    } catch (error) {
      console.error("Failed to add payment method:", error);
    }
  };

  // Edit Payment

  const handleEditButtonClick = async (id) => {
    try {
      // Gọi API để lấy dữ liệu category có id tương ứng
      const response = await request.get(`Payment/id=${id}`);
      // console.log(response);

      if (response.data) {
        // Cập nhật state với dữ liệu category
        setSelectedPayment(response.data);
        // Lưu id của category được chọn
        setSelectedPaymentId(id);
      } else {
        console.error("No data returned from the API");
      }
    } catch (error) {
      console.error("Error while fetching payment data:", error);
    }
  };

  const handleSaveChanges = async () => {
    // Gọi API để lưu thay đổi cho category có id là selectedCategoryId
    try {
      await request.put(`Payment/id=${selectedPaymentId}`, selectedPayment);
      console.log(selectedPaymentId);
      // Đóng modal khi lưu thành công
      // document.getElementById('editcategory').modal('hide');
      window.location.reload();
      // Tải lại dữ liệu categories
      // CODE ĐỂ TẢI LẠI DỮ LIỆU CATEGORIES (nếu cần)
    } catch (error) {
      console.error("Error while saving changes:", error);
    }
  };
  // Xóa Payment

  const handleDeletePayment = async (id) => {
    try {
      // Gọi API để xóa category có id tương ứng
      await request.delete(`Payment/id=${id}`);

      // Tải lại trang sau khi xóa thành công
      window.location.reload();
    } catch (error) {
      console.error("Error while deleting payment:", error);
    }
  };

  const handlePageClick = (event) => {
    const newPage = event.selected;
    setCurrentPage(newPage);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayment = payments.slice(startIndex, endIndex);

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
                    <div>Quản lý hình thức thanh toán</div>
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
                        <i className="fa-solid fa-money-bill-wave" />
                        Phương thức thanh toán
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn btn-primary add-payment"
                          data-bs-toggle="modal"
                          data-bs-target="#addpayment"
                        >
                          <i className="fa-solid fa-plus" />
                          Thêm phương thức
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <Table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Tên phương thức</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPayment.map((payment, index) => (
                          <tr key={index}>
                            <td>{payment.Name}</td>
                            <td>
                              {/* Button trigger modal */}
                              <button
                                type="button"
                                className="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#editpayment"
                                style={{ marginRight: "10px" }}
                                onClick={() =>
                                  handleEditButtonClick(payment.Id)
                                }
                              >
                                <i className="fa-regular fa-pen-to-square" />
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleDeletePayment(payment.Id)}
                              >
                                <i className="fa-solid fa-trash" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Pagination
                      pageCount={Math.ceil(payments.length / itemsPerPage)}
                      handlePageClick={handlePageClick}
                    />
                  </div>
                </div>
              </main>
            </div>
          </main>
          <Footer />
        </div>

        <>
          <div
            className="modal fade"
            id="editpayment"
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
                    Cập nhật phương thức thanh toán
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
                    <label htmlFor="name_pay_edit" className="form-label">
                      Tên phương thức thanh toán mới
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        // id="name_pay_edit"
                        value={selectedPayment.Name}
                        onChange={(e) =>
                          setSelectedPayment({
                            ...selectedPayment,
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
                    type="submit"
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
            id="addpayment"
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
                    Thêm phương thức thanh toán
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
                      Tên phương thức thanh toán mới
                    </label>
                    <input
                      type="text"
                      value={name}
                      className="form-control"
                      id="name_pay_add"
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
                  <button type="submit" className="btn btn-primary">
                    Thêm mới
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      </div>
      </div>
    </Fragment>
  );
}

export default Payment;
