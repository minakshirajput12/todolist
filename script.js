// const item = document.querySelector("#item");
// const todobox = document.querySelector("#to-do-box");

// // Load todos from local storage on page load
// document.addEventListener("DOMContentLoaded", function() {
//     const todos = JSON.parse(localStorage.getItem("todos")) || [];
//     todos.forEach(todo => addTodoItem(todo));
// });

// item.addEventListener("keyup", function(event) {
//     if (event.key == "Enter") {
//         addTodoItem(this.value);
//         this.value = "";
//     }
// });

// const addTodoItem = (itemText) => {
//     const listItem = document.createElement("li");
//     listItem.innerHTML = `
//         ${itemText}
//         <i class="fa fa-trash-o"></i>
//     `;

//     listItem.addEventListener("click", function() {
//         this.classList.toggle("done");
//         updateLocalStorage();
//     });

//     listItem.querySelector("i").addEventListener("click", function(event) {
//         listItem.remove();
//         updateLocalStorage();
//         event.stopPropagation(); // Prevent li click event from firing
//     });

//     todobox.appendChild(listItem);
//     updateLocalStorage();
// };

// const updateLocalStorage = () => {
//     const todos = Array.from(todobox.children).map(todo => todo.innerText.trim());
//     localStorage.setItem("todos", JSON.stringify(todos));
// };









document.addEventListener('DOMContentLoaded', function() {
  const todoInput = document.getElementById('todoInput');
  const addBtn = document.getElementById('addBtn');
  const todoList = document.getElementById('todoList');

  // Load todos from local storage
  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  // Function to render todos
  function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.textContent = todo.text;
      if (todo.done) {
        li.classList.add('done');
      }
      li.addEventListener('click', () => toggleDone(index));
      const markAsDoneBtn = document.createElement('button');
      markAsDoneBtn.textContent = 'Mark as Done';
      markAsDoneBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        markAsDone(index);
      });
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTodo(index);
      });
      li.appendChild(markAsDoneBtn);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
    // Save todos to local storage
    saveTodos();
  }

  // Function to add a new todo
  function addTodo() {
    const text = todoInput.value.trim();
    if (text !== '') {
      todos.push({ text: text, done: false });
      renderTodos();
      todoInput.value = '';
    }
  }

  // Function to mark a todo as done
  function markAsDone(index) {
    todos[index].done = true;
    renderTodos();
  }

  // Function to toggle done status of a todo
  function toggleDone(index) {
    todos[index].done = !todos[index].done;
    renderTodos();
  }

  // Function to delete a todo
  function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
  }

  // Function to save todos to local storage
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Event listener for add button
  addBtn.addEventListener('click', addTodo);

  // Render initial todos
  renderTodos();
});
