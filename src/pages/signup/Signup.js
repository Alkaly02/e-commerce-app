import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-ecommerce.png";
import { useAuth } from "../../hooks/useAuth";
import "./Signup.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import toast from "react-hot-toast";
import { useModal } from "../../hooks/useModal";
import { useSelector } from 'react-redux';

const Signup = ({ role }) => {

  const { signup } = useAuth();
  const navigate = useNavigate();
  const { setIsOpen } = useModal();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const globalShop = useSelector(state => state.globalShop);
  const shopId = globalShop[0]?.id;

  useEffect(() => { setIsOpen(false) }, [])

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === "" ||
      phone === ""
    ) {
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
    if (password !== confirmpassword) {
      setLoading(false);

      return toast.error("Les mots de passe doivent correspondre !", {
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
      const userCred = await signup(email, password);
      await addDoc(collection(db, "users"), {
        firstname,
        lastname,
        role: "user",
        ownedShop: shopId,
        userId: userCred.user.uid
      });
      toast.success("Inscription reussi !", {
        style: {
          backgroundColor: "#2B3445",
          color: "white",
        },
        iconTheme: {
          primary: "green",
        },
      });
      setTimeout(() => {
        navigate(`/${globalShop[0]?.shopName.toLowerCase()}/login`);
      }, 2000);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.code);
      if (err.code === "auth/email-already-in-use") {
        return toast.error("L'utilisateur existe !", {
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

  };

  return (
    <div className="auth-container">
      <div className="auth__form__container">
        <div className="auth__form__head">
          <img style={{ width: '100px' }} src={logo} alt="E-commerce Logo" className="auth-logo" />
          <h1 className="text-center">Créer un compte</h1>
          <p className="text-center">Remplissez tous les champs pour continuer</p>
        </div>
        <form onSubmit={handleSignup} className="mt-5 position-relative">
          <div className="d-sm-flex justify-content-between">
            <div className="mb-3 form__input--flex">
              <label htmlFor="firstname" className="form-label">
                Prénom
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
                Nom
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
          <div className="d-sm-flex justify-content-between">
            <div className="mb-3 form__input--flex">
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
            <div className="mb-3 form__input--flex ps-sm-3 p-0">
              <label htmlFor="confirmpassword" className="form-label">
                Confirmer mot de passe
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
          </div>
          <div className="mb-3">
              <label htmlFor="confirmpassword" className="form-label">
                Télephone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="phone"
                className="form__input"
                id="phone"
                placeholder="777777777"
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
              "Inscription"
            )}
          </button>
        </form>
        <p className="text-center mt-4">
          Vous avez déjà un compte ?{" "}
          <Link className="login-signup" to={`/${globalShop[0]?.shopName.toLowerCase()}/login`}>
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
