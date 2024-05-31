import { GraphQLClient, gql } from "graphql-request";
import styles from "./menuList.module.css";
import { useEffect, useState } from "react";
import ListItem from "./ListItem";

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

  useEffect(() => {
    async function getMenuItems() {
      try {
        const response = await hygraph.request(query);
        const transformedData = response.paintings.map(item => ({
          ...item,
          title: capitalizeFirstLetter(item.title),
          type: capitalizeFirstLetter(item.type),
        }));
        setData(transformedData); // Ensure this matches the structure of the fetched data
      } catch (error) {
        console.error("Error fetching data: ", error);
        setData([]);
      }
    }
    getMenuItems();
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

  return (
    <div className={styles.leftMenu}>
      <div className={styles.menu}>
        <div className={styles.menuTitleSection}>
          <div className={styles.menuTitle}></div>
        </div>
      </div>
      <div className={styles.menuHeader}>
        <h3>Categories</h3>
        <div className={styles.types}>
        {data.map((item, idx) => (
          <ListItem
            key={idx}
            item={item}
            onMouseOver={() => handleMouseOver(item.type)}
            onMouseLeave={handleMouseLeave}
            titles={hoveredType === item.type ? titles : []}
          />
        ))}
        </div>
      </div>
    </div>
  );
}


