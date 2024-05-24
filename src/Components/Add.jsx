import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addbookAPI } from '../Services/allAPI';
import { useNavigate } from 'react-router-dom';

function Add() {
    const location = useNavigate()
    const [bookData, setBookData] = useState({ title: "", author: "", genre: "", pyear: "", image: "" })
    console.log(bookData);
    const addBook = async () => {
        const { title, author, genre, pyear, image } = bookData

        if (!title || !author || !genre || !pyear || !image) {
            alert("Enter all fields")
        }
        else {
            const token = sessionStorage.getItem("token")
            console.log(token);

            if (token) {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await addbookAPI(bookData, reqHeader)

                console.log(result);
                if (result.status == 200) {
                    alert(result.data)
                    location('/books')
                }
                else {
                    alert(result.response.data)
                }
            }

        }
    }
    return (
        <div>
            <Container className='my-5'>
                <Row>
                    <Col className='col-12 col-sm-12col-md-12col-lg-6 col-xl-8 col-xxl-8 mx-auto'>
                        <h3 className='text-primary fw-medium text-center'>Add Book</h3>
                        <input type="text" onChange={e => setBookData({ ...bookData, title: e.target.value })} className='form-control my-2' placeholder="Book Name" />
                        <input type="text" onChange={e => setBookData({ ...bookData, author: e.target.value })} className='form-control my-2' placeholder="Author Name" />
                        <input type="text" onChange={e => setBookData({ ...bookData, genre: e.target.value })} className='form-control my-2' placeholder="Genre" />
                        <input type="text" onChange={e => setBookData({ ...bookData, pyear: e.target.value })} className='form-control my-2' placeholder="Year published" />
                        <input type="text" onChange={e => setBookData({ ...bookData, image: e.target.value })} className='form-control my-2' placeholder="Image Url" />
                        <div className='text-center mt-3'>
                            <button className='btn btn-dark' onClick={addBook}>Add Book</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Add