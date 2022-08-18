import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ModalProvider } from "./context/ModalProvider";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import UserHomePage from "./pages/user/UserHomePage";
import { PanierProvider } from "./context/PanierProvider";
import ProductDetails from "./components/productDetails/ProductDetails";
import Redirect from "./components/Redirect";
import Panier from "./components/panier/Panier";
import Shop from "./components/Shop";

function App() {
  return (
    <div className="">
      <ModalProvider>
        <PanierProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/:shopNameUrl/*" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/adminShops" element={<AdminDashboard />} />
            <Route path="/admin/:shopNameUrl/*" element={<Shop />} />
            <Route path="/user/*" element={<UserHomePage />} />
            <Route path="/user/panier" element={<Panier />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </PanierProvider>
      </ModalProvider>
      <Toaster
        containerStyle={{ bottom: "10%" }}
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
