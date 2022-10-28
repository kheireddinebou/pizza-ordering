import React, { useState } from "react";
import styles from "../styles/Featured.module.css";

const Featured = () => {
  const [index, setIndex] = useState(0);

  const images = ["featured.png", "featured2.png", "featured3.png"];

  const handleIndex = direction => {
    if (direction === "l") {
      setIndex(index === 0 ? 2 : index - 1);
    } else {
      setIndex(index === images.length - 1 ? 0 : index + 1);
    }
  };

  return (
    <div className={styles.featured}>
      <img
        src="/img/arrowl.png"
        alt=""
        className={styles.arrow}
        style={{
          left: 0,
        }}
        onClick={() => handleIndex("l")}
      />
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, index) => (
          <div className={styles.imgContainer} key={index}>
            <img src={`/img/${img}`} alt="" />
          </div>
        ))}
      </div>
      <img
        src="/img/arrowr.png"
        alt=""
        className={styles.arrow}
        style={{
          right: 0,
        }}
        onClick={() => handleIndex("r")}
      />
    </div>
  );
};

export default Featured;
