import React, { useState } from "react";
import "./Card.css"
function Card(props) {
  const { onPayClick } = props;
  const [cname, setcname] = useState("");
  const [cnumber, setcnumber] = useState("");
  const [cvv, setcvv] = useState("");
  const [expdate, setexpdate] = useState();
  const [error, setError] = useState({
    isNameValid: true,
    isNumberValid: true,
    isExpDateValid: true,
    isCvvValid: true
  });
  const validateForm = () => {
    const isNameValid = onlyLettersAndSpaces(cname);
    const isNumberValid = luhnCheck(cnumber);
    const isCvvValid = cvv.length === 3;
    const isExpDateValid = new Date(expdate) > new Date();
    console.log({ isNameValid, isCvvValid, isNumberValid, isExpDateValid        })

    setError({ isNameValid, isCvvValid, isNumberValid, isExpDateValid });
    if (isNameValid && isNumberValid && isCvvValid && isExpDateValid) {
      onPayClick({ cname, cnumber, cvv, expdate });
      setcname("");
      setcnumber("");
      setcvv("");
      setexpdate();
    }
  };
  return (
    <div>
      <div className="card-container">
        <label>CARDHOLDER NAME</label>
        <input
          type="text"
          value={cname}
          onChange={(e) => setcname(e.target.value)}
        />
        {!error.isNameValid && (
          <span className="error" id="cname_error">
            Name should not empty or contain special characters and numbers
          </span>
        )}
        <label>CARD NUMBER</label>
        <input
          type="number"
          placeholder="XXXX XXXX XXXX XXXX"
          value={cnumber}
          onChange={(e) => {
            let value = e.target.value;
            if (value.length > 16) {
              value = value.slice(0, -1);
            }
            setcnumber(value);
          }}
        />
        {!error.isNumberValid && (
          <span className="error" id="cnumber_error">
            Card Number should be a valid pattern
          </span>
        )}
        <div className="grp-container">
          <div>
            <label>CVV</label>
            <input
              type="number"
              value={cvv}
              onChange={(e) => {
                let value = e.target.value;
                if (value.length > 3) {
                  value = value.slice(0, -1);
                }
                setcvv(value);
              }}
            />
            {!error.isCvvValid && (
              <span className="error" id="cnumber_error">
                CVV should have 3 number
              </span>
            )}
          </div>
          <div>
            <label>EXPIRY DATE</label>
            <input
              type="date"
              value={expdate}
              onChange={(e) => setexpdate(e.target.value)}
            />
            {!error.isExpDateValid && (
              <span className="error" id="expdate_error">
                Expiry date should be greator than today's date
              </span>
            )}
          </div>
        </div>
        <button onClick={validateForm} className="button">
          Pay
        </button>
      </div>
    </div>
  );
}
function onlyLettersAndSpaces(str) {
  if (str.length === 0) {
    return false;
  }
  return /^[A-Za-z\s]*$/.test(str);
}
function luhnCheck(num) {
  if (num.length === 0) {
    return false;
  }
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

export default Card