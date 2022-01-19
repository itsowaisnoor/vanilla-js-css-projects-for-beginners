const UIdob = document.querySelector("#dob");
const calculate = document.querySelector(".calculate");
const result = document.querySelector(".result");
const ageForm = document.querySelector("#age-form");

ageForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (UIdob.value == "") {
    result.className = "alert alert-danger";
    result.style.display = "block";
    result.textContent = `Invalid Input`;
  } else {
    dob = new Date(UIdob.value);
    const diff = Date.now() - dob.getTime();
    const age = new Date(diff);
    const finalAge = Math.abs(age.getUTCFullYear() - 1970);
    showAge(finalAge);
  }

  setTimeout(function () {
    result.style.display = "none";
  }, 2000);
});

function showAge(age) {
  result.className = "alert alert-primary";
  result.style.display = "block";
  result.textContent = `You are ${age} Years Old`;
}
