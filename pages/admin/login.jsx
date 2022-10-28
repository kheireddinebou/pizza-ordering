import React, { useRef, useState } from "react";
import axios from "axios";
import styles from "../../styles/LoginPage.module.css";
import { useRouter } from "next/router";

const Login = () => {
  const [error, setError] = useState(false);
  const username = useRef();
  const password = useRef();
  const router = useRouter();

  const handleLogin = async e => {
    e.preventDefault();
   
    setError(false);
    try {
      await axios.post("http://localhost:3000/api/login", {
        username: username.current.value,
        password: password.current.value,
      });
      router.push("/admin");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className={styles.loginPage}>
      <span className="h1">Admin Dashboard</span>

      <form onSubmit={handleLogin}>
        <input type="text" placeholder="username" ref={username} required />
        <input type="password" placeholder="password" ref={password} required />
        <button type="submit">Sign In</button>

        {error && (
          <span className="text-danger h5 text-center">
            Wrong Credantials !
          </span>
        )}
      </form>
    </div>
  );
};

export default Login;
