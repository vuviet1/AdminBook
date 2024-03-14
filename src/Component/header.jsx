import React, { useState, useEffect } from "react";

function Time() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    startTime();
    const timerId = setInterval(() => {
      startTime();
    }, 500);

    // Clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    const curDay = today.getDate();
    const curMonth = today.getMonth() + 1;
    const curYear = today.getFullYear();

    const weekdays = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];
    const curDw = weekdays[today.getDay()];

    m = checkTime(m);
    s = checkTime(s);

    const formattedTime =
      curDw +
      ", " +
      curDay +
      "/" +
      curMonth +
      "/" +
      curYear +
      "    -   " +
      h +
      " giờ " +
      m +
      " phút " +
      s +
      " giây ";

    setCurrentTime(formattedTime);
  }

  function checkTime(i) {
    return i < 10 ? "0" + i : i;
  }

  return (
    <div id="timer" style={{ color: "white" }}>
      {currentTime}
    </div>
  );
}

class Header extends React.Component {
  componentDidMount() {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sb-sidenav-toggled");
        localStorage.setItem(
          "sb|sidebar-toggle",
          document.body.classList.contains("sb-sidenav-toggled")
        );
      });
    }
  }

  handleSidebarToggle = () => {
    document.body.classList.toggle("sb-sidenav-toggled");
    localStorage.setItem(
      "sb|sidebar-toggle",
      document.body.classList.contains("sb-sidenav-toggled")
    );
  };

  handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("loggedIn");
    // Redirect to login page
    window.location.href = "/";
  };

  render() {
    return (
      <div>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          {/* Navbar Brand*/}
          <a
            className="navbar-brand ps-3"
            href="/"
            style={{ textAlign: "center" }}
          >
            Trang quản lý
          </a>
          {/* Sidebar Toggle*/}
          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            onClick={this.handleSidebarToggle}
          >
            <i className="fas fa-bars" />
          </button>

          <div style={{ marginLeft: 750 }}>
            {/* Use the Time component here */}
            <div id="current-time">
              <Time />
            </div>
            <div>{/* Remove this div, as it's already included above */}</div>
          </div>
          
          {/* Navbar Search */}
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></form>
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <button
              className="nav-link bg-warning border"
              type="button"
              style={{ borderRadius: 5, color: "white", marginTop: "0px" }}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <i className="fa-solid fa-arrow-right-from-bracket" />
            </button>
          </ul>
        </nav>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Thoát chương trình
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                Bạn có chắc chắn muốn thoát khỏi chương trình không ?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Hủy bỏ
                </button>
                <a type="button" className="btn btn-danger" onClick={this.handleLogout}>
                  Xác nhận
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
