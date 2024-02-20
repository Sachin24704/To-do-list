// Define an array to store todo items
let todos = [];

// Function to add a new todo item
function addTodo() {
  // Get input values
  let titleInput = document.getElementById("title");
  let descriptionInput = document.getElementById("description");
  let endDateInput = document.getElementById("end-date");
  let priorityInput = document.getElementById("priority");

  let title = titleInput.value;
  let description = descriptionInput.value;
  let endDate = endDateInput.value;
  let priority = priorityInput.value;

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

  // Reset input values to empty
  titleInput.value = "";
  descriptionInput.value = "";
  endDateInput.value = "";
  priorityInput.value = "";

  // Call a function to update the UI
  updateUI(todos, "all");
}

// Function to delete a todo item
function deleteTodo(id) {
  // Filter out the todo with the specified id
  todos = todos.filter((todo) => todo.id !== id);

  // Call a function to update the UI
  updateUI(todos, "all");
}

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

    descriptionElement.innerHTML = `<textarea id="edit-description-${id}">${descriptionElement.textContent}</textarea>`;

    // descriptionElement.innerHTML = `<input type="text" id="edit-description-${id}" value="${descriptionElement.textContent}" />`;
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
                                      <option value="Urgent" ${
                                        priorityElement.textContent === "Urgent"
                                          ? "selected"
                                          : ""
                                      }>Urgent</option>
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

function toggleStatus(id) {
  // Find the todo with the specified id
  let todo = todos.find((todo) => todo.id === id);

  // Toggle status based on current status
  if (todo.status === "todo") {
    todo.status = "doing";
  } else if (todo.status === "doing") {
    todo.status = "done";
  }

  // Update the UI
  updateUI(todos, "all");
}

// Function to sort todos based on priority or end date
function sortTodos(criteria) {
  // Implement sorting logic based on the criteria

  // Call a function to update the UI
  updateUI(todos, "all");
}
function sortList(status, criteria) {
  // Filter todos based on the specified status
  const filteredTodos = todos.filter((todo) => todo.status === status);
  console.log("sortlist clicked");
  const remainingTodos = todos.filter((todo) => todo.status !== status);
  // Implement sorting logic based on the criteria
  if (criteria === "priority") {
    filteredTodos.sort((a, b) => {
      // Compare priority values as strings (low, medium, high)
      return a.priority.localeCompare(b.priority);
    });
  } else if (criteria === "endDate") {
    filteredTodos.sort((a, b) => {
      // Compare end date values as dates
      return new Date(a.endDate) - new Date(b.endDate);
    });
  }

  // Update the original todos array with the sorted todos

  // Call a function to update the UI
  updateUI(filteredTodos, status);
}

// Function to update the UI
function updateUI(array, todo_status) {
  todo_items = array;
  // Clear the existing todo lists
  if (todo_status === "all") {
    document.getElementById("todo-list").innerHTML = "";
    document.getElementById("doing-list").innerHTML = "";
    document.getElementById("done-list").innerHTML = "";
  } else {
    document.getElementById(`${todo_status}-list`).innerHTML = "";
  }

  // Iterate through the todos array and display each todo item in the appropriate list
  todo_items.forEach((todo) => {
    let listItem = document.createElement("div");
    listItem.className = "item";
    listItem.innerHTML = `
    <h3 id="title-${todo.id}">${todo.title}</h3>
    <p>Description: <span id="description-${todo.id}">${
      todo.description
    }</span></p>
    <p>End Date: <span id="end-date-${todo.id}">${todo.endDate}</span></p>
    <p>Priority: <span id="priority-${todo.id}">${todo.priority}</span></p>
    <button onclick="deleteTodo(${todo.id})">Delete</button>
    <button onclick="editTodo(${todo.id})" id="edit-button-${
      todo.id
    }">Edit</button>
    <button onclick="toggleStatus(${todo.id})">${getButtonText(
      todo.status
    )}</button>
  `;
    function getButtonText(status) {
      if (status === "todo") {
        return "Move to Doing";
      } else if (status === "doing") {
        return "Move to Done";
      } else if (status === "done") {
        return "Completed";
      }
    }

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
updateUI(todos, "all");
