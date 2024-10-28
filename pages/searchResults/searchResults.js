import { GraphQLClient, gql } from "graphql-request";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import useGetPaintingDetails from "../../utils/useGetPainitngsDetails";
import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import ProductCard from "../../components/product/productCard";
import Styles from "./searchResults.module.css";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function SearchResults({ allPaintings }) {
  const router = useRouter();
  const { query } = router.query;
  const [theBarTitle, setTheBarTitle] = useState("Search Results");

  useEffect(() => {
    if (query) {
      setTheBarTitle(`Results for "${capitalizeFirstLetter(query)}"`);
    }
  }, [query]);

  if (!query) return <p>Loading...</p>;

  const filteredPaintings = allPaintings.filter(
    (painting) =>
      painting.title.toLowerCase().includes(query?.toLowerCase()) ||
      painting.subtitle.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div className={Styles.body}>
      <div className={Styles.menuDiv}>
        <MenuList />
      </div>
      <div className={Styles.contentContainer}>
        <div className={Styles.theBarContainer}>
          <TheBar title={theBarTitle} className={Styles.theBar} />
        </div>
        <div className={Styles.searchResults}>
        {filteredPaintings.length > 0 ? (
          filteredPaintings.map((painting) => (
            <div className={Styles.mainSection} key={painting.id}>
              <div className={Styles.contentBox}>
                <ProductCard item={painting} />
              </div>
            </div>
            
          ))
        ) : (
          <p>No results found</p>
        )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const query = gql`
    query {
      paintings {
        id
        title
        subtitle
        slug
        price
        discountPercent
        promotion
        newProduct
        images {
          url
        }
        description {
          raw
        }
        stock
      }
    }
  `;

  const allPaintings = await hygraph.request(query);

  return {
    props: {
      allPaintings: allPaintings.paintings,
    },
  };
}

