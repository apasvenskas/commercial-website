import { GraphQLClient, gql } from "graphql-request";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

const GetProductById = gql`
  query GetProductById($id: ID!) {
    painting(where: { id: $id }) {
      id
      stock
      stage
    }
  }
`;

const UpdateProductStock = gql`
  mutation UpdateProductStock($id: ID!, $stock: Int!) {
    updatePainting(where: { id: $id }, data: { stock: $stock }) {
      id
      stock
      stage
    }
    publishPainting(where: { id: $id }, to: PUBLISHED) {
      id
      stock
      stage
    }
  }
`;

export default async function stockManager(cart) {
  console.log("Starting stock manager function");

  if (!cart || cart.length === 0) {
    console.warn("Cart is empty or undefined.");
    return;
  }

  for (const item of cart) {
    const { id: theID } = item;
    const stockChange = 1; // Always reduce by 1

    console.log(`Processing item with ID: ${theID}`);

    try {
      // Fetch current stock
      const { painting } = await hygraph.request(GetProductById, { id: theID });
      console.log(`Received painting data:`, painting);

      if (!painting) {
        console.error(`Product with ID ${theID} not found`);
        continue;
      }

      const currentStock = painting.stock;
      console.log(`Current stock for ID ${theID}: ${currentStock}`);

      if (currentStock === 0) {
        console.warn(`Stock for product ID ${theID} is already 0. No change made.`);
        continue;
      }

      // Calculate new stock
      const newStock = Math.max(currentStock - stockChange, 0);
      console.log(`Stock change for ID ${theID}: -1`);
      console.log(`New calculated stock for ID ${theID}: ${newStock}`);

      // Update stock and publish
      console.log(`Sending update and publish request for ID ${theID} with new stock: ${newStock}`);
      const result = await hygraph.request(UpdateProductStock, {
        id: theID,
        stock: newStock,
      });
      console.log(`Update and publish result:`, result);

      if (result.updatePainting && result.publishPainting) {
        console.log(`Successfully updated and published stock for ID ${theID}:`, result.publishPainting);
      } else {
        console.error(`Failed to update or publish stock for ID ${theID}. Result:`, result);
      }

      // Verify the update
      console.log(`Verifying update for ID ${theID}`);
      const { painting: updatedPainting } = await hygraph.request(GetProductById, { id: theID });
      console.log(`Verification result:`, updatedPainting);

      if (updatedPainting.stock === newStock) {
        console.log(`Verified: Stock for ID ${theID} is now ${updatedPainting.stock}`);
      } else {
        console.error(`Stock update verification failed for ID ${theID}. Expected ${newStock}, got ${updatedPainting.stock}`);
      }

    } catch (error) {
      console.error(`Error processing product ID ${theID}:`, error);
      console.error(`Error details:`, JSON.stringify(error, null, 2));
    }
  }

  console.log("Stock manager function completed");
}






