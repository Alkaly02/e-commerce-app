import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-ecommerce.png";
import { useAuth } from "../../hooks/useAuth";
import "./Signup.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    setError("");
    e.preventDefault();
    setLoading(true);
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      setLoading(false);
      return setError("Les champs ne doivent pas etre vides !");
    }
    if (password.length < 6) {
      setLoading(false);
      return setError("Le mot de passe doit avoir au moins 6 caracteres !");
    }
    if (password !== confirmpassword) {
      setLoading(false);
      return setError("Les mots de passe doivent correspondre !");
    }
    try {
      console.log("avant signup");
      await signup(email, password);
      console.log("apres signup");
      await addDoc(collection(db, "users"), {
        firstname,
        lastname,
        email,
      });
      setSuccess('Inscription reussi !')
      setLoading(false);
      console.log("apres adddoc");
    } catch(err) {
      setLoading(false);
      if(err.code === 'auth/user-not-found'){
        return setError('Utilisateur introuvable !')
      }
      if(err.code === 'auth/wrong-password'){
        return setError('Email ou mot de passe incorrect !')
      }
    }
    setTimeout(() => {
      setSuccess('')
      navigate('/login')
    }, 2000)
  };

  return (
    <div className="auth-container">
      <div className="auth__form__container">
        <div className="auth__form__head">
          <img src={logo} alt="E-commerce Logo" className="auth-logo" />
          <h1 className="text-center">Create Your Account</h1>
          <p>Please fill all fields to continue</p>
        </div>
        <form onSubmit={handleSignup} className="mt-5 position-relative">
          {error && (
            <div
              style={{ top: "-10%", fontSize: "0.9rem" }}
              className="bg-danger p-2 text-center text-light mb-1 position-absolute w-100"
            >
              {error}
            </div>
          )}
          {success && (
            <div
              style={{ top: "-10%", fontSize: "0.9rem" }}
              className="bg-success p-2 text-center text-light mb-1 position-absolute w-100"
            >
              {success}
            </div>
          )}
          <div className="d-sm-flex justify-content-between">
            <div className="mb-3 form__input--flex">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                className="form__input"
                id="firstname"
                placeholder="Alkaly"
              />
            </div>
            <div className="mb-3 form__input--flex ps-sm-3 p-0">
              <label htmlFor="lastname" className="form-label">
                Lastname
              </label>
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                className="form__input"
                id="lastname"
                placeholder="BADJI"
              />
            </div>
          </div>
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
          <div className="mb-3">
            <label htmlFor="confirmpassword" className="form-label">
              Confirm Password
            </label>
            <input
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className="form__input"
              id="confirmpassword"
              placeholder="******"
            />
          </div>
          <button type="submit" className="btn submit w-100 mt-3">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account ?{" "}
          <Link className="login-signup" to="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
