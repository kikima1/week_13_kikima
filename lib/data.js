import fs from 'fs'; 
import path from 'path';

const dataDir = path.join(process.cwd(), 'data' );

export function getAllIds(){
const filepath = path.join( dataDir, "people.json" );
//read file
const jsonString = fs.readFileSync( filepath, "utf8" );

const jsonObj = JSON.parse( jsonString );
return jsonObj.map(item=>{
  return{
    params:{
      id: item.id.toString()
    }
  }//extracted id
});//feeds into getStaticPaths
}
//separate page for each person's data set
export function getSortedList(){
const filePath= path.join(dataDir,'people.json')
const jsonString = fs.readFileSync(filePath, 'utf8');


  const jsonObj = JSON.parse( jsonString );
  jsonObj.sort(function (a,b){
    return a.name.localeCompare(b.name);

  });
return jsonObj.map(item=>{
  return{
    id: item.id.toString(),
    name: item.name
  }
});

}
//used on home page with getStaticProps


export async function getData(idRequested){
const filepath = path.join( dataDir, "people.json" );
//read file
const jsonString = fs.readFileSync( filepath, "utf8" );

  const jsonObj = JSON.parse( jsonString );
//find object value with the matching id
const objMatch = jsonObj.filter( obj =>{
 return obj.id.toString()===idRequested;
}
);   
let objReturned;
if (objMatch.length>0){
objReturned = objMatch[0];
}
else{
  objReturned ={};
  }
return objReturned;
//will be sent back to [id] page - used by getStaticProps
}//gets complete data for one person