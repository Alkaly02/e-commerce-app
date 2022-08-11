import React, { useState } from "react";
import useFile from "../../hooks/useFile";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./addProducts.css";
import useCategories from "../../hooks/useCategories";
import replaceIcon from "../../utils/functions/replaceIcon";
import AddDoc from "../../utils/functions/AddDoc";
import toast from "react-hot-toast";
import ProgressBar from "../progressBar/ProgressBar";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [prix, setPrix] = useState("");
  const [stock, setStock] = useState("");
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const { categories } = useCategories();
  const [loading, setLoading] = useState(false);
  // get the url image
  const { imgUrl, setImgUrl, per } = useFile(file);

  // remove the icon
  replaceIcon(file, imgUrl);

  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected) {
      return setFile(selected);
    }
    setFile(null);
  };
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    await AddDoc("products", { name, prix, stock, description: desc, imgUrl, category });
    toast.success("Produit ajoutée !", {
      style: {
        backgroundColor: "#2B3445",
        color: "white",
      },
      iconTheme: {
        primary: "green",
      },
    });
    setName('')
    setPrix('')
    setStock('')
    setDesc('')
    setCategory('')
    setFile('')
    setImgUrl('')
    setLoading(false);
    document.getElementById('img-upload').setAttribute('src', '')
    document.getElementById('img-upload').style.display = 'none'
    document.querySelector('.icon-upload').style.display = 'block'
  };
  return (
    <div style={{paddingBottom: '10rem'}} className="mx-4 pt-3 w-100">
      <div className="add-product">
        <h5 style={{cursor: ''}} className="add-title mb-4 py-3">Ajouter</h5>
        <form onSubmit={addProduct}>
          <div className="d-flex flex-md-row flex-column-reverse">
            <div className="form-left">
              <div className="mb-3">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="form__input"
                  id="name"
                  aria-describedby="text"
                  placeholder="Nom du produit"
                />
              </div>
              <div className="d-md-flex">
                <div className="mb-3 w-100">
                  <input
                    required
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    type="number"
                    className="form__input"
                    id="name"
                    aria-describedby="text"
                    placeholder="Prix du produit"
                  />
                </div>
                <div className="mb-3 ms-md-4 w-100">
                  <input
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type="text"
                    className="form__input"
                    id="name"
                    aria-describedby="text"
                    placeholder="Quantite"
                  />
                </div>
              </div>
              <div className="mb-3">
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  type="text"
                  className="form__input"
                  id=""
                  placeholder="Description"
                  rows="5"
                ></textarea>
              </div>
              <div className="mb-3">
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form__input"
                  aria-label="Default select example"
                >
                  {categories?.length !== 0 ? (
                    <>
                      <option value="">Sélectionner la catégorie</option>
                      {categories?.map((category) => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                      ))}
                    </>
                  ) : (
                    "Pas de catégorie"
                  )}
                </select>
              </div>
            </div>
            <div className="form-right">
              <div className="mb-3 label-container">
                <label>
                  <AiOutlineCloudUpload className="icon-upload" />
                  <img
                    id="img-upload"
                    style={{ display: "none" }}
                    src=""
                    alt="uploaded"
                  />
                  <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleChange}
                  />
                </label>
                {
                  file && <ProgressBar file={file} setFile={setFile} />
                }
              </div>
            </div>
          </div>
          <div className="mb-3 btn-container">
            <button type="submit" className="btn submit submit-product px-5">
              {loading ? (
                <div
                  style={{ width: "20px", height: "20px" }}
                  className="spinner-border"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Ajouter"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
