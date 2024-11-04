import Link from "next/link";
import { GraphQLClient, gql } from "graphql-request";
import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import styles from "./index.module.css";
import Head from "next/head";

const hygraph = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT || process.env.HYGRAPH_ENDPOINT,
  {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN || process.env.HYGRAPH_TOKEN}`,
    },
  }
);

const ArtistsPage = ({ data }) => {
  // Get unique artists from the paintings data
  const uniqueArtists = [...new Set(data.paintings.map(painting => painting.artist))];
  
  // Create artist objects with slugs
  const artists = uniqueArtists.map(artistName => ({
    name: artistName,
    slug: artistName.toLowerCase().replace(/\s+/g, '-') // Create slug from artist name
  }));

  return (
    <>
      <Head>
        <title>Artists</title>
        <meta name="description" content="The artists associated with Laisvieji Menininkai" />
      </Head>
      <section className={styles.body}>
        <div className={styles.menu}>
          <MenuList />
        </div>
        <div className={styles.topbar}>
          <TheBar title="Artists" className={styles.theBar}/>
          <ul className={styles.artist}>
            {artists.map((artist) => (
              <li key={artist.slug}>
                <Link href={`/products/artist/${artist.slug}`} legacyBehavior>
                  <a>{artist.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

// Using the same query structure as your home page
const ArtistsQuery = gql`
  {
    paintings {
      artist
      id
    }
  }
`;

export async function getServerSideProps() {
  try {
    const data = await hygraph.request(ArtistsQuery);
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        data: { paintings: [] }, // Return empty array if there's an error
      },
    };
  }
}

export default ArtistsPage;