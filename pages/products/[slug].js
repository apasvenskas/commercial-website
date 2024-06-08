import { GraphQLClient, gql } from "graphql-request";
import useGetPaintingDetails from "@/utils/useGetPainitngsDetails";
import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import styles from "./[slug].module.css";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";
import Image from "next/image";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function SlugPage({ product }) {
  const productArray = Object.values(product);
  let item = {};
  productArray.forEach((items) => {
    items.forEach((i) => {
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
    mainImagesSrc,
    id,
    stock,
    title,
    subtitle,
    mainContent,
  } = useGetPaintingDetails(item);

  console.log("slug mainImagesSrc", mainImagesSrc);

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
              <h3>{capitalizeFirstLetter(subtitle)}</h3>
              </div>
              <div className={styles.descriptionSection}>
                <div className={styles.descriptionTitle}>
                  <p>Product Description</p>
                </div>
                <div className={styles.description}>
                  <RichText content={mainContent} />
                  <div className={styles.link}>
                  <Link className={styles.artistLink} href="/products/artist">More from the same Artist</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.priceSection}>
              <div className={styles.prices}>
                {isPromoProd ? (
                  <div>
                    <p className="fadedPrice">
                      Price: ${price} <span className={styles.off}>- {discount} % OFF</span>
                    </p>
                    <p className="fadedPrice">
                      Promo Price: <span className={styles.discountPrice}> ${discountPrice}</span>
                    </p>
                  </div>
                ) : isNewProduct ? (
                  <div>
                    <p className="newPainting">
                      <span>NEW</span> Painting
                    </p>
                    <p className="price">Current Price = ${price}</p>
                  </div>
                ) : (
                  <div>
                    <p className="regularPainting">
                      Painting
                    </p>
                    <p className="price">Current Price ${price}</p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.buttonWrap}>
              <Link href="/">
                <button className={styles.button}>
                  {stock > 0 ? "Add To Cart" : "Out of Stock"}
                  <Image
                    src="/cart.png"
                    height={12}
                    width={13}
                    alt={`Painting`}
                    className={styles.cart}
                  />
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <div className={styles.images}>
              {mainImagesSrc.length > 0 ? (
                mainImagesSrc.map((image, index) => (
                  <Image
                    key={index}
                    src={image.url}
                    height={200}
                    width={200}
                    alt={`Painting`}
                    className={styles.img}
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
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
