import { GraphQLClient, gql } from "graphql-request";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

const GetProductById = gql`
  query GetProductById($id: ID!) {
    paintings(where: { id: $id }) {
      id
      stock
    }
  }
`;

const UpdateProductStock = gql`
  mutation UpdateProductStock($id: ID!, $stock: Int!) {
    updatePaintings(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
    }
  }
`;

export default async function stockManager(cart) {
  if (!cart || cart.length === 0) return;

  for (const item of cart) {
    const { id: theID, numItems: stockChange } = item;

    try {
      // Fetch current stock
      const itemFromCart = await hygraph.request(GetProductById, { id: theID });
      const product = itemFromCart.paintings[0];

      if (!product) {
        console.error(`Product with ID ${theID} not found`);
        continue;
      }

      // Calculate new stock
      const newStock = product.stock - stockChange;
      if (newStock < 0) {
        console.warn(`Stock for product ID ${theID} would be negative. Setting to 0.`);
      }

      // Update stock
      const updateStock = await hygraph.request(UpdateProductStock, {
        id: theID,
        stock: Math.max(newStock, 0), // Ensure stock does not go negative
      });

      console.log(`Updated stock for ID ${theID}:`, updateStock);

    } catch (error) {
      console.error(`Error processing product ID ${theID}:`, error);
    }
  }
}





