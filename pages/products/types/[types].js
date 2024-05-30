import { GraphQLClient, gql } from "graphql-request";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
    },
  });

export default function TypesOfArt({data}){
    console.log('type data is', data)
    return (
        <div>
            Type
        </div>
    )
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