import React, { useEffect, useRef } from "react";
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";
import Chart from "chart.js/auto";

function Index() {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");

            if (!Chart.defaults.global) {
                Chart.defaults.global = {};
            }

            Chart.defaults.global.defaultFontFamily =
                '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
            Chart.defaults.global.defaultFontColor = "#292b2c";

            const data = {
                labels: [
                    "Mar 1",
                    "Mar 2",
                    "Mar 3",
                    "Mar 4",
                    "Mar 5",
                    "Mar 6",
                    "Mar 7",
                    "Mar 8",
                    "Mar 9",
                    "Mar 10",
                    "Mar 11",
                    "Mar 12",
                    "Mar 13",
                ],
                datasets: [
                    {
                        label: "Sessions",
                        lineTension: 0.3,
                        backgroundColor: "rgba(2,117,216,0.2)",
                        borderColor: "rgba(2,117,216,1)",
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(2,117,216,1)",
                        pointBorderColor: "rgba(255,255,255,0.8)",
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(2,117,216,1)",
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: [
                            10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849,
                            24159, 32651, 31984, 38451,
                        ],
                    },
                ],
            };

            const options = {
                scales: {
                    y: {
                        type: "linear",
                        ticks: {
                            min: 0,
                            max: 40000,
                            maxTicksLimit: 5,
                        },
                        gridLines: {
                            color: "rgba(0, 0, 0, .125)",
                        },
                    },
                },
                legend: {
                    display: false,
                },
            };

            const myAreaChart = new Chart(ctx, {
                type: "line",
                data,
                options,
            });

            return () => {
                myAreaChart.destroy();
            };
        }
    }, []);

    const chartRef1 = useRef(null);

    useEffect(() => {
        if (chartRef1.current) {
            const ctx1 = chartRef1.current.getContext("2d");

            if (!Chart.defaults.global) {
                Chart.defaults.global = {};
            }

            Chart.defaults.global.defaultFontFamily =
                '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
            Chart.defaults.global.defaultFontColor = "#292b2c";

            const data = {
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                        label: "Revenue",
                        backgroundColor: "rgba(2,117,216,1)",
                        borderColor: "rgba(2,117,216,1)",
                        data: [4215, 5312, 6251, 7841, 9821, 14984],
                    },
                ],
            };

            const options = {
                scales: {
                    x: {
                        type: "category",
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            maxTicksLimit: 6,
                        },
                    },
                    y: {
                        ticks: {
                            min: 0,
                            max: 15000,
                            maxTicksLimit: 5,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                },
                legend: {
                    display: false,
                },
            };

            const myBarChart = new Chart(ctx1, {
                type: "bar",
                data,
                options,
            });

            return () => {
                myBarChart.destroy();
            };
        }
    }, []);

    useEffect(() => {
        startTime();
    }, []);

    function startTime() {
        // Lấy Object ngày hiện tại
        const today = new Date();

        // Giờ, phút, giây hiện tại
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();

        // Ngày hiện tại
        const curDay = today.getDate();

        // Tháng hiện tại
        const curMonth = today.getMonth() + 1;

        // Năm hiện tại
        const curYear = today.getFullYear();

        // Thứ trong tuần
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

        // Chuyển đổi sang dạng 01, 02, 03
        m = checkTime(m);
        s = checkTime(s);

        // Ghi ra trình duyệt
        const timerElement = document.getElementById("timer");
        if (timerElement) {
            timerElement.innerHTML =
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
        }

        // Dùng hàm setTimeout để thiết lập gọi lại 0.5 giây / lần
        var t = setTimeout(function () {
            startTime();
        }, 500);
    }

    // Hàm này có tác dụng chuyển những số bé hơn 10 thành dạng 01, 02, 03, ...
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    return (
        <div className="sb-nav-fixed" onLoad={startTime}>
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
                                        <div>Bảng điều khiển</div>
                                        <div />
                                    </li>
                                </ol>
                            </div>

                            <div>
                                <div style={{ marginTop: 10 }} />
                                <div className="row">
                                    <div className="col-xl-6 col-md-6">
                                        <div
                                            className="card text-black mb-4"
                                            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
                                        >
                                            <div className="card-body">
                                                <div style={{ display: "flex" }}>
                                                    <div
                                                        style={{
                                                            width: 100,
                                                            height: 100,
                                                            background: "greenyellow",
                                                            borderRadius: 10,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <div>
                                                            <i
                                                                className="fa-solid fa-sack-dollar"
                                                                style={{ fontSize: 45, color: "green" }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="row no-gutters align-items-center"
                                                        style={{ marginLeft: 10 }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize: 30,
                                                                fontWeight: "bold",
                                                                color: "red",
                                                            }}
                                                        >
                                                            Tổng thu nhập
                                                        </div>
                                                        <div style={{ fontSize: 20, fontWeight: "bold" }}>
                                                            104.000.000 đ
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6">
                                        <div
                                            className="card text-black mb-4"
                                            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
                                        >
                                            <div className="card-body">
                                                <div style={{ display: "flex" }}>
                                                    <div
                                                        style={{
                                                            width: 100,
                                                            height: 100,
                                                            background: "#b6d4fe",
                                                            borderRadius: 10,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <div>
                                                            <i
                                                                className="fa-solid fa-database"
                                                                style={{ fontSize: 45, color: "#0b5ed7" }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="row no-gutters align-items-center"
                                                        style={{ marginLeft: 10 }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize: 30,
                                                                fontWeight: "bold",
                                                                color: "red",
                                                            }}
                                                        >
                                                            Tổng sản phẩm
                                                        </div>
                                                        <div style={{ fontSize: 20, fontWeight: "bold" }}>
                                                            1850 sản phẩm
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6">
                                        <div
                                            className="card text-black mb-4"
                                            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
                                        >
                                            <div className="card-body">
                                                <div style={{ display: "flex" }}>
                                                    <div
                                                        style={{
                                                            width: 100,
                                                            height: 100,
                                                            background: "blanchedalmond",
                                                            borderRadius: 10,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <div>
                                                            <i
                                                                className="fa-solid fa-briefcase"
                                                                style={{ fontSize: 45, color: "orange" }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="row no-gutters align-items-center"
                                                        style={{ marginLeft: 10 }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize: 30,
                                                                fontWeight: "bold",
                                                                color: "red",
                                                            }}
                                                        >
                                                            Tổng đơn hàng
                                                        </div>
                                                        <div style={{ fontSize: 20, fontWeight: "bold" }}>
                                                            246 đơn hàng
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6">
                                        <div
                                            className="card text-black mb-4"
                                            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
                                        >
                                            <div className="card-body">
                                                <div style={{ display: "flex" }}>
                                                    <div
                                                        style={{
                                                            width: 100,
                                                            height: 100,
                                                            background: "#F6CECE",
                                                            borderRadius: 10,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <div>
                                                            <i
                                                                className="fa-regular fa-trash-can"
                                                                style={{ fontSize: 45, color: "#FE2E2E" }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="row no-gutters align-items-center"
                                                        style={{ marginLeft: 10 }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize: 30,
                                                                fontWeight: "bold",
                                                                color: "red",
                                                            }}
                                                        >
                                                            Đơn hàng hủy
                                                        </div>
                                                        <div style={{ fontSize: 20, fontWeight: "bold" }}>
                                                            2 đơn hàng
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-chart-area me-1" />
                                            Dữ liệu 6 tháng đầu vào
                                        </div>
                                        <div className="card-body">
                                            <canvas
                                                ref={chartRef}
                                                id="myAreaChart"
                                                width="100%"
                                                height={40}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-chart-bar me-1" />
                                            Thống kê 6 tháng doanh thu
                                        </div>
                                        <div className="card-body">
                                            <canvas
                                                ref={chartRef1}
                                                id="myBarChart"
                                                width="100%"
                                                height={40}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Index;