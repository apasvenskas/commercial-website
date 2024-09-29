import { GraphQLClient, gql } from 'graphql-request';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useGetPaintingDetails from '../../utils/useGetPainitngsDetails'; // Adjust the path if needed

// Set up the GraphQL client with Hygraph endpoint and token
const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

export default function SearchResults({ allPaintings }) {
  const router = useRouter();
  const { query } = router.query;

  if (!query) return <p>Loading...</p>;

  const filteredPaintings = allPaintings.filter((painting) =>
    painting.title.toLowerCase().includes(query?.toLowerCase()) ||
    painting.subtitle.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {filteredPaintings.length > 0 ? (
        filteredPaintings.map((painting) => {
          // Use the custom hook to get painting details
          const paintingDetails = useGetPaintingDetails(painting);

          return (
            <Link key={paintingDetails.id} href={`/products/${paintingDetails.id}`}>
              <div>
                <h2>{paintingDetails.title}</h2>
                <p>{paintingDetails.subtitle}</p>
                {paintingDetails.mainImgSrc && (
                  <img src={paintingDetails.mainImgSrc} alt={paintingDetails.title} />
                )}
                <p>Price: ${paintingDetails.price}</p>
                {paintingDetails.discountPercent > 0 && (
                  <p>Discounted Price: ${paintingDetails.discountPrice}</p>
                )}
              </div>
            </Link>
          );
        })
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

  // Fetch data from Hygraph using the GraphQL client
  const allPaintings = await hygraph.request(query);

  return {
    props: {
      allPaintings: allPaintings.paintings,
    },
  };
}
