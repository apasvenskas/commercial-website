import Layout from "@/components/layout/layout";
import { ProductProvider } from "@/src/state/context/productContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/styles/globals.css";
import { GraphQLClient, gql } from "graphql-request";

// Initialize the GraphQL client
const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

function MyApp({ Component, pageProps, allPaintings, error }) {
  if (error) {
    // Handle error globally in your app, for example with an error page or component
    console.error("Error in MyApp:", error);
  }

  return (
    <ProductProvider>
      <UserProvider>
        <Layout allPaintings={allPaintings}>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </ProductProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  try {
    // Fetch the paintings data using GraphQLClient
    const query = gql`
      query {
        paintings {
          artist
          discountPercent
          id
          price
          promotion
          paintingSurface
          newProduct
          slug
          stock
          title
          type
          subtitle
          images {
            url
          }
          description {
            raw
          }
        }
      }
    `;

    const data = await hygraph.request(query);
    console.log("Received data from Hygraph:", JSON.stringify(data, null, 2));

    // Call the page's `getInitialProps` and fill it with the paintings data
    const pageProps = await appContext.Component.getInitialProps?.(appContext) ?? {};

    return { pageProps, allPaintings: data.paintings, error: null };
  } catch (error) {
    console.error("Detailed error:", error);
    return {
      pageProps: {},
      allPaintings: null,
      error: `Error details: ${error.message}\nStack trace: ${error.stack}`,
    };
  }
};

export default MyApp;

