import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { updatebookAPI, viewbookbyidAPI } from '../Services/allAPI';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
  const location = useNavigate()
  const { id } = useParams()
  console.log(id);
  const [book, setBook] = useState({ title: "", author: "", genre: "", pyear: "", image: "" })


  const viewbookbyId = async () => {
    const token = sessionStorage.getItem("token")
    console.log(token);
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      try {
        const result = await viewbookbyidAPI(id, reqHeader)
        console.log(result.data);
        setBook(result.data)
      }
      catch (err) {
        console.log("Cannot Fetch Book by Id");
      }
    }

  }

  useEffect(() => {
    viewbookbyId()
  }, [])

  //......... update function...........
  const updateBook = async () => {
    console.log(book);
    const { title, author, genre, pyear, image } = book
    if (!title || !author || !genre || !pyear || !image) {
      alert("Enter All Fields")
    }
    else {
      const token = sessionStorage.getItem("token")
      console.log(token);
      if (token) {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        try {
          const result = await updatebookAPI(id, book, reqHeader)
          console.log(result);
          if (result.status == 200) {
            alert("Book Updated Successfully")
            location('/books')
          }
          else {
            console.log(result.response.data);
          }

        }
        catch (err) {
          console.log("error fetching :", err);
        }
      }
    }


  }




  return (
    <div>
      <Container className='my-5'>
        <Row>
          <Col className='col-12 col-sm-12col-md-12col-lg-6 col-xl-8 col-xxl-8 mx-auto'>
            <h3 className='text-primary fw-medium text-center my-3'>Edit Book</h3>
            <input value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} type="text" className='form-control my-2' placeholder="Enter Book Name" />
            <input value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} type="text" className='form-control my-2' placeholder="Enter Author Name" />
            <input value={book.genre} onChange={(e) => setBook({ ...book, genre: e.target.value })} type="text" className='form-control my-2' placeholder="Genre" />
            <input value={book.pyear} onChange={(e) => setBook({ ...book, pyear: e.target.value })} type="text" className='form-control my-2' placeholder="Year published" />
            <input value={book.image} onChange={(e) => setBook({ ...book, image: e.target.value })} type="text" className='form-control my-2' placeholder="Image link" />
            <div className='text-center mt-3'>
              <button onClick={updateBook} className='btn btn-dark'>Update details</button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Edit