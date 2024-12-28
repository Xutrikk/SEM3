/*1.Создайте объект person с методами greet (сообщение с приветствием пользователя) и ageAfterYears 
(принимает years и возвращает “текущий возраст” + years), которые используют this для доступа к свойствам объекта.*/
console.log('Задание 1');

let person = {
    name: 'John',
    age: 30,

    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    },
    ageAfterYears: function(years) {
        return this.age + years;
    }
};

person.greet(); 
console.log(person.ageAfterYears(22));
  
/*2.Создайте объект car, который имеет свойства model и year, а также метод getInfo, который выводит информацию о машине.*/
console.log('\nЗадание 2');

let car = {
    model: 'Tesla Model S',
    year: 2020,

    getInfo: function() {
        console.log(`Car model: ${this.model}, Year: ${this.year}`);
    }
};
  
car.getInfo();
  
/*3. Создайте функцию-конструктор Book, которая создает объекты с методами getTitle и getAuthor.*/
console.log('\nЗадание 3');

function Book(title, author) {
    this.title = title;
    this.author = author;
  
    this.getTitle = function() {
      return this.title;
    };
  
    this.getAuthor = function() {
      return this.author;
    };
}
  
let myBook = new Book('1984', 'George Orwell');
console.log(myBook.getTitle());
console.log(myBook.getAuthor());
  
/*4. Создайте объект team, который содержит массив игроков и метод для вывода информации о каждом игроке. Используйте this в вложенной функции.*/
console.log('\nЗадание 4');

let team = {
    players: ['Alice', 'Bob', 'Charlie'],

    showPlayers: function() {
      this.players.forEach(function(player) {
        console.log(player);
      });
    }
};
  
team.showPlayers();
  
/*5.Создайте модуль counter, который инкапсулирует переменную count и предоставляет методы для инкрементации, декрементации
 и получения текущего значения. Используйте this для доступа к свойствам.*/
console.log('\nЗадание 5');

const counter = (function() {
    let count = 0;
  
    return {
      increment: function() {
        return ++count;
      },
      decrement: function() {
        return --count;
      },
      getCount: function() {
        return count;
      }
    };
})();
  
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.getCount());
  

/*6. Создайте объект item со свойством price. Сначала определите его с параметрами, разрешающими изменение и удаление. 
Затем переопределите дескрипторы так, чтобы свойство стало неизменяемым.*/
console.log('\nЗадание 6');

let item = {};
Object.defineProperty(item, 'price', {
    value: 100,
    writable: true,
    configurable: true,
    enumerable: true
});

console.log(item.price);

Object.defineProperty(item, 'price', {
    writable: false,
    configurable: false,
    enumerable: false
});

item.price = 200;
console.log(item.price);

/*7. Создайте объект circle, который имеет свойство radius. Добавьте геттер для вычисления площади круга на основе радиуса, геттер и сеттер
 для изменения радиуса.*/
console.log('\nЗадание 7');

let circle = {
    radius: 5,

    get area() {
      return Math.PI * this.radius ** 2;
    },
    get getRadius() {
      return this.radius;
    },
    set setRadius(value) {
      this.radius = value;
    }
};
  
console.log(circle.area);
circle.setRadius = 10;
console.log(circle.area);

/*8. Создайте объект car с тремя свойствами: make, model, и year. Сначала определите их с параметрами, разрешающими изменение и удаление. 
Затем переопределите дескрипторы, чтобы все свойства стали неизменяемыми.*/
console.log('\nЗадание 8');

let car2 = {};
Object.defineProperties(car2, {
    make: { value: 'Tesla', writable: true, configurable: true, enumerable: true },
    model: { value: 'Model X', writable: true, configurable: true, enumerable: true },
    year: { value: 2021, writable: true, configurable: true, enumerable: true }
});

console.log(car2.make); // Tesla

Object.defineProperties(car2, {
    make: { writable: false, configurable: false, enumerable: false },
    model: { writable: false, configurable: false, enumerable: false },
    year: { writable: false, configurable: false, enumerable: false }
});

car2.make = 'BMW'; // Ошибка
console.log(car2.make);

/*9. Создайте массив, в котором будет три числа. Используя Object.defineProperty, добавьте свойство sum (геттер), которое будет возвращать 
сумму всех элементов массива. Сделайте это свойство доступным только для чтения.*/
console.log('\nЗадание 9');

let numbers = [1, 2, 3];
Object.defineProperty(numbers, 'sum', {
    get: function() {
        return this.reduce((acc, val) => acc + val, 0);
    },
    configurable: false,
    enumerable: false,
});

console.log(numbers.sum);

/*10. Создайте объект rectangle, который имеет свойства width и height. Добавьте геттер для вычисления площади прямоугольника, геттеры и сеттеры 
для ширины и высоты.*/
console.log('\nЗадание 10');

let rectangle = {
    width: 10,
    height: 5,
    get area() {
      return this.width * this.height;
    },
    get getWidth() {
      return this.width;
    },
    set setWidth(value) {
      this.width = value;
    },
    get getHeight() {
      return this.height;
    },
    set setHeight(value) {
      this.height = value;
    }
};
  
console.log(rectangle.area);
rectangle.setWidth = 20;
rectangle.setHeight = 10;
console.log(rectangle.area);

/*11. Создайте объект user, который имеет свойства firstName и lastName. Добавьте геттер для получения полного имени и сеттер
 для изменения полного имени.*/
console.log('\nЗадание 11');

let user = {
    firstName: 'John',
    lastName: 'Doe',

    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    set fullName(name) {
      [this.firstName, this.lastName] = name.split(' ');
    }
};
  
console.log(user.fullName);
user.fullName = 'Jane Smith';
console.log(user.fullName);
  