let tasks = [];

// Add a new task
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text) {
        // Create new task and add to array
        tasks.push({
            id: Date.now(),
            text: text,
            status: 'todo'
        });
        
        input.value = ''; // Clear input
        showTasks(); // Update display
    }
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    showTasks();
}

// Display all tasks in their columns
function showTasks() {
    // Clear all columns
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inprogress').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    
    // Add each task to its column
    tasks.forEach(task => {
        const taskBox = document.createElement('div');
        taskBox.className = 'task';
        taskBox.draggable = true;
        taskBox.innerHTML = `
            <div class="task-content">
                <span class="task-text">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        
        // When drag starts, save task id
        taskBox.ondragstart = (e) => {
            e.dataTransfer.setData('taskId', task.id);
        };
        
        // Add to correct column
        document.getElementById(task.status).appendChild(taskBox);
    });
}

// Setup drag and drop for each column
document.querySelectorAll('.tasks').forEach(column => {
    // Allow dropping
    column.ondragover = (e) => {
        e.preventDefault();
    };
    
    // When task is dropped
    column.ondrop = (e) => {
        const taskId = parseInt(e.dataTransfer.getData('taskId'));
        const task = tasks.find(t => t.id === taskId);
        
        if (task) {
            task.status = column.id; // Change status
            showTasks(); // Update display
        }
    };
});

// Add task when button clicked
document.getElementById('addBtn').onclick = addTask;

// Add task when Enter key pressed
document.getElementById('taskInput').onkeypress = (e) => {
    if (e.key === 'Enter') addTask();
};

// Show tasks on page load
showTasks();
