import React from 'react';
import { GraphQLClient, gql } from 'graphql-request';

const hygraph = new GraphQLClient(
  process.env.HYGRAPH_ENDPOINT,
  {
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    }
  });

export default function Home({data}){
    console.log('data is', data)
  return <div>Home</div>
}

const MyQuery = gql`
{
    paintings(where: {OR: {newProduct: true}}) {
      artist
      id
      price
      promotion
      title
      type
      slug
      newProduct
      images {
        url
      }
    }
  }
`

export async function getServerSideProps(){
  const data = await hygraph.request(MyQuery)
  return{
    props: {
      data: data,
    }
  }
}