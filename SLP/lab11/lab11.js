/*Лабораторная работа №11. ООП. Todolist
1.Создайте класс Task, который описывает задачу из списка дел (Todolist). У каждой задачи есть id, название и состояние «выполнена» или «не выполнена».
Реализуйте соответствующие методы, для изменения названия задачи и ее состояния. 
2.Создайте класс Todolist, который представляет список дел. Список дел имеет id, название и метод, который его изменяет.
Класс имеет метод, который добавляет новую задачу Task в список дел. Класс должен содержать метод, который фильтрует задачи по состоянию.
3.Создайте несколько списков Todolist. Продемонстрируйте работу с классами Todolist и Task.*/

class Task {
    constructor(id, name, isCompleted = false) {
        this.id = id;
        this.name = name;
        this.isCompleted = isCompleted;
    }

 
    setName(newName) {
        this.name = newName;
    }


    toggleCompletion() {
        this.isCompleted = !this.isCompleted;
    }
}


class Todolist {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.tasks = [];
    }


    setName(newName) {
        this.name = newName;
    }

   
    addTask(task) {
        this.tasks.push(task);
    }

 
    filterTasks(isCompleted) {
        return this.tasks.filter(task => task.isCompleted === isCompleted);
    }
}


const task1 = new Task(1, 'Сходить в магазин');
const task2 = new Task(2, 'Заняться спортом', true);
const task3 = new Task(3, 'Прочитать книгу');


const todoList1 = new Todolist(1, 'Ежедневные задачи');
todoList1.addTask(task1);
todoList1.addTask(task2);
todoList1.addTask(task3);


console.log(`Все задачи в списке "${todoList1.name}":`);
todoList1.tasks.forEach(task => console.log(`- ${task.name}, выполнена: ${task.isCompleted}`));


task1.toggleCompletion();
console.log(`Состояние задачи "${task1.name}" изменено на: ${task1.isCompleted}`);


console.log('Выполненные задачи:');
todoList1.filterTasks(true).forEach(task => console.log(`- ${task.name}`));


const todoList2 = new Todolist(2, 'Покупки');
todoList2.addTask(new Task(4, 'Купить хлеб'));
todoList2.addTask(new Task(5, 'Купить молоко', true));

console.log(`Все задачи в списке "${todoList2.name}":`);
todoList2.tasks.forEach(task => console.log(`- ${task.name}, выполнена: ${task.isCompleted}`));
