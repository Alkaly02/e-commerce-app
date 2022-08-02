import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ModalProvider } from './context/ModalProvider';
import AdminDashboard from './pages/admin/AdminDashboard';
import Home from './pages/home/Home';
import LoginPage from './pages/login/LoginPage';
import Signup from './pages/signup/Signup';

function App() {
  return (
    <div className="">
      <ModalProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin/*' element={<AdminDashboard />} />
      </Routes>
      </ModalProvider>
    </div>
  );
}

export default App;
