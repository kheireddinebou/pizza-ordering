import React, { useContext, useState } from "react";
import styles from "../styles/Navbar.module.css";
import { BsTelephone } from "react-icons/bs";
import { GiFullPizza } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import Link from "next/link";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { quantity } = useContext(CartContext);

  return (
    <div className={styles.navbar}>
      <div className={styles.numberWrapper}>
        <div className={styles.telephone}>
          <BsTelephone />
        </div>

        <div className="d-flex flex-column">
          <span className="fw-semibold fs-5">ORDER NOW!</span>
          <span className="fw-bolder fs-3">012 345 678</span>
        </div>
      </div>

      <Link href="/">
        <GiFullPizza
          className="pointer"
          style={{
            color: "white",
            fontSize: "60px",
          }}
        />
      </Link>

      <div className="w-25 d-flex justify-content-center">
        <Link href="/cart">
          <button className={styles.badge}>
            <AiOutlineShoppingCart />
            <span>{quantity}</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
