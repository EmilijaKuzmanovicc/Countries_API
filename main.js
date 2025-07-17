import { Country } from "./country.js";

const countries=[];
const regions=new Set();
async function fetchData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    data.forEach(element => {

        const newCountry=new Country(element);
        countries.push(newCountry);
       // console.log(element.region);
        regions.add(element.region);
    });
    //console.log(countries);
   

  } catch (error) {
    console.error('There was an error:', error);
  }

}

//fetchData();
 //console.log(countries);
//console.log(regions);

//DrawBody(document.body);
function DrawBody(host){
    

    countries.forEach((e)=>{
        e.drawCountry(host);
    });
   

}

async function main() {
  await fetchData();             // sačekaj da se svi podaci učitaju
  console.log(countries);
  console.log(regions);

    const div=document.createElement("div");
    div.className="divBody";
    document.body.appendChild(div);
    DrawBody(div);

    
}

main();