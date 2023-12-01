document.addEventListener('DOMContentLoaded', function () {
    // Check for saved tasks in local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    renderTasks();

    // Function to add a new task
    window.addTask = function () {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            tasks.unshift({ text: taskText, important: false });
            taskInput.value = '';
            renderTasks();
            saveTasks();
        }
    };

    // Function to delete a task
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        renderTasks();
        saveTasks();
    };

    // Function to toggle task importance
    window.toggleImportance = function (index) {
        tasks[index].important = !tasks[index].important;
        renderTasks();
        saveTasks();
    };

    // Function to render tasks
    function renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span style="text-decoration: ${task.important ? 'underline' : 'none'}">${task.text}</span>
                <div>
                    <button onclick="toggleImportance(${index})">Important</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});