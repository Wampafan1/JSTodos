const form = document.querySelector('#todos');
const input = document.querySelector('#todo');
const todoList = document.querySelector('#todo-list');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to render todos to the DOM
const renderTodos = () => {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const newTodo = document.createElement('li');
        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        newTodo.innerText = todo + '    ';
        newTodo.setAttribute('data-index', index);
        newTodo.appendChild(removeBtn)
        todoList.appendChild(newTodo);
    });
};

// Initial render
renderTodos();

todoList.addEventListener('click', function(e){
    if (e.target.tagName === 'BUTTON'){
        const todoText = e.target.parentElement.innerText.trim();
        const index = e.target.parentElement.getAttribute('data-index');
        
        if (todoText) {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        }
        e.target.parentElement.remove();
    }
    else if (e.target.tagName === 'LI'){
        if (e.target.classList.contains('strike-through')) {
            e.target.classList.remove('strike-through');
        } else {
            e.target.classList.add('strike-through');
        }
    }
})

form.addEventListener('submit', function(e){
    e.preventDefault();
    const todoText = input.value.trim();
    
    if (todoText) {
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        input.value = '';
    }
    
})