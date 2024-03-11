import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <div>
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright © Your Website 2023</div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;