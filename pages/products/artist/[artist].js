// pages/products/artist/[artist].js
import { useRouter } from 'next/router';

const ArtistPage = () => {
  const router = useRouter();
  const { artist } = router.query;

  return (
    <div>
      <h1>Artist: {artist}</h1>
      {/* Fetch and display artist-specific data here */}
    </div>
  );
};

export default ArtistPage;
