// pages/products/artist/[artist].js
import { useRouter } from 'next/router';
import Head from 'next/head';

const ArtistPage = () => {
  const router = useRouter();
  const { artist } = router.query;

  return (
    <>
    <Head>
    <title>{artist}</title>
    <meta name="description" content={`${artist} details`} />
  </Head>
    <div>
      <h1>Artist: {artist}</h1>
      {/* Fetch and display artist-specific data here */}
    </div>
    </>
  );
};

export default ArtistPage;
