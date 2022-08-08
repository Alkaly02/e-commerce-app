import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ModalProvider } from "./context/ModalProvider";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="">
      <ModalProvider>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </ModalProvider>
      <Toaster containerStyle={{bottom: '10%'}} position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
