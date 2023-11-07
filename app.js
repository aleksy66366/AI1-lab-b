class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.data = JSON.parse(localStorage.getItem('data')) || [];
        this.selectedTaskIndex = null;
        this.term = ''; 
    }

    draw() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
    
        const filteredTasks = this.getFilteredTasks();
    
        filteredTasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.id = `task_${index + 1}`;

    
            const taskName = document.createElement('div');
            taskName.classList.add('task-name');
            taskName.id = `task-name_${index + 1}`;
            taskName.innerHTML = this.highlightSearchTerm(task);
    
            const taskDate = document.createElement('div');
            taskDate.classList.add('task-date');
            taskDate.id = `task-date_${index + 1}`;
            taskDate.innerText = this.data[index];
    
            taskDiv.appendChild(taskName);
            taskDiv.appendChild(taskDate);
            taskList.appendChild(taskDiv);

            taskDiv.addEventListener('click', () => {
                if(this.selectedTaskIndex != index){
                    this.selectedTaskIndex = index;
                    newTaskInput.value = task;
                    newDataInput.value = this.data[index];
                }
                else{
                    this.selectedTaskIndex = null;  
                    newTaskInput.value = '';
                    newDataInput.value = '';
                }          
            });
        });
    
        this.saveToLocalStorage();
    }
    taskIndex(){
        return this.selectedTaskIndex;
    }
    setTaskIndex(ter){
        this.selectedTaskIndex=ter;
    }

    addTask(task,data) {
        this.tasks.push(task);
        this.data.push(data);
        this.draw();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.data.splice(index, 1);
        this.draw();
    }

    editTask(index, newTask, newData) {
        this.tasks[index] = newTask;
        this.data[index] = newData;
        this.draw();
    }

    setSearchTerm(term) {
        this.term = term;
        this.draw();
    }

    getFilteredTasks() {
        return this.tasks.filter(task => task.toLowerCase().includes(this.term.toLowerCase()));
    }

    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('data', JSON.stringify(this.data));
    }

    highlightSearchTerm(task) {
    if (this.term !== '') {
        const escapedTerm = this.term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi');
        const highlightedTask = task.replace(regex, '<span class="highlight">$1</span>');
        return highlightedTask;
    } else {
        return task;
    }
}
}

const todoList = new Todo();

const addTaskButton = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');
const newDataInput = document.getElementById('new-task-data');
const deleteTaskButton = document.getElementById('delete-task');
const deleteAllTaskButton = document.getElementById('delete-all-task');
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    todoList.setSearchTerm(query);
});

addTaskButton.addEventListener('click', () => {
    
    const newTask = newTaskInput.value;
    const newData = newDataInput.value;
    if (newTask.trim() !== '') {
        if(todoList.taskIndex()===null){
            todoList.addTask(newTask, newData);
        }
        else{
            todoList.editTask(todoList.taskIndex(), newTask, newData);
            todoList.setTaskIndex(null);
        }
        newTaskInput.value = '';
        newDataInput.value = '';
    }
    todoList.draw(); 

});

deleteAllTaskButton.addEventListener('click', () => {
    localStorage.removeItem('tasks'); 
    localStorage.removeItem('data'); 
    newTaskInput.value = '';
    newDataInput.value = '';
    todoList.tasks = []; 
    todoList.data = []; 
    todoList.draw(); 
});


deleteTaskButton.addEventListener('click', () => {
    if (todoList.taskIndex()!=null) {
        todoList.deleteTask(todoList.taskIndex());
        todoList.setTaskIndex(null);
        newTaskInput.value = '';
        newDataInput.value = '';
    }
});

todoList.draw();
