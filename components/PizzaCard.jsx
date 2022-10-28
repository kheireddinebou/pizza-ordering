import Link from "next/link";
import React from "react";
import styles from "../styles/PizzaCard.module.css";

const PizzaCard = ({ pizza }) => {
  return (
    <Link href={`/product/${pizza._id}`} className={styles.pizzaCard}>
      <div className={styles.pizzaCard}>
        <img src={pizza.img} alt={pizza.name} />
        <span className={styles.pizzaName}>{pizza.name}</span>

        <span className="fw-bolder fs-4">${pizza.prices[0]}</span>
      </div>
    </Link>
  );
};

export default PizzaCard;
