//const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const BASE_URL= "https://api.apyhub.com/data/convert/currency/multiple";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg= document.querySelector(".msg");




for (let select of dropdowns){
    for (currencycode in countryList){
        let newOption =document.createElement("option");
        newOption.innerText= currencycode;
        newOption.value=currencycode;
        if (select.name === "from" && currencycode ==="USD"){
            newOption.selected="selected";
        } 
        else if (select.name === "to" && currencycode ==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
 
    }
    select.addEventListener("change",(evt)=>{
      updateFlag(evt.target);
    });
}




 

const updateFlag =(element)=>{
let currencycode=element.value;
let countrycode=countryList[currencycode] ;
    let newsrclink=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newsrclink;
}   ;


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtvalue=amount.value;
    if (amtvalue ==="" || amtvalue <1 ){
        amtvalue=1;
        amount.value="1";
    }

    //const URL =`${BASE_URL}/${fromCurr.value.toLowerCase}/${toCurr}.json`;
    const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data [toCurr.value.toLowerCase()];
    console.log(rate);

    let finalamount= amtvalue*rate;
    msg.innerText=`${amtvalue} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
});