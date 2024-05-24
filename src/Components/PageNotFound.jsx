import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img3 from '../Components/Images/pagenotfound.jpg'
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
      <Container>
        <Row>
          <Col className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 mx-auto'>
            <img style={{ maxHeight: '500px' }} className='img-fluid' src={img3} alt="" />
            <div className='text-center mb-3'>
              <Link to={'/'} ><button className='btn btn-dark text-white fw-medium'>Go back home  </button></Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default PageNotFound