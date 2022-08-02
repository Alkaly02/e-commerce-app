import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-ecommerce.png";
import { db } from "../../firebase/config";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";

const Login = () => {
  const { login } = useAuth();
  const {setIsOpen} = useModal()
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState('')
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    setDisabled(true)
    setError("");
    e.preventDefault();
    setLoading(true);
    if (email === "" || password === "") {
      setDisabled(false)
      setLoading(false);
      return setError("Les champs ne doivent pas etre vides !");
    }
    if (password.length < 6) {
      setDisabled(false)
      setLoading(false);
      return setError("Le mot de passe doit avoir au moins 6 caracteres !");
    }
    try {
      await login(email, password);
      navigate('/admin')
      setIsOpen(false)
      setLoading(false);
    } catch(err)  {
      setLoading(false);
      setDisabled(false)
      if(err.code === 'auth/user-not-found'){
        return setError('Utilisateur introuvable !')
      }
      if(err.code === 'auth/wrong-password'){
        return setError('Email ou mot de passe incorrect !')
      }
    }
    setDisabled(false)
  };
  return (
    <div className="auth__form__container">
      <div className="auth__form__head">
        <img src={logo} alt="E-commerce Logo" className="auth-logo" />
        <h1 className="text-center">Welcome to Ecommerce</h1>
        <p>Login with email & password</p>
      </div>
      <form onSubmit={handleLogin} className="mt-5 position-relative">
        {error && (
          <div
            style={{ top: "-16%", fontSize: "0.9rem" }}
            className="bg-danger p-2 text-center text-light mb-1 position-absolute w-100"
          >
            {error}
          </div>
        )}
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
            Password
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
        <button disabled={disabled} type="submit" className="btn submit w-100 mt-3">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account ?{" "}
        <Link className="login-signup" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
