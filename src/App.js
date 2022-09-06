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
import Welcome from "./pages/welcome/Welcome";
import ConnectedPanier from "./components/panier/ConnectedPanier";
import RedirectUser from "./components/RedirectUser";
import UserComandsPage from "./components/commands/UserComandsPage";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div className="">
      <ModalProvider>
        <PanierProvider>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="" element={<Welcome />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/:shopNameUrl/*" element={<Home />} />
            <Route path="/:shopNameUrl/panier" element={<Panier />} />
            <Route path="/:shopNameUrl/login" element={<LoginPage />} />
            <Route path="/:shopNameUrl/signup" element={<Signup />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/redirectUser" element={<RedirectUser />} />
            <Route path="/adminShops" element={<AdminDashboard />} />
            <Route path="/admin/:shopNameUrl/*" element={<Shop />} />
            <Route path="/admin/:shopNameUrl/login" element={<LoginPage />} />
            <Route path="/user/:shopNameUrl/*" element={<UserHomePage />} />
            <Route path="/user/:shopNameUrl/panier" element={<ConnectedPanier />} />
            <Route path="/user/:shopNameUrl/commands/*" element={<UserComandsPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
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
