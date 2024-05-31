import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import { GraphQLClient, gql } from "graphql-request";
import styles from "./[types].module.css"
import ProductCard from "@/components/product/productCard";
import Link from "next/link";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
    },
  });

 

export default function TypesOfArt({data}){

    const typeKey = Object.keys(data).toString()
    console.log('typeKey', typeKey);
    const topBarType = typeKey.charAt(0).toUpperCase()
    console.log('topBarType', topBarType);

    if(data){
      const productsArray = Object.values(data)[0];
      console.log('productsArray', productsArray)
    return (
      <section className={styles.body}>
        <div className={styles.menu}>
            <MenuList />
        </div>
        <div className={styles.topbar}>
          <TheBar title={topBarType}/>
          <div className={styles.card}>
              {productsArray.map(item => (
                 (
                  <Link href={`/products/${item.slug}`} key={item.id} legacyBehavior>
                    <a>
                    <ProductCard />
                    </a>
                  </Link>
                )
              )
              )}
          </div>
        </div>
        </section>
    )
}
}


export async function getServerSideProps(context){
    console.log('params', context.params.title)
    const query = gql`
    {
        paintings {
          id
          images {
            url(transformation: {})
          }
          price
          promotion
          publishedAt
          title
          subtitle
          stock
          slug
          type
        }
      }
    `;
    const data = await hygraph.request(query)

    return{
        props: {
            data: data,
        }
    }
}