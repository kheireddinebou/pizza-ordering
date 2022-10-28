import Layout from "../components/Layout";
import { CartContextProvider } from "../context/CartContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  );
}

export default MyApp;
