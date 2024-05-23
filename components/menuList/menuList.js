import { GraphQLClient, gql } from "graphql-request";
import DumyList from "./dumyList";
import styles from "./menuList.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const graphcms = new GraphQLClient(process.env.
  GRAPHCMS_ENDPOINT, {
    headers: {
    Authorization: `Baerer ${process.env.GRAPHCMS_TOKEN}`,
    },
})

const query = gql `
query MyQuery {
  paintings {
    artist
    id
    title
    type
  }
}
`


export default function MenuList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(" menu data is", data);
    async function getMenuItems(){
      const data = await graphcms.request(query)
      setData(data)
    }
    getMenuItems()
  }, [])

  return (
    <div className={styles.leftMenu}>
        <div className={styles.menu}>
            <div className={styles.menuTitleSection}>
                <div className={styles.menuTitle}>
                </div>
            </div>
        </div>
      <div className={styles.menuHeader}>
        <h3>Categories</h3>
      </div>
      <DumyList />
    </div>
  );
}
