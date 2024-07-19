import { graphql } from "graphql";
import { GraphQLClient, gql } from "graphql-request";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
    },
  });

  const GetProductById = gql`
    query  GetProductById($id: ID!){
        paintings(where: {id: $id}){
            id
            stock
        }
    }
  }
`;

const UpdateProductStock = gql`
  mutation UpdateProductStock($id: Id!, $stock, Int){
    updatePaintings(where: {id: $id}, data: {stock: $stock}){
        id
        stock
    }
  }
`

export default function stockManager(){
    const checkProducts = async (theID, stockChange) => {
        const itemFromCart = await graphql.request(GetProductById, {
            id: theID,
        });
        const ProductsArray = await Object.values(itemFromCart); 

        ProductsArray.map(item => {
            if(item && item.id == theID){
                const stock = item.stock - stockChange;
                const updateStock = graphql.request(UpdateProductStock, {
                    id: theID,
                    stock: stock,
                })
            }
        })
    }

    cart &&
        cart.map((item, idx) => {
            const theID = item.ed;
            const stockChange = item.numItems;
            checkProducts(theID, stockChange);
        })

}