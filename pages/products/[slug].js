import { GraphQLClient, gql } from "graphql-request";
import useGetPaintingDetails from "@/utils/useGetPainitngsDetails";
import MenuList from "@/components/menuList/menuList";
import TheBar from "@/components/product/theBar";
import styles from "./[slug].module.css";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Link from "next/link";
import Image from "next/image";
import { useProductContext } from "@/src/state/context/productContext";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function SlugPage({ product }) {
  const { addToCart } = useProductContext();

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
    discountPercent,
    discountPrice,
    imgSrc,
    mainImgSrc,
    mainImagesSrc,
    id,
    stock,
    title,
    subtitle,
    mainContent,
    numItems,
  } = useGetPaintingDetails(item);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <div className="custom-prev-arrow">{"<"}</div>,
    nextArrow: <div className="custom-next-arrow">{">"}</div>,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`${title} details`} />
      </Head>
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
                      <Link
                        className={styles.artistLink}
                        href="/products/artist"
                      >
                        More from the same Artist
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.priceSection}>
                <div className={styles.prices}>
                  {isPromoProd ? (
                    <div>
                      <p className="fadedPrice">
                        Price: ${price}{" "}
                        <span className={styles.off}>
                          - {discountPercent} % OFF
                        </span>
                      </p>
                      <p className="fadedPrice">
                        Promo Price:{" "}
                        <span className={styles.discountPrice}>
                          {" "}
                          ${discountPrice}
                        </span>
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
                      <p className="regularPainting">Painting</p>
                      <p className="price">Current Price ${price}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.buttonWrap}>
                {stock > 0 ? (
                  <Link href="/cart">
                    <button
                      className={styles.button}
                      onClick={() =>
                        addToCart(
                          id,
                          title,
                          stock,
                          price,
                          discountPercent,
                          mainImgSrc,
                          numItems
                        )
                      }
                    >
                      Add To Cart
                      <Image
                        src="/cart.png"
                        height={12}
                        width={13}
                        alt={`Painting`}
                        className={styles.cart}
                      />
                    </button>
                  </Link>
                ) : (
                  <h2 className={styles.OutOfStock}>Out of Stock</h2>
                )}
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <Slider {...settings}>
                {mainImagesSrc.length > 0 ? (
                  mainImagesSrc.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                      <div className={styles.zoomContainer}>
                        <a
                          href={image.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: "Painting",
                                isFluidWidth: true,
                                src: image.url,
                              },
                              largeImage: {
                                src: image.url,
                                width: 1200,
                                height: 1800,
                              },
                              enlargedImagePosition: "over",
                              isHintEnabled: true,
                              shouldUsePositiveSpaceLens: true,
                              className: styles.img,
                            }}
                          />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export async function getServerSideProps(context) {
  const currentSlug = context.params.slug;

  const query = gql`
    query ($currentSlug: String!) {
      paintings(where: { slug: $currentSlug }) {
        artist
        discountPercent
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
