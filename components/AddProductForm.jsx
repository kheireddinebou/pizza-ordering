import styles from "../styles/AddProductForm.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { useState, useRef } from "react";
import axios from "axios";

const AddProductForm = ({ setShowForm }) => {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");
  const [options, setOptions] = useState([]);
  const [prices, setPrices] = useState([]);
  const [formData, setFormDate] = useState({});

  const extraPrice = useRef();
  const extraItem = useRef();

  const handleNewExtra = e => {
    e.preventDefault();
    if (extraPrice.current.value !== "" && extraItem.current.value !== "") {
      const newOption = {
        text: extraItem.current.value,
        price: extraPrice.current.value,
      };

      setOptions([...options, newOption]);
      extraItem.current.value = "";
      extraPrice.current.value = "";
    }
  };

  const handleFile = async e => {
    setLoading(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dqkh79cry/image/upload",
        data
      );

      const { url } = res.data;
      setImg(url);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handlePrices = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormDate({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newForm = {
      ...formData,
      prices,
      img,
      extraOptions: options,
    };

    try {
      console.log(newForm);
      const res = await axios.post(
        "https://pizza-ordering.vercel.app/api/products",
        newForm
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.addProductPage}>
      <div className={styles.addProduct}>
        <AiOutlineClose
          className={styles.closeBtn}
          onClick={() => setShowForm(false)}
        />

        <span className="display-6 fw-bolder">Add a new pizza</span>

        <form>
          <div className="d-flex align-items-center">
            <span className="h5 mt-3">Choose an image</span>

            <input
              style={{ display: "none" }}
              type="file"
              id="img-input"
              accept="image/*"
              onChange={e => handleFile(e)}
            />
            <label htmlFor="img-input" className="fs-2 mx-3 pointer">
              <BsImages />
            </label>
            {loading && <div className="spinner-border"></div>}
          </div>
          <span className="h5 mt-3">Title</span>

          <input
            onChange={e => handleChange(e)}
            type="text"
            name="name"
            required
          />

          <span className="h5 mt-3">Desc</span>
          <textarea
            onChange={e => handleChange(e)}
            name="desc"
            rows={4}
            required
          />

          <span className="h5 mt-3">Prices</span>
          <div className={styles.pricesInputs}>
            <input
              onChange={e => handlePrices(e, 0)}
              type="number"
              placeholder="Small"
            />
            <input
              onChange={e => handlePrices(e, 1)}
              type="number"
              placeholder="Medium"
            />
            <input
              onChange={e => handlePrices(e, 2)}
              type="number"
              placeholder="Large"
            />
          </div>

          <span className="h5 mt-3">Extra</span>
          <div className={styles.extraInputs}>
            <input ref={extraItem} type="text" placeholder="Item" />
            <input ref={extraPrice} type="number" placeholder="Price" />
            <button
              onClick={e => handleNewExtra(e)}
              className="btn btn-secondary"
            >
              Add
            </button>
          </div>

          <div className="d-flex align-items-center gap-2">
            {options.map((o, i) => (
              <span key={i} className={styles.option}>
                {o.text} : ${o.price}
              </span>
            ))}
          </div>

          <button
            disabled={loading || img === ""}
            className={styles.createBtn}
            onClick={handleSubmit}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
