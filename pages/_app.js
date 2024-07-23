import Layout from "@/components/layout/layout";
import { ProductProvider } from '@/state/context/productContext';
import { UserProvider } from '@auth0/nextjs-auth0/client'
import "@/styles/globals.css";


export default function App({ Component, pageProps }) {
  // console.log('UserProvider:', UserProvider);
  return (
    <ProductProvider>
      <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </UserProvider>
    </ProductProvider>
  );
}
