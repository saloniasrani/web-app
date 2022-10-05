const cnumber = document.getElementById("cnumber")
cnumber.addEventListener("keyup",(e)=>{
    let value = e.target.value;
    if(value.length > 16){
        value=value.slice(0,-1);
        cnumber.value=value;
    }
})
const cvv = document.getElementById("cvv")
cvv.addEventListener("keyup",(e)=>{
    let value = e.target.value;
    if(value.length > 3){
        value=value.slice(0,-1);
        cvv.value=value;
    }
})
function validateForm() {
  let cname = document.getElementById("cname").value;
  console.log(cname);
  let isNameValid = onlyLettersAndSpaces(cname);
  let cnumber = document.getElementById("cnumber").value;
  let isNumberValid = luhnCheck(cnumber);
  let expdate = document.getElementById("expdate").value;
  console.log(expdate);
  let isexpDateValid = new Date(expdate)>new Date();

if(!isNameValid){
    let cname = document.getElementById("cname_error")
    cname.className += " display"
}
if(!isNumberValid){
    let cnumber = document.getElementById("cnumber_error")
    cnumber.className += " display"
}
if(!isexpDateValid){
    let expdate = document.getElementById("expdate_error")
    expdate.className += " display"
}
}

function onlyLettersAndSpaces(str) {
  return /^[A-Za-z\s]*$/.test(str);
}

function luhnCheck(num) {
  let arr = (num + "")
    .split("")
    .reverse()
    .map((x) => parseInt(x));
  let sum = arr.reduce((acc, val, i) => {
    if (i % 2 !== 0) {
      val = 2 * val;
      if (val > 9) {
        val = 1 + (val % 10);
      }
    }

    return acc + val;
  }, 0);
  return sum % 10 === 0;
}
