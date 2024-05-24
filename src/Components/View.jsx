import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img3 from '../Components/Images/bookstoreimg1.jpg'
import { Link, useParams } from 'react-router-dom';
import { viewbookbyidAPI } from '../Services/allAPI';


function View() {
  const { id } = useParams()
  console.log(id);
  const [book, setBook] = useState({})
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



  return (
    <div>
      <Container className='my-5'>
        <Row className='row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2'>
          <Col className='bg-light p-3' >
            <div className='text-center'>
              <img className='img-fluid shadow mx-auto' src={book.image} alt="img" style={{ maxHeight: '400px' }} />
            </div>

          </Col>
          <Col className='bg-light  p-3'>
            <h3 className='text-success text-center'>Book Details</h3>
            <hr /><br />
            <h5 className='text-primary'><span className='text-dark'>Title</span> : {book.title}</h5>
            <h5 className='text-primary'><span className='text-dark'>Author</span>  : {book.author}</h5>
            <h5 className='text-primary'><span className='text-dark'>Genre</span> : {book.genre}</h5>
            <h5 className='text-primary'><span className='text-dark'>Year Published</span> : {book.pyear}</h5>
            <br /> <hr />

            <div className='text-center mt-5'>
              <Link to="/books"><button className='btn btn-outline-primary text-dark fw-medium'> <i class="fa-solid fa-arrow-left"></i> Back to dashboard</button></Link>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default View