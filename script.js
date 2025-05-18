
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, select, textarea');


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    errorDiv.textContent = message;
    input.classList.add('error');
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorDiv = formGroup.querySelector('.error-message');
    errorDiv.textContent = '';
    input.classList.remove('error');
}


formInputs.forEach(input => {
    input.addEventListener('input', () => {
        clearError(input);
        
        if (input.required && !input.value.trim()) {
            showError(input, 'This field is required');
        } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
        } else if (input.type === 'tel' && input.value && !validatePhone(input.value)) {
            showError(input, 'Please enter a valid phone number');
        }
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    formInputs.forEach(input => {
        if (input.required && !input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        } else if (input.type === 'tel' && input.value && !validatePhone(input.value)) {
            showError(input, 'Please enter a valid phone number');
            isValid = false;
        }
    });
    
    if (isValid) {
        alert('Form submitted successfully!');
        contactForm.reset();
    }
});

const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="toggleTodo(${index})">${todo.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        
        todoList.appendChild(li);
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}
function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({
            text,
            completed: false
        });
        todoInput.value = '';
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}
addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});


renderTodos(); 