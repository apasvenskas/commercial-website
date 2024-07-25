import { GraphQLClient, gql } from "graphql-request";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
    },
  });

  const GetCustomerByEmail = gql`
  query GetUserByEmail($email: String!) {
    customers: customers(where: { email: $email }, stage: DRAFT) {
      id
      email
    }
  }
`;

const CreateCustomerByEmail = gql`
  mutation CreateCustomerByEmail($email: String!) {
    newUser: createCustomer(data: { email: $email }) {
      id
      email
    }
  }
`;

export default function FetchUsers() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const checkUsers = async () => {
        const existingUser = await hygraph.request(GetCustomerByEmail, {
          email: user.name,
        });
        const existingUserLength = existingUser.customers.length;

        if (existingUserLength === 0) {
          const newUser = await hygraph.request(CreateCustomerByEmail, {
            email: user.name,
          });
        }
      };
      checkUsers();
    }
  }, [user]);
}