import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img1 from '../Components/Images/bookstoreimg2.jpg'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Container fluid className='m-0 '>
                <Row className=' my-3 my-sm-3 my-md-3 my-lg-5 my-xl-5 my-xxl-5 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 d-flex flex-column-reverse flex-sm-column-reverse flex-md-column-reverse flex-lg-row flex-xl-row flex-xxl-row'>
                    <Col className='px-4 py-2 mt-3'>
                        <h2 className='mt-3'>Welcome</h2>
                        <h1 className='display-5 text-primary fw-medium'> To Your Bookstore !</h1>
                        <p className='fw-medium text-dark my-3'>Embark on a journey of book organization and exploration with our innovative management platform, equipped with intuitive tools for adding, editing, deleting, and browsing through your favorite reads.</p>
                        <div className='mt-4 text-center  text-sm-center text-md-center text-lg-start text-xl-start  text-xxl-start'>
                            <Link to={'/login'} ><button className='btn btn-info fw-medium text-white'>Get started</button></Link>
                        </div>
                    </Col>

                    <Col className='m-0 px-1 px-sm-1px-md-1 px-lg-3 px-xl-5 px-xxl-5 rounded '>
                        <img className='img-fluid shadow rounded' src={img1} alt="" />
                    </Col>

                </Row>

            </Container>
        </div>
    )
}

export default Home