const form = document.getElementById("card-form");
const nameInput = document.querySelector(".name-input");
const numberInput = document.querySelector(".number-input");
const monthInput = document.querySelector(".month-input");
const yearInput = document.querySelector(".year-input");
const cvcInput = document.querySelector(".cvc-input");

const nameOutput = document.querySelector(".name-output");
const numberOutput = document.querySelector(".number-output");
const monthOutput = document.querySelector(".month-output");
const yearOutput = document.querySelector(".year-output");
const cvcOutput = document.querySelector(".cvc-output");

const thankYouScreen = document.querySelector(".thank-you");
const continueBtn = document.querySelector(".continue-btn");

// Focus, hover, active handled by CSS

/* --------- Real-time Card Output Updates --------- */
nameInput.addEventListener("input", (e) => {
  let val = e.target.value.trim();
  nameOutput.textContent = val ? val : "JANE APPLESEED";
});

numberInput.addEventListener("input", (e) => {
  let cleaned = e.target.value.replace(/\D/g, "");
  // max 16 digits, with spaces after every 4 digits
  let formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  e.target.value = formatted;
  numberOutput.textContent = formatted ? formatted : "0000 0000 0000 0000";
});

monthInput.addEventListener("input", (e) => {
  let cleaned = e.target.value.replace(/\D/g, "").slice(0, 2);
  e.target.value = cleaned;
  monthOutput.textContent = cleaned || "00";
});

yearInput.addEventListener("input", (e) => {
  let cleaned = e.target.value.replace(/\D/g, "").slice(0, 2);
  e.target.value = cleaned;
  yearOutput.textContent = cleaned || "00";
});

cvcInput.addEventListener("input", (e) => {
  let cleaned = e.target.value.replace(/\D/g, "").slice(0, 3);
  e.target.value = cleaned;
  cvcOutput.textContent = cleaned || "000";
});

/* --------- Form Validation Helpers --------- */
function setError(input, selector, errClass, msg) {
  input.classList.add("input-error");
  const err = input.parentElement.querySelector(selector + "." + errClass);
  if (err) {
    err.style.display = "block";
    err.textContent = msg;
  }
}
function clearError(input, selector, errClass) {
  input.classList.remove("input-error");
  const err = input.parentElement.querySelector(selector + "." + errClass);
  if (err) {
    err.style.display = "none";
    err.textContent = "";
  }
}
/* Handles .date-input errors which are in the same parent */
function setDateGroupError(clz, msg) {
  const dateInputs = document.querySelectorAll(".date-input");
  dateInputs.forEach((d) => d.classList.add("input-error"));
  document.querySelector(".date-container .error.invalid").style.display =
    "block";
  document.querySelector(".date-container .error.invalid").textContent = msg;
}
function clearDateGroupError() {
  const dateInputs = document.querySelectorAll(".date-input");
  dateInputs.forEach((d) => d.classList.remove("input-error"));
  document.querySelector(".date-container .error.invalid").style.display =
    "none";
  document.querySelector(".date-container .error.invalid").textContent = "";
}

function setDateEmptyError(msg) {
  document.querySelector(".date-container .error.empty").style.display =
    "block";
  document.querySelector(".date-container .error.empty").textContent = msg;
}
function clearDateEmptyError() {
  document.querySelector(".date-container .error.empty").style.display = "none";
  document.querySelector(".date-container .error.empty").textContent = "";
}

/* --------- Form Submission Validation --------- */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  // Clear all previous
  clearError(nameInput, ".error", "empty");
  clearError(numberInput, ".error", "empty");
  clearDateEmptyError();
  clearError(cvcInput, ".error", "empty");

  clearError(nameInput, ".error", "invalid");
  clearError(numberInput, ".error", "invalid");
  clearDateGroupError();
  clearError(cvcInput, ".error", "invalid");

  // Empty inputs error
  if (!nameInput.value.trim()) {
    setError(nameInput, ".error", "empty", "Can't be blank");
    valid = false;
  }
  if (!numberInput.value.trim()) {
    setError(numberInput, ".error", "empty", "Can't be blank");
    valid = false;
  }
  if (!monthInput.value.trim() || !yearInput.value.trim()) {
    setDateEmptyError("Can't be blank");
    valid = false;
  }
  if (!cvcInput.value.trim()) {
    setError(cvcInput, ".error", "empty", "Can't be blank");
    valid = false;
  }

  // Invalid format checks
  // Name: only letters and spaces allowed
  if (nameInput.value.trim() && !/^[A-Za-z\s]+$/.test(nameInput.value.trim())) {
    setError(nameInput, ".error", "invalid", "Wrong format, letters only");
    valid = false;
  }

  // Card number: 16 digits, numbers only
  if (numberInput.value.trim()) {
    let noSpaces = numberInput.value.replace(/\s/g, "");
    if (!/^\d{16}$/.test(noSpaces)) {
      setError(numberInput, ".error", "invalid", "Wrong format, numbers only");
      valid = false;
    }
  }

  // Month: 2 digits, 01-12 only
  // Year: 2 digits
  if (monthInput.value.trim() && yearInput.value.trim()) {
    let mValid =
      /^\d{2}$/.test(monthInput.value) &&
      Number(monthInput.value) >= 1 &&
      Number(monthInput.value) <= 12;
    let yValid = /^\d{2}$/.test(yearInput.value);
    if (!mValid || !yValid) {
      setDateGroupError("date-input", "Wrong format, numbers only");
      valid = false;
    }
  }

  // CVC: 3 digits
  if (cvcInput.value.trim() && !/^\d{3}$/.test(cvcInput.value)) {
    setError(cvcInput, ".error", "invalid", "Wrong format, numbers only");
    valid = false;
  }

  if (valid) {
    form.classList.add("hidden");
    thankYouScreen.classList.remove("hidden");
  }
});

continueBtn.addEventListener("click", () => {
  // Reload/reset for demo
  form.reset();
  nameOutput.textContent = "JANE APPLESEED";
  numberOutput.textContent = "0000 0000 0000 0000";
  monthOutput.textContent = "00";
  yearOutput.textContent = "00";
  cvcOutput.textContent = "000";
  thankYouScreen.classList.add("hidden");
  form.classList.remove("hidden");
});
