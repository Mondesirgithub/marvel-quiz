import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../../App.css';
import ErrorPage from '../ErrorPage';
import Footer from '../Footer';
import ForgetPassword from '../ForgetPassword';
import Header from '../Header';
import Lading from '../Lading';
import Login from '../Login';
import SignUp from '../SignUp';
import Welcome from '../Welcome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const afficher =  message => toast.warn(`${message}`, {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: "colored",
  });

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<Lading />} />
        <Route path="/welcome" element={<Welcome afficher={afficher} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgetPassword />} />
        <Route path='*' element={<ErrorPage />} /> 
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
