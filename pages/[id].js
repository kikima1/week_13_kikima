import Head from 'next/head';
import Layout from '../components/layout';
import { getAllIds, getData } from '../lib/data';


export async function getStaticProps({ params }) {
  const itemData = await getData(params.id);
  //const itemData1 = await getData(params.name);
  // console.log(itemData);
  return {
    props: {
      itemData,
     
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
export default function Entry({ itemData}) {
  
  return (
    
    <Layout>
    
      <article className="card col-6">
        <div className="card-body">
          <h5 className="card-title">{itemData.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{itemData.phone}</h6>
          <p className="card-text">{itemData.birthdate}</p>
           <p> <a href={itemData.email2} className="card-text">{itemData.name2}</a> from List 2.</p> 
          <a href={'mailto:' + itemData.email} className="card-link">{itemData.email}</a>
        </div>
      </article>
      </Layout>
  )}
  //Tried to make a URL with name appended work by having a get static paths directory in next indexed to names and ids but didn't work.
   // <p> <a href={itemData.name2} className="card-text">{itemData.name2}//</a> from List 2.</p> 
