import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-ecommerce.png";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";
import { useSelector } from 'react-redux';

const Login = ({title}) => {
  const { login } = useAuth();
  const { modalIsOpen, setIsOpen } = useModal();
  const navigate = useNavigate();
  const globalShop = useSelector(state => state.globalShop)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState("");

  const handleLogin = async (e) => {
    setDisabled(true);
    e.preventDefault();
    setLoading(true);
    if (email === "" || password === "") {
      setDisabled(false);
      setLoading(false);
      return toast.error("Les champs ne doivent pas etre vides !", {
        style: {
          backgroundColor: "#2B3445",
          color: "white",
        },
        iconTheme: {
          primary: "red",
        },
      });
    }
    if (password.length < 6) {
      setDisabled(false);
      setLoading(false);
      return toast.error("Le mot de passe doit avoir au moins 6 caracteres !", {
        style: {
          backgroundColor: "#2B3445",
          color: "white",
        },
        iconTheme: {
          primary: "red",
        },
      });
    }
    try {
      await login(email, password);
      navigate("/redirect");
      setIsOpen(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setDisabled(false);
      if (err.code === "auth/user-not-found") {
        return toast.error("Utilisateur introuvable !", {
          style: {
            backgroundColor: "#2B3445",
            color: "white",
          },
          iconTheme: {
            primary: "red",
          },
        });
      }
      if (err.code === "auth/wrong-password") {
        return toast.error("Email ou mot de passe incorrect !", {
          style: {
            backgroundColor: "#2B3445",
            color: "white",
          },
          iconTheme: {
            primary: "red",
          },
        });
      }
    }
    setDisabled(false);
  };
  return (
    <div className="auth__form__container">
      {modalIsOpen && (
        <div className="mb-4 d-flex justify-content-end">
          {" "}
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="auth__form__head">
        <img
          style={{ width: "100px" }}
          src={logo}
          alt="E-commerce Logo"
          className="auth-logo"
        />
        <h1 className="text-center fs-sm-5 fs-6">{title}</h1>
      </div>
      <form onSubmit={handleLogin} className="mt-3 position-relative">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form__input"
            id="email"
            aria-describedby="emailHelp"
            placeholder="exemple@gmail.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form__input"
            id="password"
            placeholder="******"
          />
        </div>
        <button
          disabled={disabled}
          type="submit"
          className="btn submit w-100 mt-3"
        >
          {loading ? (
            <div className="text-center">
              <div
                style={{ width: "20px", height: "20px" }}
                className="spinner-border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            "Connexion"
          )}
        </button>
      </form>
      <p className="text-center mt-4">
        Nous n'avez pas de compte ?{" "}
        <Link className="login-signup" to={`/${globalShop[0]?.shopName.toLowerCase()}/signup`}>
          Inscrivez-vous
        </Link>
      </p>
    </div>
  );
};

export default Login;
