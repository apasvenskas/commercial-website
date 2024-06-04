import { GraphQLClient, gql } from "graphql-request";
import useGetPaintingDetails from "@/utils/useGetPainitngsDetails";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
    },
  });

export default function SlugPage({product}){

    const productArray = Object.values(product);
    let item = {};
    productArray.map(items => {
        items.map(i => {
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
      } = useGetPaintingDetails(item);

    console.log('slug item is', item)

    return(
        <div>
            Slug
        </div>
    )
}

export async function getServerSideProps(context){

    const currentSlug = context.params.slug

    const query = gql`
    query ($currentSlug: String!){
        paintings(where: {slug: $currentSlug}) {
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

    const variables = {currentSlug}
    const product = await hygraph.request(query, variables)

    return{
        props: {
            product: product,
        }
    }
}