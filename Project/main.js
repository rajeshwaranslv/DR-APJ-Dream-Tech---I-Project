// Array to store custom expenses
var expenses = [];

// Function to add custom expense
function addExpense() {
  var customExpense = document.getElementById("customExpense").value.trim();
  if (customExpense !== "" && customExpense>0) {
    expenses.push(customExpense);
    document.getElementById("customExpense").value = "";
    document.getElementById("CError").textContent ="";
    updateExpenseList();
  }

  // Validate food expenses (required and positive number)
  if ( customExpense==0 || isNaN(customExpense) || customExpense < 0) {
    expenses.pop(customExpense);
    document.getElementById("CError").textContent =
      "Custom Expenses is Invalid";
  }
}

// Function to remove custom expense
function removeExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
}

// Function to update expense list and calculate total
function updateExpenseList() {
  var expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  var total = 0;
  var count = 0;

  for (var i = 0; i < expenses.length; i++) {
    var expense = expenses[i];
    var expenseItem = document.createElement("div");
    count++;
    expenseItem.innerHTML =
      "<label >Custom Expense:</label>" +
      count +
      " &#8377;" +
      expense +
      " <button type='button' onclick='removeExpense(" +
      i +
      ")'>Remove</button>";
    expenseList.appendChild(expenseItem);

    total += parseFloat(expense);
  }
  var income = parseInt(document.getElementById("income").value);

  var food = parseInt(document.getElementById("food").value);
  var electricityBill = parseInt(
    document.getElementById("electricityBill").value
  );
  var houseRent = parseInt(document.getElementById("houseRent").value);

  total += food + electricityBill + houseRent;
  if (income > total) {
    document.getElementById("budgetMessage").textContent = "Under Budget";
    document.getElementById("budgetMessage").style = "color:green";
  } else {
    document.getElementById("budgetMessage").textContent = "Over Budget";
    document.getElementById("budgetMessage").style = "color:red";

    if (food > 1000)
      document.getElementById("budgetMessage").textContent =
        "Alas!, Over-budget! You Need to reduce the food expenses";
    document.getElementById("budgetMessage").style = "color:red";
    if (electricityBill > 2000)
      document.getElementById("budgetMessage").textContent =
        "Alas!, Over-budget! You need to lower the usage of electrical expenses";
    document.getElementById("budgetMessage").style = "color:red";
    if (food > 1000 && electricityBill > 2000) {
      document.getElementById("budgetMessage").textContent =
        "Alas!, Over-budget! Maintain both eb and food";
      document.getElementById("budgetMessage").style = "color:red";
    }
  }

  document.getElementById("totalAmount").textContent =
    "Total Amount: " + total.toFixed(2);
}

// Form validation
function validateForm(event) {
  event.preventDefault(); // Prevent form submission

  // Reset error messages
  document.getElementById("incomeError").textContent = "";
  document.getElementById("foodError").textContent = "";
  document.getElementById("electricityBillError").textContent = "";
  document.getElementById("houseRentError").textContent = "";
  document.getElementById("CError").textContent = "";
  document.getElementById("nameError").textContent = "";

  // Get form values
  var name = document.getElementById("name").value;
  var income = parseInt(document.getElementById("income").value);
  var food = parseInt(document.getElementById("food").value);
  var electricityBill = parseInt(
    document.getElementById("electricityBill").value
  );
  var houseRent = parseInt(document.getElementById("houseRent").value);
  var customExpense = parseInt(document.getElementById("customExpense").value);

  // validate name
  if (name === "" || /^[0-9]+$/.test(name)) {
    document.getElementById("nameError").textContent = "Invalid name";
  }

  // Validate food expenses (required and positive number)
  if (isNaN(customExpense) || customExpense <0 || customExpense==0) {
    document.getElementById("CError").textContent =
      "Custom Expenses is Invalid";
  }

  // Validate food expenses (required and positive number)
  if (isNaN(food) || food <= 0) {
    document.getElementById("foodError").textContent =
      "Food Expenses is Invalid";
  }

  //  Validate income
  if (isNaN(income) || income <= 0) {
    document.getElementById("incomeError").textContent =
      "Income is Invalid";
  }

  // Validate electricity bill (required and positive number)
  if (isNaN(electricityBill) || electricityBill <= 0) {
    document.getElementById("electricityBillError").textContent =
      "Electricity Bill (EB) is Invalid";
  }

  // Validate house rent (required and positive number)
  if (isNaN(houseRent) || houseRent <= 0) {
    document.getElementById("houseRentError").textContent =
      "House Rent is Invalid";
  }

  // If all validations pass, update expense list and calculate total
  if (
    !isNaN(income) &&
    income > 0 &&
    !isNaN(food) &&
    food > 0 &&
    !isNaN(electricityBill) &&
    electricityBill > 0 &&
    !isNaN(houseRent) &&
    houseRent > 0 &&
    !isNaN(customExpense) &&
    customExpense > 0
  ) {
    updateExpenseList();
  }
}

// end of validation

// Function to add name to storage and display names
// Function to add name and income to storage and display names
function addName() {
  var name = document.getElementById("name").value.trim();
  var income = document.getElementById("income").value.trim();
  var food = document.getElementById("food").value.trim();

  if (name !== "" && income !== "" && food !== "") {
    // Store name and income in local storage
    var localData = JSON.parse(localStorage.getItem("data")) || [];
    localData.push({ name: name, income: income, food: food });
    localStorage.setItem("data", JSON.stringify(localData));

    // Store name and income in session storage
    var sessionData = JSON.parse(sessionStorage.getItem("data")) || [];
    sessionData.push({ name: name, income: income, food: food });
    sessionStorage.setItem("data", JSON.stringify(sessionData));

    // Update displayed names
    displayNames();
  }
}

// Function to remove name from storage and display names
function removeName(index) {
  // Remove name from local storage
  var localData = JSON.parse(localStorage.getItem("data")) || [];
  localData.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(localData));

  // Remove name from session storage
  var sessionData = JSON.parse(sessionStorage.getItem("data")) || [];
  sessionData.splice(index, 1);
  sessionStorage.setItem("data", JSON.stringify(sessionData));

  // Update displayed names
  displayNames();
}

// Function to display names and incomes from storage
function displayNames() {
  var localData = JSON.parse(localStorage.getItem("data")) || [];
  var sessionData = JSON.parse(sessionStorage.getItem("data")) || [];

  var localNamesContainer = document.getElementById("localNames");
  var sessionNamesContainer = document.getElementById("sessionNames");

  localNamesContainer.innerHTML = "";
  sessionNamesContainer.innerHTML = "";

  for (var i = 0; i < localData.length; i++) {
    var nameItem = document.createElement("div");
    nameItem.innerHTML =
      localData[i].name +
      " - Income: " +
      localData[i].income +
      " Food: " +
      localData[i].food +
      " <button type='button' onclick='removeName(" +
      i +
      ")'>Remove</button>";
    localNamesContainer.appendChild(nameItem);
  }

  for (var j = 0; j < sessionData.length; j++) {
    var nameItem = document.createElement("div");
    nameItem.innerHTML =
      sessionData[j].name +
      " - Income: " +
      sessionData[j].income +
      " Food: " +
      sessionData[j].food +
      " <button type='button' onclick='removeName(" +
      j +
      ")'>Remove</button>";
    sessionNamesContainer.appendChild(nameItem);
  }
}
