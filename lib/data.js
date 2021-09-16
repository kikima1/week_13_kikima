import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const dataDir1 = path.join(process.cwd(), 'data');

//Map for each JSON file?? Couldn't get both in one. Therefore paths for higher id numbers not recognized even though paths were constructed.
export function getAllIds() {
  const filepath = path.join(dataDir, "persons.json");
  //var filepath1 = path.join(dataDir, "people.json");
  //read file
  const jsonString = fs.readFileSync(filepath, "utf8");

  const jsonObj = JSON.parse(jsonString);
  return jsonObj.map(item => {
    return {
      params: {
        
        id: item.id.toString(),
      
        
      }
    }//extracted id
  });

   filepath1 = path.join(dataDir1, "people.json");
  //read file
  const jsonString1 = fs.readFileSync(filepath1, "utf8");

  const jsonObj1 = JSON.parse(jsonString);
  jsonObj1.map(item1 => {
    return {
     params: {
        id: item1.id.toString(),
        
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
 

 
//now find any entry from people list
const filepath1 = path.join(dataDir1, "people.json");
  //read file
const jsonString1 = fs.readFileSync(filepath1, "utf8");

const jsonObj1 = JSON.parse(jsonString1);

//
const objMatch1 = jsonObj1.filter(obj => {
     
     return obj.id.toString() === "5";
}  
    );

  



let objReturned1;
 if (objMatch1.length > 0) {
   objReturned1 = objMatch1[0];
   
  }
  else {
    objReturned1 = {};
 }
 console.log(objReturned1.name)
 
 

objReturned.name2 = objReturned1.name2;
objReturned.email2 =  objReturned1.id;


return objReturned;
return objReturned1;


 }










