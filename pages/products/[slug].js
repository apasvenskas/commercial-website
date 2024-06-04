import { GraphQLClient, gql } from "graphql-request";
import useGetPaintingDetails from "@/utils/useGetPainitngsDetails";
import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import styles from "./[slug].module.css";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

export default function SlugPage({ product }) {
  const productArray = Object.values(product);
  let item = {};
  productArray.map((items) => {
    items.map((i) => {
      item = i;
    });
  });

  const {
    isNewProduct,
    isPromoProd,
    price,
    tempPrice,
    discount,
    discountPrice,
    imgSrc,
    mainImgSrc,
    id,
    title,
    subtitle,
    mainContent,
  } = useGetPaintingDetails(item);

  console.log("slug item is", item);

  return (
    <section className={styles.body}>
      <div className={styles.menuSection}>
        <MenuList />
      </div>
      <div className={styles.mainSection}>
        <div className={styles.theBarContainer}>
          <TheBar className={styles.theBar} title={title} />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productDetails}>
            <div className={styles.product}>
              <div className={styles.subtitle}>
                <h3>{subtitle}</h3>
              </div>
              <div className={styles.descriptionSection}>
                <div className={styles.descriptionTitle}>
                  <p>Product Description</p>
                </div>
                <div className={styles.description}>
                  <RichText
                    content={mainContent}
                    // renderers={{
                    //   h1: ({ children }) => (
                    //     <h1 className="text-normal">{children}</h1>
                    //   ),
                    //   h2: ({ children }) => (
                    //     <h1 className="text-normal">{children}</h1>
                    //   ),
                    //   h3: ({ children }) => (
                    //     <h1 className="text-normal">{children}</h1>
                    //   ),
                    //   p: ({ children }) => (
                    //     <h1 className="text-normal">{children}</h1>
                    //   ),
                    //   italic: ({ children }) => (
                    //     <h1 className="text-italic">{children}</h1>
                    //   ),
                    //   bold: ({ children }) => <strong>{children}</strong>,
                    // }}
                  />
                  <Link href="/products/artist">More from the same Artist</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const currentSlug = context.params.slug;

  const query = gql`
    query ($currentSlug: String!) {
      paintings(where: { slug: $currentSlug }) {
        artist
        id
        price
        promotion
        paintingSurface
        newProduct
        slug
        stock
        title
        type
        subtitle
        images {
          url
        }
        description {
          raw
        }
      }
    }
  `;

  const variables = { currentSlug };
  const product = await hygraph.request(query, variables);

  return {
    props: {
      product: product,
    },
  };
}
