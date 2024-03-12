import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import Header from "../../Component/header";
import Navbar from "../../Component/nav";
import Footer from "../../Component/footer";

import request from "../../utils/request";
import { useParams } from 'react-router-dom';

function EditBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    const [categoryName, setCategoryName] = useState(null);
    const [categoryId, setCategoryId] = useState(0);
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {
        const fetch = async () => {
          try {
            const response = await request.get("Category/byParntId");
            setCategoryOptions(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetch();
      }, [request]);


    useEffect(() => {
        const fetchBookDetails = async () => {
          try {
            const response = await request.get(`Book/id=${id}`);
            if (response.ok) {
                const data = await response.json();
                setBook(data);
            } else {
                console.error('Failed to fetch book details:', response.statusText);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchBookDetails();
      }, [id]);


    // const [selectedImage, setSelectedImage] = useState(null);

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (event) => {
    //             setSelectedImage(event.target.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    return (
        <div className="sb-nav-fixed">
            <Header />
            <div id="layoutSidenav">
                <Navbar />
                <div id="layoutSidenav_content">

                    <main>
                        <div className="container-fluid px-4">
                            {/* <h1 className="mt-4">Thêm sách mới</h1> */}
                            <div
                                className="card border-left-primary shadow h-100 py-1"
                                style={{
                                    borderLeft: "0.25rem solid orange !important",
                                    textAlign: "center",
                                    marginTop: 10
                                }}
                            >
                                <ol className="breadcrumb mb-2">
                                    <li
                                        className="breadcrumb-item active"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginLeft: 10
                                        }}
                                    >
                                        <div>
                                            Quản lý sách / Sửa sách
                                        </div>
                                    </li>
                                </ol>
                            </div>
                            <div style={{ marginTop: 10 }} />
                            <main>
                                <div className="card mb-4 col-12">
                                    <div className="card-header">
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div style={{ marginTop: 5 }}>
                                                <i className="fa-solid fa-book"></i> Sửa sách
                                            </div>
                                        </div>
                                    </div>
                                    <form className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="isbn1" className="form-label">
                                                Mã ISBN
                                            </label>
                                            <input type="text" className="form-control" value={book ? book.Isbn : ''} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="name_book_edit" className="form-label">
                                                Tên sách
                                            </label>
                                            <input type="text" className="form-control" value={book ? book.Name : ''} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="price1" className="form-label">
                                                Giá
                                            </label>
                                            <input type="number" className="form-control" value={book ? book.Price : ''} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="inputGroupFile02">
                                                Tải ảnh lên
                                            </label><br />
                                            {/* {selectedImage && (
                                                <div>
                                                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', marginBottom: "15px" }} />
                                                </div>
                                            )} */}
                                            <input type="file" className="form-control" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="publisher1" className="form-label">
                                                Nhà xuất bản
                                            </label>
                                            <input type="text" className="form-control" value={book ? book.Publisher : ''} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="author1" className="form-label">
                                                Tác giả
                                            </label>
                                            <input type="text" className="form-control" value={book ? book.Author : ''} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="author1" className="form-label">
                                                Năm xuất bản
                                            </label>
                                            <input type="text" className="form-control" value={book ? book.PublishYear : ''} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="cate1" className="form-label">
                                                Danh mục
                                            </label>
                                            <select
                                                className="form-select"
                                                value={categoryId}
                                                onChange={(e) => {
                                                    setCategoryId(e.target.value);
                                                    const selectedCategory = categoryOptions.find(option => option.id === parseInt(e.target.value));
                                                    setCategoryName(selectedCategory ? selectedCategory.name : null);
                                                }}
                                                required
                                            >
                                                <option value={0}>-- Chọn danh mục --</option>
                                                {categoryOptions.map(option => (
                                                    <option
                                                        key={option.id}
                                                        value={option.id}
                                                        selected={book.CategoryId == option.Id} // Set selected attribute conditionally
                                                    >
                                                        {option.Name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="des1" className="form-label">
                                                Mô tả
                                            </label>
                                            <textarea type="text" className="form-control" value={book ? book.Description : ''}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            {/* <label htmlFor="author1" className="form-label">
                                                Năm xuất bản
                                            </label> */}
                                        </div>
                                        <div className="mb-3">
                                            <button type="submit" className="btn btn-primary" style={{ float: 'right' }}>
                                                Cập nhập
                                            </button>
                                        </div>
                                    </form>
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

export default EditBook;
