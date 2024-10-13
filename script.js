document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText, save = true) {
        if (!taskText) {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            taskList.removeChild(li);
            if (save) {
                updateLocalStorage(taskText, 'remove');
            }
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        if (save) {
            updateLocalStorage(taskText, 'add');
        }

        taskInput.value = '';
    }

    function updateLocalStorage(taskText, action) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (action === 'add') {
            storedTasks.push(taskText);
        } else if (action === 'remove') {
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1);
            }
        }
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText);
        }
    });

    loadTasks();
});

