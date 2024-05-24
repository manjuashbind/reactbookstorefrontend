import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { registerAPI } from '../Services/allAPI';
import { useNavigate, Link } from 'react-router-dom';
import loginimg from '../Components/Images/loginimg.png'


function Register() {
  const location = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    const user = { username, email, password }
    console.log(user);
    if (!username || !email || !password) {
      alert("Enter All Fields")
    }
    else {
      const result = await registerAPI(user)
      console.log(result);
      if (result.status == 200) {
        alert(result.data)
        location('/login')

      }
      else {
        alert(result.response.data)
      }

    }

  }

  return (
    <div>
      <Container>
        <Row className='row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2'>
          <Col>
            <img className='img-fluid' src={loginimg} alt="" />
          </Col>
          <Col className='col my-5'>
            <h1 className='text-center text-primary'>Register here..</h1>
            <input onChange={e => setUsername(e.target.value)} type="text" className='form-control my-3' placeholder="Enter User Username" />
            <input onChange={e => setEmail(e.target.value)} type="text" className='form-control my-3' placeholder="Enter User Email" />
            <input onChange={e => setPassword(e.target.value)} type="password" className='form-control my-3' placeholder="Enter Password" />
            <div className='text-center'>
              <button onClick={login} className='btn btn-dark text-white fw-medium my-3'>Register</button><br />
              <Link to={'/login'} ><a href="/login">Already registered ? login here</a></Link>
            </div>

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register