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

function DrawBody(host){
    

    const findDiv=document.createElement("div");
    findDiv.className="findDiv";
    host.appendChild(findDiv);

    



    countries.forEach((e)=>{
        e.drawCountry(host);
    });
   

}

async function main() {
  await fetchData();            
  //console.log(countries);
  //console.log(regions);



    const navbar=document.createElement("nav");
    navbar.className="navbar";
    document.body.appendChild(navbar);
    DrawNavbar(navbar);


    const div=document.createElement("div");
    div.className="divBody";
    document.body.appendChild(div);
    DrawBody(div);


}

main();






function DrawNavbar(host){
    const proba=document.createElement("div");
    proba.innerHTML="Where in the world?";
    host.appendChild(proba);


    const divM=document.createElement("div");
    divM.className="divTextDesc";
    host.appendChild(divM);



   const imgM=document.createElement("img");
    imgM.className="img";
    imgM.src="moon.png";
    divM.appendChild(imgM);


    const descC=document.createElement("div");
    descC.className="name";
    descC.innerHTML="Dark Mode";
    divM.appendChild(descC);

}