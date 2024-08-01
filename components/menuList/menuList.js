import { GraphQLClient, gql } from "graphql-request";
import styles from "./menuList.module.css";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";
import Image from "next/image";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

const query = gql`
  query MyQuery {
    paintings {
      title
      type
    }
  }
`;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function MenuList() {
  const [data, setData] = useState([]);
  const [hoveredType, setHoveredType] = useState(null);
  const [titles, setTitles] = useState([]);
  const [menuHidden, setMenuHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    async function getMenuItems() {
      try {
        const response = await hygraph.request(query);
        const transformedData = response.paintings.map(item => ({
          ...item,
          title: capitalizeFirstLetter(item.title),
          type: capitalizeFirstLetter(item.type),
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setData([]);
      }
    }
    getMenuItems();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 815);
      if (window.innerWidth >= 815) {
        setMenuHidden(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseOver = (type) => {
    setHoveredType(type);
    const filteredTitles = data.filter(item => item.type === type).map(item => item.title);
    setTitles(filteredTitles);
  };

  const handleMouseLeave = () => {
    setHoveredType(null);
    setTitles([]);
  };

  if (!Array.isArray(data)) {
    return <div>Loading...</div>;
  }

  const uniqueTypes = [...new Set(data.map(item => item.type))];

  function handleMenuOnClick() {
    setMenuHidden(!menuHidden);
  }

  const openMenuIcon = '/burger-bar.png';
  const closeMenuIcon = '/close-icon.png';

  return (
    <div className={styles.wraper}>
      <div className={styles.sidebar}>
        {isMobile && (
          <div onClick={handleMenuOnClick} className={styles.menuIcon}>
            <Image src={menuHidden ? openMenuIcon : closeMenuIcon} height={22} width={39} alt="menu" />
          </div>
        )}
      </div>
      <div className={`${styles.leftMenu} ${isMobile && menuHidden ? styles.hideMenu : styles.showMenu}`}>
        <div className={styles.menu}>
          <div className={styles.menuTitleSection}>
            <div className={styles.menuTitle}></div>
          </div>
        </div>
        <div className={styles.menuHeader}>
          <h3>Categories</h3>
          <div className={styles.types}>
            {uniqueTypes.map((type, idx) => (
              <ListItem
                key={idx}
                item={{ type }}
                onMouseOver={() => handleMouseOver(type)}
                onMouseLeave={handleMouseLeave}
                titles={hoveredType === type ? titles : []}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}







