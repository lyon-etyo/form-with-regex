const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");
const popup = document.querySelector(".popup");

// validation script here
const patterns = {
  username: /^(?=[a-zA-Z0-9_-]{4,20}$)(?!.*[_-]{2})[^_-].*[^_-]$/,
  email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*_.;=()"><])[\w!@#$%^&*.;=()">< ]{6,}$/,
  "nomor-hp": /^(\+62|62|0)?[\s-]?8[1-9]{1}[\d]{1}[\s-]?\d{3,8}[\s-]?\d{3,8}$/,
  "plat-nomor": /^[A-Z]{1,2}[\s-]?\d{1,4}[\s-]?[A-Z]{0,3}$/,
};

function validate(field, regex) {
  if (regex.test(field.value)) {
    field.className = "valid";
  } else {
    field.className = "invalid";
  }
}

self.addEventListener("load", function (e) {
  inputs.forEach(input => {
    if (input.value) validate(input, patterns[input.name]);
  });
});

inputs.forEach(input => {
  input.addEventListener("blur", e => {
    if (e.target.value) validate(e.target, patterns[e.target.name]);
  });
  input.addEventListener("keyup", e => {
    e.target.classList.remove("valid", "invalid");
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const inputArr = Array.from(inputs);
  let valid = 0;
  inputArr.forEach(input => {
    validate(input, patterns[input.name]);
    if (input.classList.contains("valid")) valid += 1;
  });
  if (inputArr.length == valid) {
    form.reset();
    popup.style.display = "flex";
  }
});

form.addEventListener("reset", e => {
  const inputArr = Array.from(e.target);
  inputArr.forEach(input => input.classList.remove("valid"));
});

popup.querySelector("a").addEventListener("click", e => {
  popup.style.display = "none";
});
