import { GraphQLClient, gql } from "graphql-request";
import DumyList from "./dumyList";
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

export default function MenuList() {
  const [data, setData] = useState([]);
  const [hoveredType, setHoveredType] = useState(null);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    async function getMenuItems() {
      try {
        const response = await hygraph.request(query);
        setData(response.paintings); // Ensure this matches the structure of the fetched data
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
      <DumyList />
    </div>
  );
}


