document.querySelector(".loan-form").addEventListener("submit", function (e) {
  e.preventDefault();
  document.querySelector(".results").style.display = "none";
  document.querySelector(".loading").style.display = "block";
  setTimeout(calculateNow, 1000);
});

function calculateNow(e) {
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");

  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;

  const temp = Math.pow(1 + calculatedInterest, calculatedPayment);

  const monthly = (principal * temp * calculatedInterest) / (temp - 1);

  if (isFinite(monthly) && amount > 0 && interest > 0 && years > 0) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);
    document.querySelector(".results").style.display = "block";
    document.querySelector(".loading").style.display = "none";
  } else {
    const errorDiv = document.createElement("div");
    //get element
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");
    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode("Please Check Your Inputs"));
    document.querySelector(".loading").style.display = "none";
    card.insertBefore(errorDiv, heading);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }
}
