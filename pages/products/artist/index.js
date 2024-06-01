import Link from "next/link";
import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import styles from "./index.module.css";

const ArtistsPage = () => {
  // Replace this with your actual data fetching logic
  const artists = [
    { name: "Artist1", slug: "artist1" },
    { name: "Artist2", slug: "artist2" },
  ];

  return (
    <section className={styles.body}>
      <div className={styles.menu}>
        <MenuList />
      </div>
      <div className={styles.topbar}>
        <TheBar />
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
  );
};

export default ArtistsPage;
