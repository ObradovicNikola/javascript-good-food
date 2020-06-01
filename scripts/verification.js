let secretNumber = document.getElementById("secretNumber");

function verifyHuman() {
  if (secretNumber.value % 10 === 7 && secretNumber.value % 3 === 0) {
    return true;
  }
  return false;
}

function invalidCaptcha() {
  this.setCustomValidity("");
  if (this.validity.valueMissing) {
    this.setCustomValidity("Are you sure you are human?");
  } else if (!verifyHuman()) {
    this.setCustomValidity("You are not human...");
  }
}

secretNumber.oninput = invalidCaptcha;
secretNumber.oninvalid = invalidCaptcha;

function verify() {
  localStorage.setItem("verified", true);

  alert("You are succesfully verified!");
  return true;
}
