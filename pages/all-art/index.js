import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import { GraphQLClient, gql } from "graphql-request";
import styles from "./index.module.css";
import ProductCard from "../../state/context/productContext";
import Link from "next/link";
import Head from "next/head";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

export default function AllArt({ data, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.paintings || data.paintings.length === 0) {
    return <div>No art pieces found.</div>;
  }

  const productsArray = data.paintings;

  return (
    <>
      <Head>
        <title>All Art</title>
        <meta name="description" content="All the art pieces that Laisvieji Menininkai" />
      </Head>
      <section className={styles.body}>
        <div className={styles.menuDiv}>
          <MenuList />
        </div>
        <div className={styles.mainSection}>
          <div className={styles.theBarContainer}>
            <TheBar title="All Art" className={styles.theBar} />
          </div>
          <div className={styles.card}>
            {productsArray.map((item) => (
              <Link href={`/products/${item.slug}`} key={item.id}>
                <ProductCard item={item} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  try {
    // Query to get all paintings
    const allPaintingsQuery = gql`
      query {
        paintings {
          id
          discountPercent
          images {
            url
          }
          price
          promotion
          publishedAt
          title
          subtitle
          stock
          slug
          type
        }
      }
    `;

    const data = await hygraph.request(allPaintingsQuery);
    console.log("Received data from Hygraph:", JSON.stringify(data, null, 2));

    return {
      props: {
        data: data,
        error: null,
      },
    };
  } catch (error) {
    console.error("Detailed error:", error);
    return {
      props: {
        data: null,
        error: `Error details: ${error.message}\nStack trace: ${error.stack}`,
      },
    };
  }
}
