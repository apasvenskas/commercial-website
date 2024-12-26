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
  // Get unique artists and their associated titles
  const artistData = data.paintings.reduce((acc, painting) => {
    if (!acc[painting.artist]) {
      acc[painting.artist] = {
        titles: [],
        slug: painting.artist.toLowerCase().replace(/\s+/g, '-'),
      };
    }
    acc[painting.artist].titles.push(painting.title);
    return acc;
  }, {});

  const artists = Object.keys(artistData).map((artistName) => ({
    name: artistName,
    slug: artistData[artistName].slug,
    titles: artistData[artistName].titles,
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
          <TheBar title="Artists" className={styles.theBar} />
          <div className={styles.artistsGrid}>
            {artists.map((artist) => (
              <div key={artist.slug} className={styles.artistCard}>
                <Link href={`/products/artist/${artist.slug}`} legacyBehavior>
                  <a className={styles.artistLink}>{artist.name}</a>
                </Link>
                <div className={styles.titles}>
                  {artist.titles.map((title, index) => (
                    <p key={index} className={styles.title}>
                      {title}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Updated GraphQL query to include titles
const ArtistsQuery = gql`
  {
    paintings {
      artist
      title
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