document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from localStorage
    const loadTasks = () => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach((taskText) => {
            addTask(taskText, false); // Don't save again when loading
        });
    };

    // Function to create and add a task item
    const addTask = (taskText, save = true) => {
        if (taskText === '') return; // Ensure task is not empty

        // Create the task list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add event listener to the remove button
        removeButton.addEventListener('click', () => {
            taskList.removeChild(li);
            if (save) {
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                const updatedTasks = storedTasks.filter((task) => task !== taskText);
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
        });

        // Append the button to the list item and add it to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save the task in localStorage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = '';
    };

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim(); // Get input value and trim whitespace
        addTask(taskText); // Add the task
    });

    // Event listener to add task on pressing "Enter"
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') { // Check if the key pressed is "Enter"
            const taskText = taskInput.value.trim(); // Get and trim input
            addTask(taskText); // Add the task
        }
    });

    // Load tasks on page load
    loadTasks();
});
