class Task {
    constructor(id, title) {
      this.id = id;
      this.title = title;
      this.completed = false;
    }
  
    toggleCompleted() {
      this.completed = !this.completed;
    }
  
    setTitle(newTitle) {
      this.title = newTitle;
    }
  }
  
  class Todolist {
    constructor() {
      this.tasks = [];
      this.currentFilter = 'all';
    }
  
    addTask(task) {
      this.tasks.push(task);
      this.render();
    }
  
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.render();
    }
  
    filterTasks(filter) {
      switch (filter) {
        case 'completed':
          return this.tasks.filter(task => task.completed);
        case 'notCompleted':
          return this.tasks.filter(task => !task.completed);
        default:
          return this.tasks;
      }
    }
  
    render() {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = '';
  
      const filteredTasks = this.filterTasks(this.currentFilter);
      filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
  
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
          task.toggleCompleted();
          this.render();
        });
  
        const taskTitle = document.createElement('span');
        taskTitle.textContent = task.title;
        if (task.completed) {
          taskTitle.style.textDecoration = 'line-through';
        }
  
        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Редактировать';
        editButton.addEventListener('click', () => {
          const newTitle = prompt('Введите новое название задачи', task.title);
          if (newTitle) {
            task.setTitle(newTitle);
            this.render();
          }
        });
  
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
          this.deleteTask(task.id);
        });
  
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskTitle);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
  
        taskList.appendChild(taskItem);
      });
    }
  
    setFilter(filter) {
      this.currentFilter = filter;
      this.render();
    }
  }
  
  const todolist = new Todolist();
  
  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const title = taskInput.value.trim();
    if (title) {
      const task = new Task(Date.now(), title);
      todolist.addTask(task);
      taskInput.value = '';
    }
  }
  
  function filterTasks(filter) {
    todolist.setFilter(filter);
  }
  