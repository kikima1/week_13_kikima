import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const dataDir1 = path.join(process.cwd(), 'data');

export function getAllIds() {
  const filepath = path.join(dataDir, "persons.json");
  //read file
  const jsonString = fs.readFileSync(filepath, "utf8");

  const jsonObj = JSON.parse(jsonString);
  return jsonObj.map(item => {
    return {
      params: {
        id: item.id.toString()
      }
    }//extracted id
  });
  const filepath1 = path.join(dataDir1, "people.json");
  //read file
  const jsonString1 = fs.readFileSync(filepath1, "utf8");

  const jsonObj1 = JSON.parse(jsonString);
  jsonObj1.map(item => {
    return {
     params: {
        id: item.id.toString()
      }
   }//extracted id
  });
}

//separate page for each person's data set
export function getSortedList() {
  const filePath = path.join(dataDir, 'persons.json')
  const jsonString = fs.readFileSync(filePath, 'utf8');


  const jsonObj = JSON.parse(jsonString);
  jsonObj.sort(function(a, b) {
    return a.name.localeCompare(b.name);

  });
  return jsonObj.map(item => {
    return {
      id: item.id.toString(),
      name: item.name
    }
   // console.log(item.name);
  });

}

export async function getData(idRequested) {
const filepath = path.join(dataDir, "persons.json");
  //read file
  const jsonString = fs.readFileSync(filepath, "utf8");

  const jsonObj = JSON.parse(jsonString);
  //find object value with the matching id
  const objMatch = jsonObj.filter(obj => {
    return obj.id.toString() === idRequested;  
  }
  );
console.log(idRequested);
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
 

  
//console.log(objReturned.name2)
//console.log(objReturned.name);

 
//now find any entry from people list
const filepath1 = path.join(dataDir1, "people.json");
  //read file
const jsonString1 = fs.readFileSync(filepath1, "utf8");

const jsonObj1 = JSON.parse(jsonString1);

//
const objMatch1 = jsonObj1.filter(obj => {
     
     return obj.id.toString() === idRequested;
}  
    );
//console.log(objReturned.state);





let objReturned1;
 if (objMatch1.length > 0) {
   objReturned1 = objMatch1[0];
   
  }
  else {
    objReturned1 = {};
 }
 console.log(objReturned.name)
 
 
 //HERE IS THE MAGIC ASSIGNMENT

objReturned.name2 = objReturned1.name2;//objReturned1.name;

console.log(objReturned.name2)

return objReturned;
//return objReturned1;


 }










/*const objStateMatch = jsonObj.filter(obj => {
    return 
   objState.state() === object.state();
    
    
     
    }
}
  
  let objStateReturned;
  if (objStateMatch.state === objMatch.state) {
   // objReturned = objMatch[0];
  objMatch.state2 = objStateMatch.name;
  }
  //}
 // else {
 //   objReturned = {};
 // }
  return objReturned;

   //objStateReturned = objStateMatch[0];
  //objReturned.state2 = objStateReturn.name;*/
  
  //returnobjStateReturned;
 
 
  //);
  //will be sent back to [id] page - used by getStaticProps
  //gets complete data for one person