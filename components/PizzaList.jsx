import React, { useState } from "react";
import PizzaCard from "./PizzaCard";
import styles from "../styles/AddProduct.module.css";
import AddProductForm from "./AddProductForm";

const PizzaList = ({ pizzaList, admin }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm && <AddProductForm setShowForm={setShowForm} />}

      <div className="d-flex flex-column align-items-center gap-3 container py-5 position-relative">
        <span className="display-3 fw-bolder  text-capitalize">
          the best pizza in town
        </span>

        <p className="h4 w-75 mt-3 text-center">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor omnis,
          minima molestiae temporibus exercitationem illum assumenda quo animi
          velit et eius ipsam a ducimus quisquam libero vitae id aperiam neque.
        </p>
        {admin && (
          <button onClick={() => setShowForm(true)} className={styles.addBtn}>
            Add new product
          </button>
        )}

        <div className="row text-center g-3 mt-3 px-5">
          {pizzaList?.map(pizza => (
            <div key={pizza._id} className=" col-md-6 col-lg-4 col-xl-3 ">
              <PizzaCard pizza={pizza} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PizzaList;
