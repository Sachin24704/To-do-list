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
// Function to edit a todo item
// Function to edit a todo item
function editTodo(id) {
  // Find the index of the todo with the specified id
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    console.error(`Todo with id ${id} not found`);
    return;
  }

  // Get the todo item's elements
  let titleElement = document.getElementById(`title-${id}`);
  let descriptionElement = document.getElementById(`description-${id}`);
  let endDateElement = document.getElementById(`end-date-${id}`);
  let priorityElement = document.getElementById(`priority-${id}`);
  let editButton = document.getElementById(`edit-button-${id}`);

  if (editButton.textContent === "Edit") {
    // Switch to edit mode
    editButton.textContent = "Save";

    // Replace text content with input fields for editing
    titleElement.innerHTML = `<input type="text" id="edit-title-${id}" value="${titleElement.textContent}" />`;
    descriptionElement.innerHTML = `<textarea type="text" id="edit-description-${id}" value="${descriptionElement.textContent}" />`;
    endDateElement.innerHTML = `<input type="date" id="edit-end-date-${id}" value="${endDateElement.textContent}" />`;
    priorityElement.innerHTML = `<select id="edit-priority-${id}">
                                      <option value="Low" ${
                                        priorityElement.textContent === "Low"
                                          ? "selected"
                                          : ""
                                      }>Low</option>
                                      <option value="Medium" ${
                                        priorityElement.textContent === "Medium"
                                          ? "selected"
                                          : ""
                                      }>Medium</option>
                                      <option value="High" ${
                                        priorityElement.textContent === "High"
                                          ? "selected"
                                          : ""
                                      }>High</option>
                                    </select>`;

    // Focus on the title input
    document.getElementById(`edit-title-${id}`).focus();
  } else if (editButton.textContent === "Save") {
    // Update todo object in the todos array
    todos[index].title = document.getElementById(`edit-title-${id}`).value;
    todos[index].description = document.getElementById(
      `edit-description-${id}`
    ).value;
    todos[index].endDate = document.getElementById(`edit-end-date-${id}`).value;
    todos[index].priority = document.getElementById(
      `edit-priority-${id}`
    ).value;

    // Switch back to normal mode
    editButton.textContent = "Edit";

    // Update the todo item's content
    titleElement.textContent = todos[index].title;
    descriptionElement.textContent = todos[index].description;
    endDateElement.textContent = todos[index].endDate;
    priorityElement.textContent = todos[index].priority;
  }
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
    <h3 id="title-${todo.id}">${todo.title}</h3>
    <p>Description: <span id="description-${todo.id}">${todo.description}</span></p>
    <p>End Date: <span id="end-date-${todo.id}">${todo.endDate}</span></p>
    <p>Priority: <span id="priority-${todo.id}">${todo.priority}</span></p>
    <button onclick="deleteTodo(${todo.id})">Delete</button>
    <button onclick="editTodo(${todo.id})" id="edit-button-${todo.id}">Edit</button>
    <button onclick="completeTodo(${todo.id})" >Complete</button>
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
