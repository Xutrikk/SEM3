
/*1.Имеется массив numbers. Сохранить первый элемент массива в переменную y используя деструктуризацию.*/

let numbers = [4,8,9,2];

let[firstNumber] = numbers;
console.log(firstNumber);


/*2.Объект user имеет свойства name, age. Создайте объект admin, у которого есть свойства admin и все свойства объекта user. Используйте spread оператор.*/
let user = { name: "Masha", age : 19};

let admin = {admin:true,...user};

console.log(admin);

/*3.Выполнить деструктуризацию объекта store до 3 уровня вложенности. После этого вывести значения likesCount из массива posts. 
Выполнить фильтрацию массива dialogs – выбрать пользователей с четными id.   В массиве messages заменить все сообщения на “Hello user” (использовать метод map).*/
let store = {
    state: { //1 уровень
        profilePage:{ //2 уровень
            posts: [ //3 уровень
            
                {id: 1, message: 'Hi', likeCount: 12},
                {id:2, message: 'By', likeCount: 1},
        ],
        newPostText: 'About me',
    },
    dialogsPage:{
        dialogs:[
            {id: 1, name: 'Valera'},
            {id: 2, name: 'Andrey'},
            {id: 3, name: 'Sasha'},
            {id: 4, name: 'Viktor'},
        ],
        messages: [
            {id: 1, message: 'hi'},
            {id: 2, message: 'hi hi'},
            {id: 3, message: 'hi hi hi'},
        ],
    },
    sidebar:[],
},
}

let {state:{profilePage:{posts}, dialogsPage:{dialogs, message},sidebar }} = store;

for(post of posts)
{
    console.log(post.likeCount);
}

let filterdialogs = dialogs.filter(function(dialog)
{
    return dialog.id % 2 == 0;
});

console.log(filterdialogs);

let newMessage = store.state.dialogsPage.messages.map((message) => "Hello user");
console.log(newMessage);

/*4.В массиве tasks хранится список задач. Создать новую задачу task и добавить ее в массив, используя spread оператор.*/

let tasks = [
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false},
    {id: 4, title: "Rest API", isDone: false},
    {id: 5, title: "GraphQL", isDone: false},
]

let newTask = {id: 6, title: "JS2.0", isDone: false};

tasks = [...tasks, newTask];

console.log(tasks);

/*5.Массив [1, 2, 3] передайте в качестве параметра функции sumValues. Используйте spread оператор.*/
let newArray = [1,2,3,7,9];

function sumValues(x,y,z)
{
    return x + y + z;
}

console.log(sumValues(...newArray));
