import React, { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";
import { useRouter } from "next/router";
import TheBar from "@/components/product/theBar";
import MenuList from "@/components/menuList/menuList";
import styles from "./index.module.css";
import Link from "next/link";
import ProductCard from "@/components/product/productCard";
import FetchUsers from "@/utils/fetchUsers";
import Head from "next/head";

const hygraph = new GraphQLClient(process.env.HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
  },
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function Home({ data }) {
  FetchUsers();
  const router = useRouter();
  const { type } = router.query;
  // console.log('index type', type)
  const [theBarTitle, setTheBarTitle] = useState("New Paintings");

  useEffect(() => {
    if (type) {
      setTheBarTitle(capitalizeFirstLetter(type));
    }
  }, [type]);

  const productsArray = Object.values(data);

  let myItems = [];

  productsArray.forEach((item) => {
    item.forEach((item) => {
      myItems.push(item);
    });
  });

  return (
    <>
      <Head>
        <title>{theBarTitle}</title>
        <meta name="description" content="New art from Laisvieji Menininkai" />
      </Head>
      <div className={styles.body}>
        <div className={styles.menuDiv}>
          <MenuList className="menu" />
        </div>
        <div className={styles.mainSection}>
          <div className={styles.theBarContainer}>
            <TheBar title={theBarTitle} className={styles.theBar} />
          </div>
          <div className={styles.card}>
            {myItems.map((item) => (
              <Link
                href={`/products/${item.slug}`}
                key={item.id}
                legacyBehavior
              >
                <a>
                  <ProductCard item={item} />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const MyQuery = gql`
  {
    paintings(where: { OR: { newProduct: true } }) {
      artist
      discountPercent
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
      description {
        raw
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
