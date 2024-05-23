import { GraphQLClient, gql } from "graphql-request";
import DumyList from "./dumyList";
import styles from "./menuList.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const hygraph = new GraphQLClient(process.env.
  NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
    headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
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
   
    async function getMenuItems(){
      const data = await hygraph.request(query)
      setData(data)
    }
    getMenuItems()
  }, [])

  console.log(" menu data is", data);

  // data manipulation from the useEffect (converting it into array and more legitemate work format)
  const productsArr = Object.values(data);
  const productListArr = Object.keys(data);

  // productListArr.map((item, idx) => {
  //   const spaced = item.replace(/_/g, ' '); // Replace underscores with spaces
  //   const listItemTitle = spaced.charAt(0).toUpperCase() + spaced.slice(1); // upper case the first letter
  //   const productType = productsArr[idx].map((item, idx) => {
  //     return item.type; 
  //   })
  //   console.log('type', productType)
  // })
  
  // the end of data work

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
        {
          productListArr.map((item, idx) => {
            const spaced = item.replace(/_/g, ' '); // Replace underscores with spaces
            const listItemTitle = spaced.charAt(0).toUpperCase() + spaced.slice(1); // upper case the first letter
            const productType = productsArr[idx].map((item, idx) => {
              return item.type; 
            })
            return(<ListItem />)
          })
        }
      </div>
      <DumyList />
    </div>
  );
}
