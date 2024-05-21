import React from "react";
import { GraphQLClient, gql } from "graphql-request";
import TheBar from "@/components/product/theBar";
import MenuList from "@/components/menuList/menuList";
import styles from "./index.module.css";

const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
  },
});

export default function Home({ data }) {
  console.log("data is", data);
  return (
    <div className={styles.body}>
      <div className={styles.menuDiv}>
        <MenuList className="menu" />
      </div>
      <div className={styles.mainSection}>
        <TheBar />
        <div className="theCard">Home</div>
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
