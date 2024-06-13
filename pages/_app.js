import Layout from "@/components/layout/layout";
import { ProductProvider } from "@/state/context/productcontext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ProductProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProductProvider>
  );
}
