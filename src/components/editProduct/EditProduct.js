import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase/config";
import toast from "react-hot-toast";
// import useCategories from "../../hooks/useCategories";
import { AiOutlineCloudUpload } from "react-icons/ai";
import useFile from "../../hooks/useFile";
import replaceIcon from "../../utils/functions/replaceIcon";
import ProgressBar from "../progressBar/ProgressBar";

const EditProduct = ({ setIsOpen, selectedProduct }) => {
  const selectedImg = selectedProduct[0]?.imgUrl;
  const [file, setFile] = useState(null);
  const [name, setName] = useState(selectedProduct[0]?.name);
  const [desc, setDesc] = useState(selectedProduct[0]?.description);
  const [loading, setLoading] = useState(false);
  const [prix, setPrix] = useState(selectedProduct[0]?.prix);
  const [quantity, setQuantity] = useState(selectedProduct[0]?.stock);
  const [categoryId, setCategoryId] = useState(selectedProduct[0]?.categoryId);
  // const { categories } = useCategories();

  const { imgUrl } = useFile(file);


  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected) {
      return setFile(selected);
    }
    setFile(null);
  };

  const editProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const productId = selectedProduct[0]?.id;
    await updateDoc(doc(db, "products", productId), {
      name,
      description: desc,
      stock: quantity,
      prix,
      categoryId,
      imgUrl: imgUrl ? imgUrl : selectedImg,
    });
    toast.success("Produit mis a jour !", {
      style: {
        backgroundColor: "#2B3445",
        color: "white",
      },
      iconTheme: {
        primary: "green",
      },
    });
    setLoading(false);
    setIsOpen(false);
  };

  replaceIcon(file, imgUrl);

  return (
    <div
      // style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      className="w-100 bg-white p-5 rounded"
    >
      <div className="modal-header mb-4">
        <h5 className="modal-title fs-5">Mettre à jour le produit</h5>
        <button
          onClick={() => setIsOpen(false)}
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <form onSubmit={editProduct} className="">
        <div className="mb-3 label-container">
          <label id="bg-label">
            <AiOutlineCloudUpload
              style={
                selectedImg ? { display: "none" } : { display: "inline-block" }
              }
              className="icon-upload"
            />
            <img
              id="img-upload"
              style={
                !selectedImg
                  ? { display: "none" }
                  : {
                      display: "inline-block",
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }
              }
              src={selectedImg}
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
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form__input"
            id="name"
            aria-describedby="text"
            // placeholder="Category Name"
          />
        </div>
        <div className="d-md-flex">
          <div className="mb-3 w-100">
            <label className="form-label">Prix</label>
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
            <label className="form-label">Quantité</label>
            <input
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="text"
              className="form__input"
              id="name"
              aria-describedby="text"
              placeholder="Quantite"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            className="form__input"
            id="exampleInputPassword1"
            placeholder="Description"
          ></textarea>
        </div>
        {/* <div className="mb-3">
          <select
            required
            value={categories.filter((cate) => cate.id === category)[0]?.name}
            onChange={(e) => setCategory(e.target.value)}
            className="form__input"
            aria-label="Default select example"
          >
            {categories?.length !== 0 ? (
              <>
                <option value={category}>
                  {categories.filter((cate) => cate.id === category)[0]?.name}
                </option>
                {categories
                  ?.filter((cate) => cate.id !== category)
                  .map((cate) => (
                    <option value={cate.id} key={cate.id}>
                      {cate.name}
                    </option>
                  ))}
              </>
            ) : (
              "Pas de catégorie"
            )}
          </select>
        </div> */}
        <div className="mb-3">
          <button type="submit" className="btn submit px-5 w-100">
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
              "Mettre à jour"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
