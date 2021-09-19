import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import { getAllIds, getData } from '../lib/data';

export async function getStaticProps({ params }) {
  const itemData = await getData(params.id);
  // console.log(itemData);
  return {
    props: {
      itemData
    }
  };
}

export async function getStaticPaths() {
  const paths = getAllIds();
  return {
    paths,
    fallback: false
  };
}

//added extra item data from list one which had changed data from second JSON object 
export default function Entry({ itemData }) {
  return (
    <Layout>
      <article className="card col-6">
      <h2>Person Details</h2>
        <div className="card-body">
          <h5 className="card-title">{itemData.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{itemData.phone}</h6>
          <p className="card-text">{itemData.birthdate}</p>
          <a href={'mailto:' + itemData.email} className="card-link">{itemData.email}</a>
        </div>
      </article>
      <h2> Best Friend</h2>
      <div className="list-group col-6">
      {itemData.best ?
      itemData.best.map(
        ({id, name})=>(
          <Link key={id} href={`/${id}`}>
          <a className= "list-group-item list-group-item-action">{name}</a>
          </Link>
        )
      )
      :null
      }
      </div>
      <h2> Related Persons</h2>
      <div className="list-group col-6">
      {itemData.related ?
      itemData.related.map(
        ({id, name})=>(
          <Link key={id} href={`/${id}`}>
          <a className= "list-group-item list-group-item-action">{name}</a>
          </Link>
        )
      )
      :null
      }
      </div>
       <h2> More Related Persons from Second JSON object</h2>
      <div className="list-group col-6">
      {itemData.more_related ?
      itemData.more_related.map(
        ({id, name})=>(
          <Link key={id} href={`/${id}`}>
          <a className= "list-group-item list-group-item-action">{name}</a>
          </Link>
        )
      )
      :null
      }
      </div>
    </Layout>
  );
}