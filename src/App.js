import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route,  Routes} from 'react-router-dom'
import Home from './Home.js';
import Register from './Register';
import Login from './Login';
import {ToastContainer} from 'react-toastify';
import AppHeader from './AppHeader';
import Customer from './Customer';
function App() {
  return (
    <div className="App">
        <ToastContainer theme='dark'></ToastContainer>
        <BrowserRouter>
          <AppHeader></AppHeader>
          <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/customer" element={<Customer />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
