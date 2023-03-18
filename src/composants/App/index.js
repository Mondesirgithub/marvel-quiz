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
import { IconContext } from 'react-icons'; //pour aligner les icons, par defaut il n'est pas aligné


const properties = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  theme: "colored"
}

const afficherNotif =  (message, type) => {
  if(type === 'success'){
    toast.success(message, properties)
 }else if (type === 'warning'){
    toast.warn(message, properties)
  }else if (type === 'error'){
    toast.error(message, properties)
  }else{
    toast.info(message, properties)
  }
};


function App() {
  return (
    <BrowserRouter>
      <IconContext.Provider value={{style: {verticalAlign: 'middle'}}}>
      <Header />
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Lading />} />
          <Route path="/welcome" element={<Welcome afficherNotif={afficherNotif} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgetPassword />} />
          <Route path='*' element={<ErrorPage />} /> 
        </Routes>
      <Footer />
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
