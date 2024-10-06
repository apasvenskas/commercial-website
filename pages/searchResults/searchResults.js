import { GraphQLClient, gql } from "graphql-request";
import { useRouter } from "next/router";
import Link from "next/link";
import useGetPaintingDetails from "../../utils/useGetPainitngsDetails";
import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import ProductCard from "../../components/product/productCard";
import Styles from "./searchResults.module.css";
// import { useState } from "react/cjs/react.development";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

export default function SearchResults({ allPaintings }) {
  const router = useRouter();
  const { query } = router.query;
  // const [theBarTitle, setTheBarTitle] = useState("New Paintings");

  // useEffect(() => {
  //   if (type) {
  //     setTheBarTitle(capitalizeFirstLetter(type));
  //   }
  // }, [type]);

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
      {filteredPaintings.length > 0 ? (
        filteredPaintings.map((painting) => (
          <div className={Styles.mainSection} key={painting.id}>
            <div className={Styles.contentBox}>
              <div className={Styles.theBarContainer}>
                <TheBar 
                // title={theBarTitle} 
                className={Styles.theBar}
                />
              </div>
              {/* Using ProductCard to display painting */}
              <ProductCard item={painting} />
            </div>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
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
