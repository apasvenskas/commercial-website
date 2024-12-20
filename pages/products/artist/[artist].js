// pages/products/artist/[artist].js
import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import { GraphQLClient, gql } from "graphql-request";
import styles from "./[artist].module.css";
import ProductCard from "@/components/product/productCard";
import Link from "next/link";
import Head from "next/head";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

export default function ArtistsPage({ data, error, artist, allArtists }) {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!artist) {
    return <div>Please specify an artist in the URL.</div>;
  }

  if (!data || !data.paintings || data.paintings.length === 0) {
    return (
      <div>
        <p>No art pieces found for artist: {artist}</p>
        <p>Available artists: {allArtists.join(", ")}</p>
      </div>
    );
  }

  const productsArray = data.paintings;
  const topBarArtist = artist || "Featured Artist";

  return (
    <>
      <Head>
        <title>{topBarArtist}</title>
        <meta name="description" content={`${topBarArtist} details`} />
      </Head>
      <section className={styles.body}>
        <div className={styles.menuDiv}>
          <MenuList />
        </div>
        <div className={styles.mainSection}>
          <div className={styles.theBarContainer}>
            <TheBar title={topBarArtist} className={styles.theBar} />
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

export async function getServerSideProps(context) {
  try {
    const { artist } = context.params;

    // Query to get all paintings and their artists
    const allPaintingsQuery = gql`
      query {
        paintings {
          id
          artist
        }
      }
    `;

    const allPaintingsData = await hygraph.request(allPaintingsQuery);
    const allArtists = [...new Set(allPaintingsData.paintings.map((painting) => painting.artist))];

    if (!artist) {
      return {
        props: {
          data: null,
          error: null,
          artist: null,
          allArtists,
        },
      };
    }

    // Adjust the artist to match the exact value (case-insensitive search)
    const adjustedArtist = allArtists.find(
      (a) => a.toLowerCase().replace(/\s+/g, "-") === artist.toLowerCase()
    );

    if (!adjustedArtist) {
      return {
        props: {
          data: null,
          error: `No artist found for: ${artist}`,
          artist,
          allArtists,
        },
      };
    }

    const query = gql`
      query GetProductsByArtist($artist: String!) {
        paintings(where: { artist: $artist }) {
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
          artist
        }
      }
    `;

    const variables = { artist: adjustedArtist };

    const data = await hygraph.request(query, variables);

    return {
      props: {
        data: data,
        error: null,
        artist: adjustedArtist,
        allArtists,
      },
    };
  } catch (error) {
    console.error("Detailed error:", error);
    return {
      props: {
        data: null,
        error: `Error details: ${error.message}\nStack trace: ${error.stack}`,
        artist: context.params.artist || null,
        allArtists: [],
      },
    };
  }
}



// import { useRouter } from 'next/router';
// import Head from 'next/head';

// const ArtistPage = () => {
//   const router = useRouter();
//   const { artist } = router.query;

//   return (
//     <>
//     <Head>
//     <title>{artist}</title>
//     <meta name="description" content={`${artist} details`} />
//   </Head>
//     <div>
//       <h1>Artist: {artist}</h1>
//       {/* Fetch and display artist-specific data here */}
//     </div>
//     </>
//   );
// };

// export default ArtistPage;
