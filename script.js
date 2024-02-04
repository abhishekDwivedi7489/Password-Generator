const lengthSlider = document.querySelector("[data-lengthSlider]");
const lengthNumber = document.querySelector("[data-lengthNumber]");
const indicator = document.querySelector(".indicator");
const indicatorMsg=document.querySelector(".indicatorMsg");
let symbols =["~","!","@","#","$","%","^","&","*","(",")","_","-","=","+",">","/","<",",","`","'"];

let passwordLength =10;
let checkCount=0;
let password=0;

let sliderHandel = () =>{
    lengthSlider.value=passwordLength;
    lengthNumber.innerText=passwordLength;
    const min = lengthSlider.min;
    const max = lengthSlider.max;
    lengthSlider.style.backgroundSize = ( (passwordLength)*100/(max)) + "%";
    // lengthSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%";
}
sliderHandel();

lengthSlider.addEventListener("input",  (e) =>{
    passwordLength=e.target.value;
    sliderHandel();
  });

let getRndInteger = (min , max) =>{
    return Math.floor(Math.random()*(max-min))+min;
}

let generateNumber = () =>{
    return (getRndInteger(0 , 10));
}
let generateUpperCase = () =>{
    return String.fromCharCode(getRndInteger(65 , 91));
}
let generateLowerCase = () =>{
    return String.fromCharCode(getRndInteger(97 , 123));
}

let generateSymbol = () =>{
 let sym = getRndInteger(0 , symbols.length);
 return symbols[sym];
}
let shufflePassword=(arr)=>{
for(i=arr.length-1; i>0; i--){
   let j= Math.floor(Math.random()*(i+1));
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
}
let  str = "";
arr.forEach((arrValue)=>(str+=arrValue));
return str;
}
// let msgIndicator = (color) =>{
//     indicator.style.backgroundColor=color;
// }
let setIndicator = (color) =>{
    indicator.style.backgroundColor=color;
    console.log(color);
     indicator.style.boxShadow="0 0 10px 2px" + color;
}
setIndicator('#ccc');
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

let calcStrength =() =>{
    let upPer=false;
    let loWer=false;
    let num=false;
    let symb=false;
    if(uppercaseCheck.checked)
    upPer=true;
    if(lowercaseCheck.checked)
    loWer=true;
    if(numbersCheck.checked)
    num=true;
    if(symbolsCheck.checked)
    symb=true;

    if(upPer && loWer && num && symb && passwordLength>=8)
     {
        setIndicator("#0f0");
        indicatorMsg.classList.add("msgActive");
        indicatorMsg.innerText="Strong"
        setTimeout(()=>{
            indicatorMsg.classList.remove("msgActive");
        }, 2000);
     } 
     else if(upPer && loWer && (num || symb) && passwordLength>=5){
        setIndicator("#ff0");
        indicatorMsg.classList.add("msgActive");
        indicatorMsg.innerText="Moderate"
        setTimeout(()=>{
            indicatorMsg.classList.remove("msgActive");
        }, 2000);
    }
    else if(upPer&&num || upPer&&symb || loWer && num || loWer&&symb || upPer&&loWer && passwordLength>=5){
        setIndicator("#ff0");
        indicatorMsg.classList.add("msgActive");
        indicatorMsg.innerText="Moderate"
        setTimeout(()=>{
            indicatorMsg.classList.remove("msgActive");
        }, 2000);
    }
    else{
        setIndicator("#f00");
        indicatorMsg.classList.add("msgActive");
        indicatorMsg.innerText="Weak"
        setTimeout(()=>{
            indicatorMsg.classList.remove("msgActive");
        }, 2000);
    }
  
}
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";
    }
    catch(e){
        copyMsg.innerText="Feiled"
    }
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    }, 2000);
   

}

copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

const allCheckBox = document.querySelectorAll("input[type=checkbox]");
let handleCheckBoxChange = ()=>{
    checkCount=0;
    allCheckBox.forEach((c)=>{
        if(c.checked)
        {
            checkCount++;
        }
    } )
    if(passwordLength < checkCount){
        passwordLength=checkCount;
        sliderHandel();
    }
}
allCheckBox.forEach( (checkb)=>{
   checkb.addEventListener('change', handleCheckBoxChange)
})

const generateBtn = document.querySelector(".generateButton");
generateBtn.addEventListener('click', ()=>{
    if(checkCount==0)
    return
    if(passwordLength < checkCount){
        passwordLength=checkCount;
        sliderHandel();
    }
    password="";
    let arr=[];
    if(uppercaseCheck.checked){
        arr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        arr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        arr.push(generateNumber);
    }
    if(symbolsCheck.checked){
        arr.push(generateSymbol);
    }
    for(let i=0; i<arr.length; i++){
        password += arr[i]();
    
    }
    // console.log(password+" pass");
    //remaining passward
    for(let i=0; i<passwordLength-arr.length; i++){
       let rndint= getRndInteger(0, arr.length);
        password+=arr[rndint]();
    }
   password=shufflePassword(Array.from(password));
   passwordDisplay.value=password;
   calcStrength();
})
