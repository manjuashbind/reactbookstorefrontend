import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import loginimg from '../Components/Images/loginimg.png'
import { loginAPI } from '../Services/allAPI';


function Login() {
  const location = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    const userData = { email, password }
    if (!email && !password) {
      alert("Enter All Fields")
    }
    else {
      const result = await loginAPI(userData)
      console.log(result);
      if (result.status == 200) {
        alert("Login Successfull")
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
        sessionStorage.setItem("token", result.data.token)
        location('/books')
      }
      else {
        alert("Please Enter Valid Details")
      }
    }

  }

  return (
    <div>
      <Container >
        <Row className='my-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2'>
          <Col>
            <img className='img-fluid' src={loginimg} alt="" />
          </Col>
          <Col className='my-5'>
            <h1 className='text-center text-primary'>Login here..</h1>
            <input onChange={e => setEmail(e.target.value)} type="text" className='form-control my-3' placeholder="Enter User Email" />
            <input onChange={e => setPassword(e.target.value)} type="password" className='form-control my-3' placeholder="Enter Password" />
            <div className='text-center'>
              <button onClick={login} className='btn btn-dark text-white fw-medium my-3'>Login</button><br />
              <Link to={'/register'}> <a href="#">Not Registered ?, register here</a></Link>
            </div>


          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login