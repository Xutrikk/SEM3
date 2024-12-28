//1.
let  user = {
    name: 'Masha',
    age: 21
};

//2.
let numbers = [1, 2, 3];

//3.
let user1 = {
    name: 'Masha',
    age: 23,
    location: {
        city: 'Minsk',
        country: 'Belarus'
    }
};

//4.
let user2 = {
    name: 'Masha',
    age: 28,
    skills: ["HTML", "CSS", "JavaScript", "React"]
};

//5.
const array = [
    {id: 1, name: 'Vasiliy', group: 10}, 
    {id: 2, name: 'Ivan', group: 11},
    {id: 3, name: 'Masha', group: 12},
    {id: 4, name: 'Petya', group: 10},
    {id: 5, name: 'Kiryha', group: 11},
]

//6.
let user4 = {
    name: 'Masha',
    age: 19,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        exams: {
            maths: true,
            programming: false
        }
    }
};

//7.
let user5 = {
    name: 'Masha',
    age: 22,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        department: {
            faculty: 'FIT',
            group: 10,
        },
        exams: [
            { maths: true, mark: 8},
            { programming: true, mark: 4},
        ]
    }
};

//8.
let user6 = {
    name: 'Masha',
    age: 21,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        department: {
            faculty: 'FIT',
            group: 10,
        },
        exams: [
            { 
		maths: true,
		mark: 8,
		professor: {
		    name: 'Ivan Ivanov ',
		    degree: 'PhD'
		}
	     },
            { 
		programming: true,
		mark: 10,
		professor: {
		    name: 'Petr Petrov',
		    degree: 'PhD'
		}
	     },
        ]
    }
};

//9. 
let user7 = {
    name: 'Masha',
    age: 20,
    studies: {
        university: 'BSTU',
        speciality: 'designer',
        year: 2020,
        department: {
            faculty: 'FIT',
            group: 10,
        },
        exams: [
            { 
		maths: true,
		mark: 8,
		professor: {
		    name: 'Ivan Petrov',
		    degree: 'PhD',
		    articles: [
                        {title: "About HTML", pagesNumber: 3},
                        {title: "About CSS", pagesNumber: 5},
                        {title: "About JavaScript", pagesNumber: 1},
                    ]
		}
	     },
            { 
		programming: true,
		mark: 10,
		professor: {
		    name: 'Petr Ivanov',
		    degree: 'PhD',
		    articles: [
                        {title: "About HTML", pagesNumber: 3},
                        {title: "About CSS", pagesNumber: 5},
                        {title: "About JavaScript", pagesNumber: 1},
                    ]
		}
	     },
        ]
    }
};

//10.
let store = {
    state: {
        posts: [
            {id: 1, message: 'Hi', likesCount: 12},
            {id: 2, message: 'By', likesCount: 1},
        ],
        newPostText: 'About me',
    },
    dialogsPage: {
        dialogs: [
            {id: 1, name: 'Valera'},
            {id: 2, name: 'Andrey'},
            {id: 3, name: 'Sasha'},
            {id: 4, name: 'Victor'},
        ],
        messages: [
            {id: 1, message: 'hi'},
            {id: 2, message: 'hi hi'},
            {id: 3, message: 'hi hi hi'},
        ],
    },
    sidebar: [],
}

// 1.Выполнить глубокое копирование всех объектов и массивов.  
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 2.Обратитесь к копии объекта user5 и измените значение свойства group на 12, а оценку по программированию измените на 10.
let user5Copy = deepCopy(user5);
user5Copy.studies.department.group = 12;
user5Copy.studies.exams[1].mark = 10; 

// 3.Обратитесь к копии объекта user6 и измените имя преподавателя.
let user6Copy = deepCopy(user6);
user6Copy.studies.exams[0].professor.name = 'New Professor Name'; 

// 4.Обратитесь к копии объекта user7 и измените количество страниц на 3 для статьи “About CSS” преподавателя Petr Ivanov.
let user7Copy = deepCopy(user7);
const cssArticle = user7Copy.studies.exams.find(exam => exam.professor.name === 'Petr Ivanov')
    .professor.articles.find(article => article.title === 'About CSS');
if (cssArticle) {
    cssArticle.pagesNumber = 3;
}

// 5. Замените все сообщения в объекте store на “Hello”.
let storeCopy = deepCopy(store);
storeCopy.state.posts.forEach(post => post.message = 'Hello');
storeCopy.dialogsPage.messages.forEach(message => message.message = 'Hello');

console.log(user5Copy);
console.log(user6Copy);
console.log(user7Copy);
console.log(storeCopy);