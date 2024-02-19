// Define an array to store todo items
let todos = [];

// Function to add a new todo item
function addTodo() {
  // Get input values
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let endDate = document.getElementById("end-date").value;
  let priority = document.getElementById("priority").value;

  // Create a new todo object
  let todo = {
    id: todos.length + 1,
    title: title,
    description: description,
    endDate: endDate,
    priority: priority,
    status: "todo", // Initial status is "todo"
  };

  // Add the new todo to the todos array
  todos.push(todo);

  // Call a function to update the UI
  updateUI();
}

// Function to delete a todo item
function deleteTodo(id) {
  // Filter out the todo with the specified id
  todos = todos.filter((todo) => todo.id !== id);

  // Call a function to update the UI
  updateUI();
}

// Function to edit a todo item
function editTodo(id) {
  // Find the todo with the specified id
  let todo = todos.find((todo) => todo.id === id);

  // Update the todo object with new values
  todo.title = document.getElementById("title").value;
  todo.description = document.getElementById("description").value;
  todo.endDate = document.getElementById("end-date").value;
  todo.priority = document.getElementById("priority").value;

  // Call a function to update the UI
  updateUI();
}

// Function to complete a todo item
function completeTodo(id) {
  // Find the todo with the specified id
  let todo = todos.find((todo) => todo.id === id);

  // Change the status of the todo to "done"
  todo.status = "done";

  // Call a function to update the UI
  updateUI();
}

// Function to move a todo item to a different list
function moveTodo(id, status) {
  // Find the todo with the specified id
  let todo = todos.find((todo) => todo.id === id);

  // Update the status of the todo
  todo.status = status;

  // Call a function to update the UI
  updateUI();
}

// Function to sort todos based on priority or end date
function sortTodos(criteria) {
  // Implement sorting logic based on the criteria

  // Call a function to update the UI
  updateUI();
}

// Function to update the UI
function updateUI() {
  // Clear the existing todo lists
  document.getElementById("todo-list").innerHTML = "";
  document.getElementById("doing-list").innerHTML = "";
  document.getElementById("done-list").innerHTML = "";

  // Iterate through the todos array and display each todo item in the appropriate list
  todos.forEach((todo) => {
    let listItem = document.createElement("div");
    listItem.className = "item";
    listItem.innerHTML = `
      <h3>${todo.title}</h3>
      <p>Description: ${todo.description}</p>
      <p>End Date: ${todo.endDate}</p>
      <p>Priority: ${todo.priority}</p>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
      <button onclick="editTodo(${todo.id})">Edit</button>
      <button onclick="completeTodo(${todo.id})">Complete</button>
    `;

    // Append the todo item to the appropriate list based on its status
    if (todo.status === "todo") {
      document.getElementById("todo-list").appendChild(listItem);
    } else if (todo.status === "doing") {
      document.getElementById("doing-list").appendChild(listItem);
    } else if (todo.status === "done") {
      document.getElementById("done-list").appendChild(listItem);
    }
  });
}

// Initial function call to update the UI with existing todos (if any)
updateUI();
