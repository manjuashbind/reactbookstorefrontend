import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { deleteBookAPI, viewallbooksAPI } from '../Services/allAPI';
import img1 from '../Components/Images/emptyimg.gif'
import img2 from '../Components/Images/bgimage.jpg'


function Dashboard() {
    const [allBooks, setAllBooks] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [userName, setUserName] = useState("")
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPages, settotalPages] = useState()
    const [currentPageData, setcurrentPageData] = useState([])
    const location = useNavigate()
    const logout = () => {
        sessionStorage.clear()
        location('/')
    }
    const getUsername = () => {
        const user = JSON.parse(sessionStorage.getItem('existingUser'))
        console.log(user.username);
        setUserName(user.username)
    }
    useEffect(() => {
        getUsername()
    }, [])
    const viewAllBooks = async () => {
        const token = sessionStorage.getItem("token")
        console.log(token);

        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await viewallbooksAPI(searchKey, reqHeader)
                console.log(result);
                setAllBooks(result.data)
                const books = result.data

                // for Pagination
                const itemsPerPage = 4;
                const totalpage = Math.ceil(books.length / itemsPerPage)
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentpagedata = books.slice(startIndex, endIndex);
                settotalPages(totalpage)
                setcurrentPageData(currentpagedata)

            }
            catch (err) {
                console.log("Error Fetching Books");
            }
        }
    }
    useEffect(() => {
        viewAllBooks()
    }, [searchKey, currentPage])

    // deleteBook Function.......
    const deleteBook = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this book?")
        if (confirmDelete) {
            const token = sessionStorage.getItem("token")
            console.log(token);
            if (token) {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                try {
                    const result = await deleteBookAPI(id, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        alert("Book deleted successfully")
                        viewAllBooks()

                    }
                    else {
                        alert("Error Deleting Book")
                    }
                }
                catch (err) {
                    console.log("Error Deleting book", err);
                }
            }
        }

    }

    // pagination function

    const gotoPage = (page) => {
        setcurrentPage(page);

    }



    return (
        <div>
            <Container fluid className=' bg-light p-2' style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url(${img2})` }}>

                <Row className='p-3 my-3'>
                    <Col>
                        <div className='text-end'>
                            <button onClick={logout} className='btn btn-danger text-white fw-medium'>Logout <i class="fa-solid fa-right-from-bracket"></i></button>
                        </div>
                        <h2 className='text-info'>Welcome <span className='text-white'>{userName}</span>..!</h2>
                        <hr />
                        <p className='text-white '>Here are the books available. Now you can view, add ,edit and  delete books... </p>
                    </Col>
                </Row>
            </Container>

            {/*..................table of Books.......... */}
            <Container className=' my-5'>
                <div className="container my-5  ">
                    <h3 className='text-center text-primary'>Search for Your Favourite Book</h3>
                    <div className='d-flex flex-row justify-content-between '>
                        <input onChange={e => setSearchKey(e.target.value)} type="text" className='form-control' placeholder="Search by book name " />
                        <span className='h4 p-2'><i class="fa-solid fa-magnifying-glass"></i></span>
                    </div>

                </div>
                <div className='text-center text-sm-center text-md-center text-lg-end text-xl-end text-xxl-end p-2 my-2'>
                    <Link to={'/books/add'}> <button className='btn btn-primary fw-medium ' >Add Books + </button></Link>
                </div>
                <div>
                    <h3 className='text-dark fw-medium text-center'>List of Books</h3>

                </div>

                <Row>
                    <Col>
                        <MDBTable align='middle'>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col' className='bg-primary fw-medium text-white h6'>Image</th>
                                    <th scope='col' className='bg-primary fw-medium text-white h6'>Title</th>
                                    <th scope='col' className='bg-primary fw-medium text-white h6'>Author</th>
                                    <th scope='col' className='bg-primary fw-medium text-white h6'>Genre</th>
                                    <th scope='col' className='bg-primary fw-medium text-white h6'>Year Published</th>
                                    <th scope='col' className='bg-primary fw-medium text-white h6'>Action</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody className='text-center bg-light'>
                                {
                                    currentPageData?.length > 0 ? currentPageData?.map((book, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <img src={book.image} alt=''
                                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                        className='rounded-circle'
                                                    />
                                                </div>
                                            </td>
                                            <td><p className='fw-normal mb-1'>{book.title}</p>  </td>
                                            <td> <p className='fw-normal mb-1'>{book.author}</p>    </td>
                                            <td>  {book.genre} </td>
                                            <td>{book.pyear}</td>
                                            <td>
                                                <Link to={`/books/view/${book._id}`}><MDBBtn color='Link' rounded size='sm' className='text-success fw-medium'>  View</MDBBtn></Link>
                                                <Link to={`/books/edit/${book._id}`}><MDBBtn color='Link' rounded size='sm' className='text-primary fw-medium'>  Edit</MDBBtn></Link>
                                                <MDBBtn onClick={(e) => deleteBook(book._id)} color='Link' rounded size='sm' className='text-danger fw-medium'>  <i class="fa-solid fa-trash"></i></MDBBtn>
                                            </td>
                                        </tr>

                                    )) :

                                        // Empty table image

                                        <div className='text-center p-5  mx-auto'>
                                            <img className='img-fluid mx-auto' src={img1} alt="" style={{ maxHeight: '250px' }} />
                                            <h4 className='my-2'>OOps! No Books added yet ! Add Books to view here.</h4>
                                        </div>

                                }



                            </MDBTableBody>
                        </MDBTable>
                        <div className='d-flex justify-content-center'>
                            <button disabled={currentPage === 1} onClick={(e) => gotoPage(currentPage - 1)} className='btn btn-primary mx-1'>Previous</button>
                            <span className='my-auto'>Page {currentPage} of {totalPages}</span>
                            <button disabled={currentPage === totalPages} onClick={(e) => gotoPage(currentPage + 1)} className='btn btn-primary mx-1'>Next</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Dashboard