
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import View from './Components/View';
import Add from './Components/Add';
import Edit from './Components/Edit';
import Login from './Components/Login';
import Register from './Components/Register';
import PageNotFound from './Components/PageNotFound';
import Dashboard from './Components/Dashboard';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route  path='/' element={<Home/>} />        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route  path='/books' element={<Dashboard/>} />
        <Route  path='/books/view/:id' element={<View/>}/>
        <Route path='/books/add' element={<Add/>}/>
        <Route path='/books/edit/:id' element={<Edit/>}/>  

        <Route path='*' element={<PageNotFound/>}/>   
           

      </Routes>
      <Footer/>
   
    </div>
  );
}

export default App;
