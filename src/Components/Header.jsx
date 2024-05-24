import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Header() {
  return (
    <div>
      <Navbar expand="lg" className="bg-primary">
        <Container fluid>
          <Navbar.Brand href="#home" className='text-dark fw-bold ' style={{ fontSize: '25px' }}><i class="fa-solid fa-book-open"></i><span className=' text-white p-2'> BookStore </span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav " className='text-white' />
          <Navbar.Collapse id="basic-navbar-nav ">

            <Nav className="ms-5">
              <Nav.Link href="/" className='fw-medium text-light'>Home</Nav.Link>
              <Nav.Link href="/register" className='fw-medium text-light'>Register</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header