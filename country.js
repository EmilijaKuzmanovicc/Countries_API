export class Country {
  constructor(data) {
    this.container=[];
    this.name = data.name ?? null;
    this.topLevelDomain = data.topLevelDomain ?? null;
    this.alpha2Code = data.alpha2Code ?? null;
    this.alpha3Code = data.alpha3Code ?? null;
    this.callingCodes = data.callingCodes ?? null;
    this.capital = data.capital ?? null;
    this.altSpellings = data.altSpellings ?? null;
    this.subregion = data.subregion ?? null;
    this.region = data.region ?? null;
    this.population = data.population ?? null;
    this.latlng = data.latlng ?? null;
    this.demonym = data.demonym ?? null;
    this.area = data.area ?? null;
    this.timezones = data.timezones ?? null;
    this.borders = data.borders ?? null;
    this.nativeName = data.nativeName ?? null;
    this.numericCode = data.numericCode ?? null;
    this.flags = data.flags ?? null;

    this.currencies = Array.isArray(data.currencies)
      ? data.currencies.map(c => ({
          code: c.code ?? null,
          name: c.name ?? null,
          symbol: c.symbol ?? null
        }))
      : null;

    this.languages = Array.isArray(data.languages)
      ? data.languages.map(l => ({
          iso639_1: l.iso639_1 ?? null,
          iso639_2: l.iso639_2 ?? null,
          name: l.name ?? null,
          nativeName: l.nativeName ?? null
        }))
      : null;

    this.translations = data.translations ?? null;
    this.flag = data.flag ?? null;

    this.regionalBlocs = Array.isArray(data.regionalBlocs)
      ? data.regionalBlocs.map(rb => ({
          acronym: rb.acronym ?? null,
          name: rb.name ?? null
        }))
      : null;

    this.cioc = data.cioc ?? null;
    this.independent = data.independent ?? null;
  }

  drawCountry(host){
    this.container=document.createElement("div");
    this.container.className="containerCountry";


    const img=document.createElement("img");
    img.className="imgCountry";
    img.src=this.flag;
    this.container.appendChild(img);

    const descCountry=document.createElement("div");
    descCountry.className="descCountry";
    this.container.appendChild(descCountry);


    const countryName=document.createElement("div");
    countryName.className="countryName";
    countryName.innerHTML=this.name;
    descCountry.appendChild(countryName);


    this.drawTextDesc(descCountry,"Population:",this.population);

    this.drawTextDesc(descCountry,"Region:",this.region);

    this.drawTextDesc(descCountry,"Capital:",this.capital);








    host.appendChild(this.container);

  }

  drawTextDesc(host,text,desc){
    const div=document.createElement("div");
    div.className="divTextDesc";
    host.appendChild(div);



    const textT=document.createElement("div");
    textT.className="textT";
    textT.innerHTML=text;
    div.appendChild(textT);


    const descC=document.createElement("div");
    descC.className="name";
    descC.innerHTML=desc;
    div.appendChild(descC);

  }
}