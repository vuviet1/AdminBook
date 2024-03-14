import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";

function Error401() {
  return (
    <div className="sb-nav-fixed">
      <Header />
      <div id="layoutSidenav">
        <Navbar />
        <div id="layoutSidenav_content">
          <Footer />
        </div>
        <div id="layoutError">
          <div id="layoutError_content">
            <main>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <div className="text-center mt-4">
                      <h1 className="display-1">401</h1>
                      <p className="lead">Unauthorized</p>
                      <p>Access to this resource is denied.</p>
                      <a href="index.html">
                        <i className="fas fa-arrow-left me-1" />
                        Return to Dashboard
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div id="layoutError_footer">
            <footer className="py-4 bg-light mt-auto">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">
                    Copyright © Your Website 2023
                  </div>
                  <div>
                    <a href="#">Privacy Policy</a>·
                    <a href="#">Terms &amp; Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Error401;
