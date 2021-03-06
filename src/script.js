"use strict";

// Added this, so that i could manipulate the root custom variables
const root = document.querySelector(":root");

//Bill setting Elements
const bill = document.querySelector(".billing__amount");
const tipPercentButton = document.querySelectorAll(".billing__tip-button");
const tipCustom = document.querySelector(".billing__tip-custom");
const numOfPeople = document.querySelector(".billing__people");

//Result elements
const tipPerPerson = document.querySelector(".result__tip-per-person");
const totalPerPerson = document.querySelector(".result__tip-total");

//Reset Button
const resetButton = document.querySelector(".reset-button");

let previousTipButton = tipPercentButton[0];
let currentTipPercent = parseFloat(previousTipButton.textContent);

const setButtonColors = function () {
  previousTipButton.style.backgroundColor = "hsl(183, 100%, 15%)";
  previousTipButton.style.color = "hsl(185, 41%, 84%)";
};

const calculateTip = function (tipPercent) {
  let tipAmount = parseFloat(
    (((tipPercent / 100) * bill.value) / numOfPeople.value).toFixed(2)
  );

  tipPerPerson.textContent = tipAmount;
  totalPerPerson.textContent = (
    bill.value / numOfPeople.value +
    tipAmount
  ).toFixed(2);
  currentTipPercent = tipPercent;

  //Changing the opacity of the reset-button element to 1;
  resetButton.style.opacity = 1;
};

//Buttons
tipPercentButton.forEach((i) => {
  i.addEventListener("click", (event) => {
    calculateTip(parseFloat(i.textContent));
    i.style.backgroundColor = "hsl(172, 67%, 45%)";
    i.style.color = "hsl(183, 100%, 15%)";
    setButtonColors();
    previousTipButton = i;
  });
});

//Custom Input
tipCustom.addEventListener("input", function () {
  calculateTip(parseFloat(tipCustom.value));
  setButtonColors();
});

//Bill and NumOfPeople
[bill, numOfPeople].forEach((element) => {
  element.addEventListener("input", function () {
    if (numOfPeople.value === "0") {
      root.style.setProperty("--psedo-opacity", 1);
    } else {
      root.style.setProperty("--psedo-opacity", 0);
    }
    calculateTip(currentTipPercent);
  });
});

resetButton.addEventListener("click", function () {
  bill.value = 0;
  currentTipPercent = 0;
  numOfPeople.value = 1;
  resetButton.style.opacity = 0.3;
  root.style.setProperty("--psedo-opacity", 0);
  tipPerPerson.textContent = "0.00";
  totalPerPerson.textContent = "0.00";

  setButtonColors();
});
