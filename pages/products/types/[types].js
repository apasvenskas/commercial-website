import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import { GraphQLClient, gql } from "graphql-request";
import styles from "./[types].module.css";
import ProductCard from "@/components/product/productCard";
import Link from "next/link";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

export default function TypesOfArt({ data }) {
  const typeKey = Object.keys(data).toString();
  const topBarType = data.paintings[0]?.type || "Default Type"; // Adjust this based on your data structure

  if (data) {
    const productsArray = data.paintings;
    return (
      <section className={styles.body}>
        <div className={styles.menuDiv}>
          <MenuList />
        </div>
        <div className={styles.mainSection}>
          <div className={styles.theBarContainer}>
            <TheBar title={topBarType} className={styles.theBar} />
          </div>
          <div className={styles.card}>
            {productsArray.map((item) => (
              <Link href={`/products/${item.slug}`} key={item.id} legacyBehavior>
                <a>
                  <ProductCard item={item} />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return null;
}

export async function getServerSideProps(context) {
  const query = gql`
    {
      paintings {
        id
        images {
          url(transformation: {})
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
  const data = await hygraph.request(query);

  return {
    props: {
      data: data,
    },
  };
}
