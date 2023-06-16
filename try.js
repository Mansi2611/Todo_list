// Define an array to store the todo list items
let todoList = [];
let editIndex = null; // Variable to store the index of the item being edited

// Function to handle form submission
function submitForm() {
  const currentDate = new Date(); // Get the current date
  const activity = document.querySelector('input[type="text"]').value;
  const startDate = document.querySelector("#sDate").value;
  const dueDate = document.querySelector("#dDate").value;
  const status = document.querySelector("#options").value;

  // Perform validations if necessary
  if (!activity) {
    document.getElementById("msgA").innerHTML = "please fill the given field";
    document.getElementById("msgA").style.visibility = "visible";
    return;
  }

  // Perform validations if necessary
  if (dueDate < startDate) {
    document.getElementById("msg").innerHTML =
      "Due date cannot be earlier than start date.";
    document.getElementById("msg").style.visibility = "visible";
    return;
  }
  if (!startDate || !dueDate || !status) {
    // document.getElementById("msg").innerHTML="please fill the given field";
    // document.getElementById("msg").style.visibility = "visible";
    return;
  }

  if (editIndex !== null) {
    // Perform edit operation
    editTodoItem(editIndex, activity, startDate, dueDate, status);
  } else {
    // Perform add operation
    addTodoItem(activity, startDate, dueDate, status);
  }

  // Reset the form and editIndex
  document.getElementById("form").reset();
  editIndex = null;
  document.getElementById("msg").style.visibility = "hidden";
  document.getElementById("msgA").style.visibility = "hidden";
  if (document.getElementById("submitBtn")) {
    document.getElementById("submitBtn").disabled = true;
  }

  // Call a function to display the updated todo list
  displayTodoList();
}

// Function to add a new todo item
function addTodoItem(activity, startDate, dueDate, status) {
  // Create a new todo item object
  const todoItem = {
    activity: activity,
    startDate: startDate,
    dueDate: dueDate,
    status: status,
  };

  // Add the new todo item to the array
  todoList.push(todoItem);
}

// Function to edit a todo item
function editTodoItem(index, activity, startDate, dueDate, status) {
  const todoItem = todoList[index];

  // Update the properties of the todo item
  todoItem.activity = activity;
  todoItem.startDate = startDate;
  todoItem.dueDate = dueDate;

  const currentDate = new Date();
  const dueDateT = new Date(todoItem.dueDate);

  var a = document.getElementById("st");
  var b = document.getElementById("ns");
  var c = document.getElementById("ip");

  if (dueDateT < currentDate) {
    a.disabled = true;
    b.disabled = true;
    c.disabled = true;
  }

  console.log(todoItem);
  todoItem.status = status;
}

// Function to delete a todo item
function deleteTodoItem(index) {
  // Remove the todo item from the array
  todoList.splice(index, 1);

  // Call a function to display the updated todo list
  displayTodoList();
}

// Function to display the todo list in the table
function displayTodoList() {
  // Get the table body element
  const tableBody = document.getElementById("tContaint");

  // Clear the table body
  tableBody.innerHTML = "";

  // Loop through the todoList array and create/update rows
  for (let i = 0; i < todoList.length; i++) {
    const todoItem = todoList[i];

    // Create a new row
    const row = document.createElement("tr");

    // Create table cells for each property of the todo item
    const activityCell = createTableCell(todoItem.activity);
    const startDateCell = createTableCell(todoItem.startDate);
    const dueDateCell = createTableCell(todoItem.dueDate);
    const statusCell = createTableCell(todoItem.status);

    // Create a cell for the action buttons
    const actionCell = document.createElement("td");
    var d = document.getElementById("dp");
    var e = document.getElementById("co");

    const currentDate = new Date();
    const dueDate = new Date(todoItem.dueDate);

    if (dueDate < currentDate && (statusCell.textContent = "Due-passed")) {
      row.style.textDecoration = "line-through";
    }

    var selectedValue = document.getElementsByTagName("option ").value;

    // Create the edit button and attach the event listener
    const editButton = createEditButton(i);
    actionCell.appendChild(editButton);

    // Create the delete button and attach the event listener
    const deleteButton = createDeleteButton(i);
    actionCell.appendChild(deleteButton);

    // Append all the cells to the row
    row.appendChild(activityCell);
    row.appendChild(startDateCell);
    row.appendChild(dueDateCell);
    row.appendChild(statusCell);
    row.appendChild(actionCell);

    // Append the row to the table body
    tableBody.appendChild(row);

    var sub = document.getElementById("add");
    sub.innerText = "Add";
  }
}

// Function to create a table cell element
function createTableCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
}

// Function to create an edit button element
function createEditButton(index) {
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-btn");
  editButton.addEventListener("click", () => setEditItem(index));
  return editButton;
}

// Function to set the form fields for editing a todo item
function setEditItem(index) {
  var x = document.getElementById("add");
  x.innerHTML = "Update";
  const todoItem = todoList[index];

  document.querySelector('input[type="text"]').value = todoItem.activity;
  document.querySelector("#sDate").value = todoItem.startDate;
  document.querySelector("#dDate").value = todoItem.dueDate;
  document.querySelector("#options").value = todoItem.status;
  editIndex = index; // Set the editIndex to the current index
}

// Function to create a delete button element
function createDeleteButton(index) {
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", () => deleteTodoItem(index));
  return deleteButton;
}

// Add form submit event listener
document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  submitForm();
});

displayTodoList();

function searchTable() {
  // Get the input value and convert it to lowercase for case-insensitive search
  var input = document.getElementById("searchBox").value.toLowerCase();

  // Get the table element
  var table = document.getElementById("table");

  // Get all the rows of the table
  var rows = table.getElementsByTagName("tr");

  // Loop through all the rows, starting from index 1 (skip the header row)
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];

    // Get the cells in the current row
    var cells = row.getElementsByTagName("td");

    // Flag to determine if the row should be displayed
    var shouldDisplay = false;

    // Loop through all the cells in the row
    for (var j = 0; j < cells.length; j++) {
      var cell = cells[j];

      // Check if the cell value matches the search input
      if (cell.innerHTML.toLowerCase().indexOf(input) > -1) {
        shouldDisplay = true;
        break;
      }
    }

    // Display or hide the row based on the search result
    row.style.display = shouldDisplay ? "" : "none";
  }
}
