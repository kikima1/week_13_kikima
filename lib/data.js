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
}
  // filepath1 = path.join(dataDir1, "people.json");
  //read file
  //const jsonString1 = fs.readFileSync(filepath1, "utf8");

 // const jsonObj1 = JSON.parse(jsonString);
 // jsonObj1.map(item1 => {
  //  return {
  //   params: {
  //      id: item1.id.toString(),
        
   //   }
  // }//extracted id
 // });
//}



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
const filePath = path.join(dataDir, 'persons.json');
const filePath1 = path.join(dataDir, 'friends.json');
const filePath2 = path.join(dataDir, 'relations.json');
const jsonString = fs.readFileSync(filePath, 'utf8');
const jsonString1 = fs.readFileSync(filePath1, 'utf8');
const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  //read file
const jsonObj = JSON.parse(jsonString);
const jsonObj1 = JSON.parse(jsonString1);
const jsonObj2 = JSON.parse(jsonString2);

  //find object value with the matching id
  const objMatch = jsonObj.filter(obj => {
    return obj.id.toString() === idRequested;  
  }
  );
  
//console.log(idRequested);
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
    //find match
     
    
  const objMatch1 = jsonObj1.filter(obj=> {
    return obj.self_id.toString() === idRequested;
  }
  );

  //const objMatch2 = jsonObj2.filter(obj => {
     //console.log(obj.self_id)
  //  return obj.owner_id.toString() === idRequested;

 // }
  //);
    if(objMatch1.length>0){
      const objMatch3=jsonObj.filter(obj=>{
        return objMatch1[0].friends_id.includes(obj.id);
//this return above includes the item in the JSON object that matches to id requested
      }
      );
      if (objMatch3.length > 0) {
   objReturned.related = objMatch3;
   //this return above creates another item(?) which will hold the objMatch3 array
    }
   }
    if(objMatch1.length>0){
      const objMatch3=jsonObj.filter(obj=>{
        return objMatch1[0].besty_id.includes(obj.id);

      }
      );
      if (objMatch3.length > 0) {
   objReturned.best = objMatch3;
   
    }
    else {
    objReturned = {};
 }
    }
    }
    const objMatch2 = jsonObj2.filter(obj => {
     //console.log(obj.self_id)
    return obj.owner_id.toString() === idRequested;

  }
  );
   if (objMatch2.length > 0) {
   //objReturned1 = objMatch1[0];
   const objMatch3=jsonObj.filter(obj=>{
     
     return objMatch2[0].related_id.includes(obj.id);
    }
   );
   if (objMatch3.length > 0) {
  objReturned.more_related = objMatch3;
   
    }
  }

  else {
    objReturned = {};
 }

 
 console.log(objReturned)
return objReturned;
  }


  //}

  /*******************
   * objMatch3 is a constant array created by filtering the original JSON object and using its requested id to match whichever JSON object and item is indicated in the filter function.
   * If the filtering includes an entry in the array i.e., length >0 then return (to [id.js](through static props?) a map of the items to be displayed as requested in the React component.
   * 
   * What if I wanted to use another unrelated JSON Object for display?
   */