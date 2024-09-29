import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SearchResults({ allPaintings }) {
  const router = useRouter();
  const { query } = router.query;

  const filteredPaintings = allPaintings.filter(painting =>
    painting.title.toLowerCase().includes(query?.toLowerCase()) ||
    painting.subtitle.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {filteredPaintings.length > 0 ? (
        filteredPaintings.map(painting => (
          <Link key={painting.id} href={`/products/${painting.slug}`}>
            <div>
              <h2>{painting.title}</h2>
              <p>{painting.subtitle}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

// Add getStaticProps or getServerSideProps to pass `allPaintings` data
export async function getStaticProps() {
  // Fetch the paintings data here
  const allPaintings = await fetchYourPaintingsData();
  return { props: { allPaintings } };
}






