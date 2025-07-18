import { Country } from "./country.js";

const countries=[];
const regions=new Set();
let currentSelected="";
let currentSearch="";
let debounceTimer;

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
    
        regions.add(element.region);
    });
   

  } catch (error) {
    console.error('There was an error:', error);
  }

}

function DrawBody(host){
    const divList=document.createElement("div");
    divList.className="divList";
    host.appendChild(divList);



    const findDiv=document.createElement("div");
    findDiv.className="findDiv";
    divList.appendChild(findDiv);
    const countyDiv=document.createElement("div");
    countyDiv.className="countryDiv";
    drawFilter(findDiv,countyDiv);

    
    divList.appendChild(countyDiv);

    drawCountyFunc(countyDiv,currentSelected,currentSearch);
}


function drawCountyFunc(host,region,searchText){
  

    
  let loadedCounties=[];

  if(region!=="" || searchText!=="")
  {


    countries.forEach(e=>{
       
        if(region===e.region )
        loadedCounties.push(e);
     
      });
  }
  else{
    countries.forEach(e=>{
       
        
          loadedCounties.push(e);
        
      });
  }



console.log(loadedCounties.length);
  loadedCounties.forEach((e)=>{
  
        e.drawCountry(host);
    });
}

function drawFilter(host,countyC){


  
  // const searchCont=document.createElement("div");
  // searchCont.className="searchCont";
  // host.appendChild(searchCont);



  const searchInput=document.createElement("input");
  searchInput.type="text";
  searchInput.placeholder=" Search...";
  searchInput.className="searchInput";
  host.appendChild(searchInput);

  const select = document.createElement("select");

 
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Filter by region";
  defaultOption.disabled = true;   
  defaultOption.selected = true;   
  select.appendChild(defaultOption);

 
  regions.forEach(region => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    select.appendChild(option);
  });

  host.appendChild(select);

  select.addEventListener("change", ()=>{

    currentSelected=select.value;
    
    console.log(currentSelected);
    //countyC.innerHTML="";
  

    console.log(currentSearch);
    drawCountyFunc(countyC,currentSelected,currentSearch);

  });


  searchInput.addEventListener("input",(e)=>{
  clearTimeout(debounceTimer);
  debounceTimer=setTimeout(() => {
    currentSearch=e.target.value.trim();
    
  }, 100);


  //countyC.innerHTML="";
  drawCountyFunc(countyC,currentSelected,currentSearch);
  });





}

async function main() {
  await fetchData();            
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("darkMode");
    }
    const navbar=document.createElement("nav");
    navbar.className="navbar ";
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
    proba.style.fontWeight="bold";
    proba.style.fontSize="26px";
    host.appendChild(proba);


    const divM=document.createElement("button");
    divM.className="divTextDesc";
   
    host.appendChild(divM);


    const img = document.createElement("img");
    img.className = "imgM";
  
    let isDark = document.body.classList.contains("darkMode");
    img.src = isDark ? "assets/moon.png" : "assets/sun.png";
    img.style.filter = isDark
      ? "brightness(1.2) contrast(100%) grayscale(0%)"
      : "brightness(0.2) contrast(150%) grayscale(30%)";

    divM.appendChild(img);


    const descC=document.createElement("div");
    descC.className="nameM";
    
    descC.innerHTML=isDark? "Dark Mode": "Light Mode";

    
    divM.addEventListener("click", () => {
      document.body.classList.toggle("darkMode");

     
      isDark = !isDark;

      localStorage.setItem("theme", isDark ? "dark" : "light");

      img.src = isDark ? "assets/moon.png" : "assets/sun.png";
      img.style.filter = isDark
        ? "brightness(1.2) contrast(100%) grayscale(0%)"
        : "brightness(0.2) contrast(150%) grayscale(30%)";


         descC.innerHTML=isDark? "Dark Mode": "Light Mode";
    });


    divM.appendChild(img);

    
    divM.appendChild(descC);

}
