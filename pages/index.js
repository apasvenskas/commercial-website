import React from "react";
import { GraphQLClient, gql } from "graphql-request";
import TheBar from "@/components/product/theBar";
import MenuList from "@/components/menuList/menuList";
import styles from "./index.module.css";
import Link from "next/link";
import ProductCard from "@/components/product/productCard";

const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
  },
});

export default function Home({ data }) {
  console.log("data is", data);
  const theBarTitle = "New Paintings";
  const productsArray = Object.values(data);
  console.log("products array", productsArray);

  let myItems = [];

  productsArray.map((item) => {
    item.map((item) => {
      myItems.push(item);
      return;
    });
  });

  console.log("My items", myItems);

  return (
    <div className={styles.body}>
      <div className={styles.menuDiv}>
        <MenuList className="menu" />
      </div>
      <div className={styles.mainSection}>
        <div className={styles.theBarContainer}>
          <TheBar title={theBarTitle} className={styles.theBar} />
        </div>
        <div className={styles.card}>
          {myItems.map((item) => {
            return (
              <Link
                href={`/promotions/${item.slug}`}
                key={item.id}
                legacyBehavior
              >
                <a>
                  <ProductCard item={item}/>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const MyQuery = gql`
  {
    paintings(where: { OR: { newProduct: true } }) {
      artist
      id
      price
      promotion
      title
      type
      slug
      newProduct
      images {
        url
      }
    }
  }
`;

export async function getServerSideProps() {
  const data = await hygraph.request(MyQuery);
  return {
    props: {
      data: data,
    },
  };
}
