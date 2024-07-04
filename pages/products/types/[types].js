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

export default function TypesOfArt({ data, error, type, allTypes }) {
  console.log('Received data:', data);
  console.log('Received error:', error);
  console.log('Received type:', type);
  console.log('All available types:', allTypes);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!type) {
    return <div>Please specify a type of art in the URL.</div>;
  }

  if (!data || !data.paintings || data.paintings.length === 0) {
    return (
      <div>
        <p>No art pieces found for type: {type}</p>
        <p>Available types: {allTypes.join(', ')}</p>
      </div>
    );
  }

  const productsArray = data.paintings;
  const topBarType = type || "All Art";

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
            <Link href={`/products/${item.slug}`} key={item.id}>
              <ProductCard item={item} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  try {
    const { types } = context.params;
    console.log('Received types parameter:', types);

    // Query to get all paintings and their types
    const allPaintingsQuery = gql`
      query {
        paintings {
          id
          type
        }
      }
    `;

    const allPaintingsData = await hygraph.request(allPaintingsQuery);
    const allTypes = [...new Set(allPaintingsData.paintings.map(painting => painting.type))];
    console.log('All available types:', allTypes);

    if (!types) {
      return {
        props: {
          data: null,
          error: null,
          type: null,
          allTypes,
        },
      };
    }

    // Adjust the type to match the exact value (case-sensitive)
    const adjustedType = allTypes.find(t => t.toLowerCase() === types.toLowerCase());

    const query = gql`
      query GetProductsByType($type: String!) {
        paintings(where: { type: $type }) {
          id
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

    const variables = { type: adjustedType || types };
    console.log('GraphQL Query:', query);
    console.log('Variables:', variables);

    const data = await hygraph.request(query, variables);
    console.log('Received data from Hygraph:', JSON.stringify(data, null, 2));

    return {
      props: {
        data: data,
        error: null,
        type: types,
        allTypes,
      },
    };
  } catch (error) {
    console.error('Detailed error:', error);
    return {
      props: {
        data: null,
        error: `Error details: ${error.message}\nStack trace: ${error.stack}`,
        type: context.params.types || null,
        allTypes: [],
      },
    };
  }
}